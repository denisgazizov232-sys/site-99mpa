#!/usr/bin/env python3
"""
Калькулятор МАФ для ООО «99МПА»: геометрия конусных тонкостенных изделий,
вес при мин/сред/макс толщине, себестоимость и четыре уровня цены.

Примеры:
  python3 analiz/maf_calc.py --rect 910x320x750 --t 10-16 --qty 210
  python3 analiz/maf_calc.py --circ 360x700 --t 8-14 --qty 420 --mold 30000 --molds 9
  python3 analiz/maf_calc.py --rect 320x320x750 --t 10-16 --qty 420 --taper 2.5 --rho 2300
"""
import argparse, math

# ── опорные ставки (см. CLAUDE.md, раздел 4) ──────────────────────────────
MIX_M3    = 61000   # ₽/м³ готовой смеси СФБ
HYDRO_M2  = 60      # ₽/м² гидрофобизации (400 ₽/л × 0.15 л/м²)
LABOR_RATE= 400     # ₽/час полной стоимости рабочего с налогами
SCRAP     = 0.05    # доля брака
OVERHEAD  = 0.18    # цеховые накладные
ADMIN     = 0.07    # общехозяйственные
VAT       = 0.22
PALLET    = 900     # ₽ за палету с обвязкой
LOADING   = 60      # ₽/шт погрузка


def _dims(s, n):
    v = [float(x) for x in s.lower().replace("х", "x").split("x")]
    if len(v) != n:
        raise SystemExit(f"нужно {n} размера через x, получено: {s}")
    return v


def volume(kind, dims, t, taper):
    """Объём бетона, м³: наружное усечённое тело минус внутренняя полость."""
    tan, N = math.tan(math.radians(taper)), 4000
    H = dims[-1]
    off = H * tan
    dz, Vout, Vin = H / N, 0.0, 0.0
    for i in range(N):
        z = (i + 0.5) * dz
        k = z / H
        if kind == "rect":
            L = dims[0] - 2*off + 2*off*k
            W = dims[1] - 2*off + 2*off*k
            Vout += L*W*dz
            if z > t and L-2*t > 0 and W-2*t > 0:
                Vin += (L-2*t)*(W-2*t)*dz
        else:
            D = dims[0] - 2*off + 2*off*k
            Vout += math.pi*(D/2)**2*dz
            if z > t and D-2*t > 0:
                Vin += math.pi*((D-2*t)/2)**2*dz
    return (Vout - Vin) / 1e9


def surface(kind, dims, taper):
    """Наружная площадь боковых граней + дно, м²."""
    tan = math.tan(math.radians(taper))
    H = dims[-1]
    off = H*tan
    slant = math.sqrt(H**2 + off**2)
    if kind == "rect":
        L, W = dims[0], dims[1]
        Lb, Wb = L-2*off, W-2*off
        return (((L+Lb)/2*slant)*2 + ((W+Wb)/2*slant)*2 + Lb*Wb) / 1e6
    D = dims[0]
    Db = D-2*off
    return (math.pi*(D/2+Db/2)*slant + math.pi*(Db/2)**2) / 1e6


def main():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--rect", help="ДxШxВ в мм, напр. 910x320x750")
    g.add_argument("--circ", help="ДиаметрxВ в мм, напр. 360x700")
    p.add_argument("--t", required=True, help="толщина стенки: 13 или диапазон 10-16")
    p.add_argument("--qty", type=int, required=True, help="тираж серии, шт")
    p.add_argument("--taper", type=float, default=2.0, help="конусность, град/грань (по умолч. 2.0)")
    p.add_argument("--rho", type=float, default=2300, help="плотность, кг/м³ (по умолч. 2300)")
    p.add_argument("--mold", type=float, default=40000, help="стоимость одной матрицы, ₽")
    p.add_argument("--molds", type=int, default=9, help="число матриц на серию")
    p.add_argument("--hours", type=float, help="трудоёмкость, час/шт (иначе оценка по площади)")
    p.add_argument("--pack", type=float, help="упаковка, ₽/шт (иначе оценка по площади)")
    p.add_argument("--per-pallet", type=int, default=6, help="изделий на палету")
    p.add_argument("--anal", type=float, help="цена ближайшего аналога, ₽ — для рыночного якоря")
    a = p.parse_args()

    kind = "rect" if a.rect else "circ"
    dims = _dims(a.rect, 3) if a.rect else _dims(a.circ, 2)
    ts = [float(x) for x in a.t.split("-")]
    if len(ts) == 2:
        ts = [ts[0], (ts[0]+ts[1])/2, ts[1]]
    S = surface(kind, dims, a.taper)
    tan = math.tan(math.radians(a.taper))
    bot = [d - 2*dims[-1]*tan for d in dims[:-1]]

    label = ("%gx%gx%g" % tuple(dims)) if kind == "rect" else ("D%gx%g" % tuple(dims))
    print(f"\n=== {label} мм | конусность {a.taper}°/грань | тираж {a.qty} шт ===")
    print("низ: " + (" x ".join(f"{b:.0f}" for b in bot)) + f" мм | наружная площадь {S:.3f} м²\n")

    print(f"{'толщина':>9}{'бетон, л':>11}{'2200':>9}{'2300':>9}{'2400':>9}   кг")
    for t in ts:
        V = volume(kind, dims, t, a.taper)
        print(f"{t:>8.1f}м{V*1000:>11.2f}" + "".join(f"{V*r:>9.1f}" for r in (2200, 2300, 2400)))

    t_mid = ts[len(ts)//2]
    V = volume(kind, dims, t_mid, a.taper)
    m = V * a.rho
    hours = a.hours if a.hours else round(0.55 + 0.92*S, 2)
    pack  = a.pack  if a.pack  else round(60 + 85*S)

    parts = {
        "смесь":          V * MIX_M3,
        "гидрофобизация": S * HYDRO_M2,
        "труд":           hours * LABOR_RATE,
        "формы":          a.mold * a.molds / a.qty,
        "упаковка":       pack,
        "палета":         PALLET / a.per_pallet,
        "погрузка":       LOADING,
    }
    d0 = sum(parts.values())
    direct = d0 / (1 - SCRAP)
    minp = direct * (1 + OVERHEAD + ADMIN)

    print(f"\n--- себестоимость при t={t_mid:g} мм, ρ={a.rho:g} (масса {m:.1f} кг, труд {hours} ч/шт)")
    for k, v in parts.items():
        print(f"    {k:<16}{v:>10,.0f} ₽")
    print(f"    {'брак 5%':<16}{direct-d0:>10,.0f} ₽")
    print(f"    {'ПРЯМАЯ С/С':<16}{direct:>10,.0f} ₽   ({direct/m:.0f} ₽/кг)")

    print(f"\n--- цены, ₽/шт (без НДС / с НДС {VAT:.0%})")
    for nm, val in (("мин. без убытка", minp), ("конкурентная", minp*1.15),
                    ("нормальная рыночная", minp*1.40)):
        print(f"    {nm:<22}{val:>10,.0f} /{val*(1+VAT):>10,.0f}    партия {val*a.qty:>13,.0f}")
    var = (d0 - parts["труд"]*0.55) / (1-SCRAP) * 1.05
    print(f"    {'АБС. ПРЕДЕЛ (простой)':<22}{var:>10,.0f} /{var*(1+VAT):>10,.0f}    партия {var*a.qty:>13,.0f}")

    if a.anal:
        for share in (0.40, 0.50, 0.60):
            pr = a.anal * share
            mark = "  <-- ниже с/с!" if pr < direct else ""
            print(f"    рыночный якорь {share:.0%} от {a.anal:,.0f} ₽:{pr:>10,.0f} ₽"
                  f"   маржа {(pr-direct)/pr*100:>5.0f}%{mark}")
    print()


if __name__ == "__main__":
    main()
