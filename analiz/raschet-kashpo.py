import math

# ---------- ГЕОМЕТРИЯ: усечённые тела с конусностью ----------
# Конусность принята 2.0 град на грань (типовая для тонкостенных СФБ-кашпо,
# обеспечивает распалубку из жёсткой матрицы без разборных бортов).

TAPER_DEG = 2.0
TAN = math.tan(math.radians(TAPER_DEG))

def rect_volume(Ltop, Wtop, H, t, tb=None, n=4000):
    """Наружное усечённое тело минус внутренняя полость (открытый верх)."""
    tb = t if tb is None else tb
    off = H * TAN                      # смещение на сторону от низа к верху
    Lb, Wb = Ltop - 2*off, Wtop - 2*off
    dz = H / n
    Vout = Vin = 0.0
    for i in range(n):
        z = (i + 0.5) * dz
        L = Lb + 2*off*z/H
        W = Wb + 2*off*z/H
        Vout += L*W*dz
        if z > tb:
            li, wi = L - 2*t, W - 2*t
            if li > 0 and wi > 0:
                Vin += li*wi*dz
    return (Vout - Vin) / 1e9, (Lb, Wb)

def circ_volume(Dtop, H, t, tb=None, n=4000):
    tb = t if tb is None else tb
    off = H * TAN
    Db = Dtop - 2*off
    dz = H / n
    Vout = Vin = 0.0
    for i in range(n):
        z = (i + 0.5) * dz
        D = Db + 2*off*z/H
        Vout += math.pi*(D/2)**2*dz
        if z > tb:
            di = D - 2*t
            if di > 0:
                Vin += math.pi*(di/2)**2*dz
    return (Vout - Vin) / 1e9, Db

def rect_surface(Ltop, Wtop, H):
    """Наружная площадь боковых граней + дно (для цены за м2)."""
    off = H*TAN
    Lb, Wb = Ltop-2*off, Wtop-2*off
    slant = math.sqrt(H**2 + off**2)
    side = ((Ltop+Lb)/2*slant)*2 + ((Wtop+Wb)/2*slant)*2
    return (side + Lb*Wb)/1e6

def circ_surface(Dtop, H):
    off = H*TAN
    Db = Dtop-2*off
    slant = math.sqrt(H**2 + off**2)
    return (math.pi*(Dtop/2+Db/2)*slant + math.pi*(Db/2)**2)/1e6

ITEMS = [
    ("Прямоугольное 910x320x750", "rect", (910, 320, 750), (10, 13, 16), 210),
    ("Квадратное 320x320x750",    "rect", (320, 320, 750), (10, 13, 16), 420),
    ("Круглое D360x700",          "circ", (360, 700),      (8, 11, 14),  420),
]
RHO = (2200, 2300, 2400)

print("="*100)
print("1. ГЕОМЕТРИЯ И ВЕС (конусность 2 град/грань)")
print("="*100)
geo = {}
for name, kind, dims, th, qty in ITEMS:
    if kind == "rect":
        L, W, H = dims
        S = rect_surface(L, W, H)
        _, bot = rect_volume(L, W, H, th[1])
        print(f"\n{name}   низ {bot[0]:.0f}x{bot[1]:.0f} мм, наружная площадь {S:.3f} м2")
    else:
        D, H = dims
        S = circ_surface(D, H)
        _, bot = circ_volume(D, H, th[1])
        print(f"\n{name}   низ D{bot:.0f} мм, наружная площадь {S:.3f} м2")
    row = {}
    for t in th:
        V = rect_volume(*dims, t)[0] if kind == "rect" else circ_volume(*dims, t)[0]
        ms = [V*r for r in RHO]
        row[t] = (V, ms)
        print(f"   t={t:2d} мм: V={V*1000:6.2f} л бетона | масса {ms[0]:5.1f} / {ms[1]:5.1f} / {ms[2]:5.1f} кг "
              f"(2200/2300/2400 кг/м3)")
    geo[name] = dict(V=row[th[1]][0], m=row[th[1]][0]*2300, S=S, qty=qty,
                     Vmin=row[th[0]][0], Vmax=row[th[2]][0],
                     mmin=row[th[0]][0]*2200, mmax=row[th[2]][0]*2400)

# ---------- 2. СЕБЕСТОИМОСТЬ ----------
# Стоимость 1 м3 готовой СФБ-смеси (премикс, руб без НДС), Казань 2026
MIX = {
    "Портландцемент CEM I 52.5 (белый/серый), 800 кг x 13": 800*13,
    "Кварцевый песок фр. 0.1-0.6, 800 кг x 6":              800*6,
    "Стеклофибра щелочестойкая AR, 70 кг x 400":            70*400,
    "Полимерная дисперсия (акрил), 40 кг x 250":            40*250,
    "Суперпластификатор, 8 кг x 300":                       8*300,
    "Пигмент железоокисный, 30 кг x 180":                   30*180,
}
MIX_M3 = sum(MIX.values())
print("\n" + "="*100)
print("2. СТОИМОСТЬ СМЕСИ")
print("="*100)
for k, v in MIX.items():
    print(f"   {k:<55} {v:>8,.0f} руб")
print(f"   {'ИТОГО 1 м3 готовой смеси':<55} {MIX_M3:>8,.0f} руб  (~{MIX_M3/2300:.1f} руб/кг изделия)")

HYDRO_M2 = 400*0.15          # гидрофобизатор: 400 руб/л, расход 0.15 л/м2 (2 слоя)
LABOR_RATE = 400             # руб/час, полная стоимость рабочего с налогами

# формы: стоимость 1 формы и число форм на серию (цикл 1 шт/сутки/форма, ~30 раб. дней)
MOLDS = {
    "Прямоугольное 910x320x750": (60000, 9,  210),
    "Квадратное 320x320x750":    (35000, 9,  420),
    "Круглое D360x700":          (30000, 9,  420),
}
# трудоёмкость, час/шт по операциям
LABOR = {
    "Прямоугольное 910x320x750": dict(подготовка_формы=0.35, укладка_напыление=0.80,
        распалубка=0.25, ремонт_пор=0.35, шлифовка=0.30, гидрофобизация=0.10,
        ОТК=0.08, упаковка=0.17),
    "Квадратное 320x320x750": dict(подготовка_формы=0.22, укладка_напыление=0.45,
        распалубка=0.15, ремонт_пор=0.20, шлифовка=0.18, гидрофобизация=0.06,
        ОТК=0.06, упаковка=0.11),
    "Круглое D360x700": dict(подготовка_формы=0.20, укладка_напыление=0.38,
        распалубка=0.13, ремонт_пор=0.17, шлифовка=0.15, гидрофобизация=0.05,
        ОТК=0.05, упаковка=0.10),
}
PACK = {"Прямоугольное 910x320x750": 230, "Квадратное 320x320x750": 140, "Круглое D360x700": 130}
PER_PALLET = {"Прямоугольное 910x320x750": 4, "Квадратное 320x320x750": 9, "Круглое D360x700": 9}
PALLET_COST = 900            # поддон + обвязка + уголки
LOADING = 60                 # руб/шт
SCRAP = 0.05                 # 5% брака
OVERHEAD = 0.18              # цеховые накладные (энергия, аренда, ИТР цеха, оснастка)
ADMIN = 0.07                 # общехозяйственные
VAT = 0.22

print("\n" + "="*100)
print("3. СЕБЕСТОИМОСТЬ (партия 210 шт по каждому типоразмеру / цвету)")
print("="*100)
res = {}
for name, kind, dims, th, qty in ITEMS:
    g = geo[name]
    mold_cost, n_molds, _ = MOLDS[name]
    batch = 210                                  # расчёт ведём на серию 210 шт
    c_mix   = g["V"] * MIX_M3
    c_hydro = g["S"] * HYDRO_M2
    lab     = LABOR[name]
    c_lab   = sum(lab.values()) * LABOR_RATE
    c_mold  = mold_cost * n_molds / (batch if qty == 210 else qty)   # 2 цвета -> форма делится на 420
    c_pack  = PACK[name]
    c_pal   = PALLET_COST / PER_PALLET[name]
    c_load  = LOADING
    direct0 = c_mix + c_hydro + c_lab + c_mold + c_pack + c_pal + c_load
    direct  = direct0 / (1 - SCRAP)              # учёт брака
    minprice = direct * (1 + OVERHEAD + ADMIN)   # цена без убытка (покрывает все затраты)
    compete  = direct * (1 + OVERHEAD + ADMIN) * 1.15
    normal   = direct * (1 + OVERHEAD + ADMIN) * 1.40
    res[name] = dict(direct=direct, minp=minprice, comp=compete, norm=normal, qty=qty,
                     parts=dict(смесь=c_mix, гидрофобизация=c_hydro, труд=c_lab,
                                формы=c_mold, упаковка=c_pack, палета=c_pal, погрузка=c_load))
    print(f"\n--- {name}  (масса {g['m']:.1f} кг, бетон {g['V']*1000:.1f} л, площадь {g['S']:.2f} м2)")
    for k, v in res[name]["parts"].items():
        print(f"      {k:<18} {v:>9,.0f} руб")
    print(f"      {'брак 5%':<18} {direct-direct0:>9,.0f} руб")
    print(f"      {'ПРЯМАЯ С/С':<18} {direct:>9,.0f} руб   ({direct/g['m']:.0f} руб/кг)")
    print(f"      {'мин. без убытка':<18} {minprice:>9,.0f} руб")
    print(f"      {'КОНКУРЕНТНАЯ':<18} {compete:>9,.0f} руб  без НДС | {compete*1.22:>9,.0f} руб с НДС 22%")
    print(f"      {'нормальная рыночная':<18} {normal:>9,.0f} руб  без НДС | {normal*1.22:>9,.0f} руб с НДС 22%")
    print(f"      цена/кг конкурентная: {compete/g['m']:.0f} руб/кг | цена/м2: {compete/g['S']:,.0f} руб/м2")

print("\n" + "="*100)
print("4. ИТОГ ПО ЗАКАЗУ 1 050 ШТ")
print("="*100)
tot_c = tot_n = tot_d = tot_m = 0
for name, kind, dims, th, qty in ITEMS:
    r = res[name]; g = geo[name]
    print(f"{name:<32} x{qty:<4} конк. {r['comp']:>8,.0f} -> {r['comp']*qty:>12,.0f} руб без НДС"
          f" | {r['comp']*qty*1.22:>12,.0f} с НДС")
    tot_c += r['comp']*qty; tot_n += r['norm']*qty; tot_d += r['direct']*qty; tot_m += g['m']*qty
print(f"\n   Прямая с/с всей партии:        {tot_d:>14,.0f} руб")
print(f"   КОНКУРЕНТНАЯ цена партии:      {tot_c:>14,.0f} руб без НДС | {tot_c*1.22:>14,.0f} руб с НДС 22%")
print(f"   Нормальная рыночная:           {tot_n:>14,.0f} руб без НДС | {tot_n*1.22:>14,.0f} руб с НДС 22%")
print(f"   Валовая прибыль (конкурентная):{tot_c-tot_d:>14,.0f} руб  ({(tot_c-tot_d)/tot_c*100:.0f}%)")
print(f"   Общая масса партии:            {tot_m/1000:>14,.1f} т")
print(f"   Объём бетона:                  {sum(geo[n]['V']*geo[n]['qty'] for n,_,_,_,_ in ITEMS):>14,.1f} м3")
