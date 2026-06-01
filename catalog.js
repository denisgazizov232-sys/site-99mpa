// Полный каталог — категоризация по ключевым словам
const ITEMS = [
  // Скамейки со спинкой
  {n:'1', name:'Скамья тип 1 вращающаяся', size:'1200×820×1300 мм', cat:'bench-back'},
  {n:'2', name:'Скамья тип 2 вращающаяся', size:'600×820×1300 мм', cat:'bench-back'},
  {n:'3', name:'Стул', size:'800×893×908 мм', cat:'bench-back'},
  {n:'4', name:'Скамейка', size:'1800×893×908 мм', cat:'bench-back'},
  {n:'6', name:'Скамья со спинкой тип 1', size:'2000×700×850 мм', cat:'bench-back'},
  {n:'11', name:'Скамейка со спинкой из массива', size:'2000×697×787 мм', cat:'bench-back'},
  {n:'19', name:'Скамья со спинкой', size:'1800×756×840 мм', cat:'bench-back'},
  {n:'40', name:'Скамья со спинкой', size:'3000×756×906 мм', cat:'bench-back'},
  {n:'42', name:'Скамья тип 2 со спинкой', size:'1520×550×870 мм', cat:'bench-back'},
  {n:'47', name:'Скамья Тип 1', size:'1830×550×770 мм', cat:'bench-back'},
  {n:'58', name:'Скамья со спинкой', size:'3000×620×750 мм', cat:'bench-back'},
  {n:'77', name:'Кресло', size:'684×805×795 мм', cat:'bench-back'},
  {n:'84', name:'Скамейка со спинкой', size:'1656×827×990 мм', cat:'bench-back'},
  {n:'88', name:'Скамья ТИП 1 со спинкой', size:'1800×922×860 мм', cat:'bench-back'},
  {n:'89', name:'Парковое кресло', size:'700×919×860 мм', cat:'bench-back'},
  {n:'91', name:'Скамья тип 2 радиусная со спинкой', size:'4900×600×900 мм', cat:'bench-back'},
  {n:'103', name:'Скамья ТИП 5 со спинкой', size:'3400×410×450 мм', cat:'bench-back'},
  {n:'110-2', name:'Скамья со спинкой', size:'1550×580×950 мм', cat:'bench-back'},
  {n:'115', name:'Скамья тип 1', size:'2000×550×450 мм', cat:'bench-back'},
  {n:'116', name:'Скамья с подсветкой', size:'2000×550×450 мм', cat:'bench-back'},
  {n:'122-2', name:'Скамья со спинкой', size:'1000×620×970 мм', cat:'bench-back'},
  {n:'123', name:'Скамья со спинкой', size:'1000×620×970 мм', cat:'bench-back'},
  {n:'137', name:'Скамья', size:'1500×742×911 мм', cat:'bench-back'},
  {n:'138', name:'Скамья', size:'1800×742×911 мм', cat:'bench-back'},
  {n:'144', name:'Скамья', size:'1800×450×720 мм', cat:'bench-back'},
  {n:'151', name:'Скамья', size:'1500×450×867 мм', cat:'bench-back'},
  {n:'152', name:'Скамья', size:'1800×450×867 мм', cat:'bench-back'},
  // Скамейки без спинки
  {n:'7', name:'Скамья длинная', size:'3000×330×525 мм', cat:'bench-noback'},
  {n:'31', name:'Скамья тип 2', size:'2000×541×845 мм', cat:'bench-noback'},
  {n:'35', name:'Скамья из клеёного бруса', size:'2000×400×450 мм', cat:'bench-noback'},
  {n:'48', name:'Скамья Тип 2', size:'1830×550×450 мм', cat:'bench-noback'},
  {n:'55', name:'Скамья тип 3', size:'1500×1000×740 мм', cat:'bench-noback'},
  {n:'62', name:'Скамья', size:'2000×600×820 мм', cat:'bench-noback'},
  {n:'67', name:'Скамейка бревно', size:'2500×350×550 мм', cat:'bench-noback'},
  {n:'70', name:'Лавка простая', size:'1900×647×872 мм', cat:'bench-noback'},
  {n:'73', name:'Скамья тип 1', size:'3000×460×766 мм', cat:'bench-noback'},
  {n:'74', name:'Скамья рядовая Тип 1', size:'1800×541×801 мм', cat:'bench-noback'},
  {n:'76', name:'Скамья рядовая Тип 2', size:'1600×440×450 мм', cat:'bench-noback'},
  {n:'85', name:'Скамейка без спинки', size:'1656×656×458 мм', cat:'bench-noback'},
  {n:'104', name:'Скамья ТИП 6 без спинки', size:'3400×410×450 мм', cat:'bench-noback'},
  {n:'107', name:'Скамейка на борте 1', size:'1500×496×358 мм', cat:'bench-noback'},
  {n:'108', name:'Скамейка на борте 2', size:'1500×490×90 мм', cat:'bench-noback'},
  {n:'110', name:'Скамейка 1', size:'6383×1830×450 мм', cat:'bench-noback'},
  {n:'111', name:'Скамейка 2', size:'2768×793×450 мм', cat:'bench-noback'},
  {n:'112', name:'Скамейка 3', size:'1490×427×450 мм', cat:'bench-noback'},
  {n:'113', name:'Скамейка 4', size:'790×790×450 мм', cat:'bench-noback'},
  {n:'122', name:'Скамья без спинки', size:'1000×620×450 мм', cat:'bench-noback'},
  {n:'124', name:'Скамейка тип 1 Брус', size:'3000×430×442 мм', cat:'bench-noback'},
  {n:'125', name:'Скамейка тип 1 КУБ', size:'550×430×442 мм', cat:'bench-noback'},
  {n:'139', name:'Скамья', size:'1500×587×710 мм', cat:'bench-noback'},
  {n:'142', name:'Скамья', size:'1200×1240×440 мм', cat:'bench-noback'},
  {n:'143', name:'Скамья', size:'1200×540×440 мм', cat:'bench-noback'},
  {n:'146', name:'Скамья', size:'1800×450×450 мм', cat:'bench-noback'},
  {n:'148', name:'Скамья', size:'900×450×420 мм', cat:'bench-noback'},
  {n:'149', name:'Скамья', size:'500×540×440 мм', cat:'bench-noback'},
  {n:'153', name:'Скамья', size:'1500×450×550 мм', cat:'bench-noback'},
  {n:'76-2', name:'Скамья', size:'2900×500×450 мм', cat:'bench-noback'},
  // Радиусные скамейки
  {n:'24', name:'Скамья радиальная тип 2', size:'3000×3000×450 мм', cat:'bench-radius'},
  {n:'25', name:'Трибуна', size:'2400×1000×1050 мм', cat:'bench-radius'},
  {n:'92', name:'Скамья тип 2 радиусная со спинкой', size:'1000×600×900 мм', cat:'bench-radius'},
  {n:'93', name:'Скамья тип 3.2 радиусная без спинки', size:'3560×450×450 мм', cat:'bench-radius'},
  {n:'94', name:'Скамья тип 3.2 радиусная без спинки', size:'1000×600×450 мм', cat:'bench-radius'},
  {n:'95', name:'Скамья тип 4 радиусная двухсторонняя', size:'3770×1030×890 мм', cat:'bench-radius'},
  {n:'96', name:'Скамья тип 4 радиусная двухсторонняя', size:'1000×1030×890 мм', cat:'bench-radius'},
  {n:'99', name:'Скамья ТИП 3.2 радиусная без спинки', size:'1485×500×460 мм', cat:'bench-radius'},
  {n:'129', name:'Четверть радиусной скамьи', size:'1000×450×450 мм', cat:'bench-radius'},
  // Модульные серии
  {n:'162', name:'Сиена без настила', size:'2400×1950×440 мм', cat:'bench-modular'},
  {n:'163', name:'Арте без настила', size:'1900×590×450 мм', cat:'bench-modular'},
  {n:'164', name:'Арте малый куб', size:'590×590×450 мм', cat:'bench-modular'},
  {n:'165', name:'Арте соединительный модуль 1', size:'1026×450 мм', cat:'bench-modular'},
  {n:'166', name:'Арте соединительный модуль 2', size:'1962×1895×450 мм', cat:'bench-modular'},
  {n:'167', name:'Арте радиусная 2.1', size:'1800×590×450 мм', cat:'bench-modular'},
  {n:'168', name:'Арте радиусная 2.2', size:'1900×590×450 мм', cat:'bench-modular'},
  {n:'169', name:'Серенита с поперечным настилом', size:'1700×550×450 мм', cat:'bench-modular'},
  {n:'170', name:'Серенита без настила', size:'1700×550×440 мм', cat:'bench-modular'},
  {n:'171', name:'Серенита с настилом', size:'1700×550×467 мм', cat:'bench-modular'},
  {n:'172', name:'Серенита 2.2 с настилом', size:'1700×550×450 мм', cat:'bench-modular'},
  {n:'173', name:'Серенита со спинкой', size:'1700×550×450 мм', cat:'bench-modular'},
  {n:'174', name:'Ора модульные скамейки с кашпо', size:'3400×1700×450 мм', cat:'bench-modular'},
  {n:'175', name:'Ора модульные скамейки с кашпо', size:'1700×1700×450 мм', cat:'bench-modular'},
  {n:'176', name:'Гексаэдр с настилом', size:'1150×990×450 мм', cat:'bench-modular'},
  {n:'177', name:'Гексаэдр без настила', size:'1150×990×450 мм', cat:'bench-modular'},
  {n:'178', name:'Согно без спинки', size:'1700×480×450 мм', cat:'bench-modular'},
  {n:'179', name:'Согно радиусная', size:'2000×480×450 мм', cat:'bench-modular'},
  {n:'180', name:'Согно со спинкой', size:'1700×660×818 мм', cat:'bench-modular'},
  {n:'181', name:'Сильва круглая с настилом 1000', size:'D1000×450 мм', cat:'bench-modular'},
  {n:'182', name:'Сильва круглая с настилом 900', size:'D900×450 мм', cat:'bench-modular'},
  {n:'183', name:'Модерн без настила', size:'1990×1835×430 мм', cat:'bench-modular'},
  {n:'184', name:'Дольче Модуль 1', size:'2490×460×450 мм', cat:'bench-modular'},
  {n:'185', name:'Дольче Модуль 2', size:'2490×460×450 мм', cat:'bench-modular'},
  {n:'186', name:'Дольче Модуль 3', size:'2490×460×450 мм', cat:'bench-modular'},
  {n:'187', name:'Дольче Модуль 4', size:'2490×460×450 мм', cat:'bench-modular'},
  {n:'188', name:'Дольче Модуль 5', size:'2570×1590×450 мм', cat:'bench-modular'},
  {n:'189', name:'Дольче Модуль 6', size:'2570×1590×450 мм', cat:'bench-modular'},
  {n:'190', name:'Бриз', size:'1800×500×450 мм', cat:'bench-modular'},
  {n:'191', name:'Тренто прямая со спинкой', size:'1800×500×450 мм', cat:'bench-modular'},
  {n:'192', name:'Тренто прямая', size:'1800×500×450 мм', cat:'bench-modular'},
  {n:'193', name:'Палаццо модуль', size:'м.п.×580×480 мм', cat:'bench-modular'},
  {n:'194', name:'Палаццо с настилом', size:'1800×550×450 мм', cat:'bench-modular'},
  {n:'195', name:'Милано', size:'2200×490×440 мм', cat:'bench-modular'},
  {n:'196', name:'Скала', size:'1600×450×828 мм', cat:'bench-modular'},
  {n:'197', name:'Ривьера без спинки', size:'2200×490×455 мм', cat:'bench-modular'},
  {n:'198', name:'Ривьера со спинкой', size:'2200×490×828 мм', cat:'bench-modular'},
  {n:'199', name:'Эссенца', size:'м.п.×510×440 мм', cat:'bench-modular'},
  {n:'200', name:'Заряд', size:'1800×510×460 мм', cat:'bench-modular'},
  {n:'227', name:'Новая волна с настилом', size:'1900×610×450 мм', cat:'bench-modular'},
  {n:'228', name:'Новая волна со спинкой', size:'1900×610×808 мм', cat:'bench-modular'},
  {n:'229', name:'Новая волна радиусная', size:'2400×610×450 мм', cat:'bench-modular'},
  // Столы
  {n:'9', name:'Стол 1', size:'700×700×1200 мм', cat:'table'},
  {n:'12', name:'Стол 2', size:'1400×970×750 мм', cat:'table'},
  {n:'60', name:'Стол со скамейками', size:'2000×2020×750 мм', cat:'table'},
  {n:'117', name:'Стол с двумя стульями шахматный', size:'1000×1000×800 мм', cat:'table'},
  {n:'126', name:'Стол', size:'3000×870×710 мм', cat:'table'},
  {n:'141', name:'Стол шахматный двойной', size:'2010×1800×750 мм', cat:'table'},
  {n:'13-2', name:'Стол со скамьями', size:'2000×2000×950 мм', cat:'table'},
  {n:'147', name:'Стол', size:'1400×1000×741 мм', cat:'table'},
  {n:'155', name:'Стол со стульями', size:'900×2010×750 мм', cat:'table'},
  // Лежаки и шезлонги
  {n:'39', name:'Лежак', size:'1682×800×926 мм', cat:'lounger'},
  {n:'49', name:'Лежак', size:'1400×1200×590 мм', cat:'lounger'},
  {n:'53', name:'Лежак', size:'1630×600×900 мм', cat:'lounger'},
  {n:'75', name:'Лежак модульный', size:'1800×800×800 мм', cat:'lounger'},
  {n:'90', name:'Шезлонг', size:'1900×700×1300 мм', cat:'lounger'},
  {n:'218', name:'Шезлонг', size:'1800×800×750 мм', cat:'lounger'},
  // BBQ
  {n:'63', name:'Мангал', size:'1160×1160×893 мм', cat:'bbq'},
  {n:'213', name:'Комплект барбекю эллипсообразный', size:'1600×700×750 мм', cat:'bbq'},
  {n:'214', name:'Пьетра', size:'1700×800×750 мм', cat:'bbq'},
  {n:'215', name:'Ария', size:'1800×800×750 мм', cat:'bbq'},
  // Шахматные комплексы
  {n:'61', name:'Шахматный комплекс', size:'2550×1000×850 мм', cat:'chess'},
  {n:'216', name:'Комплект шахмат квадро', size:'600×600×450 мм', cat:'chess'},
  {n:'217', name:'Комплект шахмат округлые', size:'D800×405 мм', cat:'chess'},
  {n:'226', name:'Настольный теннис', size:'2740×1525×760 мм', cat:'chess'},
  // Кашпо
  {n:'131', name:'Кадка для кустарников', size:'1250×705×400 мм', cat:'planter'},
  {n:'201', name:'Нобиле', size:'H620, D445, 45л', cat:'planter'},
  {n:'202', name:'Джардо', size:'500×500×800 мм, 54л', cat:'planter'},
  {n:'203', name:'Лоджия', size:'500×500×1100 мм', cat:'planter'},
  {n:'204', name:'Бастион', size:'742×484×820 мм', cat:'planter'},
  {n:'206', name:'Тоскана', size:'500×500×650 мм', cat:'planter'},
  {n:'207', name:'Капри', size:'710×520×520 мм', cat:'planter'},
  {n:'208', name:'Тригонон', size:'710×520×520 мм', cat:'planter'},
  {n:'209', name:'Флоренция прямоугольные кашпо', size:'400×400×400 мм', cat:'planter'},
  {n:'210', name:'Нобиле удлинённое кашпо', size:'1200×400×500 мм', cat:'planter'},
  {n:'211', name:'Кашпо конусное', size:'710×520×520 мм', cat:'planter'},
  {n:'212', name:'Кашпо бетонное кольцо', size:'D1300 H600', cat:'planter'},
  {n:'219', name:'Плита прямоугольная', size:'1200×300×100 мм', cat:'planter'},
  {n:'220', name:'Плита квадратная', size:'600×600×50 мм', cat:'planter'},
  {n:'221', name:'Плита круглая', size:'D600 H50', cat:'planter'},
  {n:'222', name:'Полусфера', size:'H250, D450', cat:'planter'},
  {n:'223', name:'Прямоугольник', size:'450×450×250 мм', cat:'planter'},
  {n:'224', name:'Круг', size:'H250, D450', cat:'planter'},
  // Урны
  {n:'13', name:'Урна', size:'380×380×850 мм', cat:'urn'},
  {n:'20', name:'Урна одинарная', size:'393×393×939 мм', cat:'urn'},
  {n:'21', name:'Урна ТБО', size:'1377×1077×1369 мм', cat:'urn'},
  {n:'26', name:'Урна тип 1', size:'600×600×1200 мм', cat:'urn'},
  {n:'38', name:'Урна стандарт', size:'400×400×1000 мм', cat:'urn'},
  {n:'41', name:'Урна', size:'420×420×550 мм', cat:'urn'},
  {n:'45', name:'Урна 40 литров', size:'415×415×700 мм', cat:'urn'},
  {n:'46', name:'Урна для раздельного сбора отходов', size:'1245×415×700 мм', cat:'urn'},
  {n:'59', name:'Урна', size:'445×445×620 мм', cat:'urn'},
  {n:'64', name:'Урна', size:'370×370×900 мм', cat:'urn'},
  {n:'72', name:'Урна', size:'400×400×750 мм', cat:'urn'},
  {n:'81', name:'Урна Тип 1', size:'460×460×720 мм', cat:'urn'},
  {n:'82', name:'Контейнер для раздельного сбора', size:'1360×460×720 мм', cat:'urn'},
  {n:'87', name:'Урна', size:'433×414×616 мм', cat:'urn'},
  {n:'98', name:'Урна', size:'440×260×910 мм', cat:'urn'},
  {n:'114', name:'Урна', size:'400×400×1000 мм', cat:'urn'},
  {n:'128', name:'Деревянная урна', size:'410×410×700 мм', cat:'urn'},
  {n:'140', name:'Урна', size:'400×330×800 мм', cat:'urn'},
  {n:'150', name:'Урна', size:'400×300×700 мм', cat:'urn'},
  {n:'154', name:'Урна', size:'300×350×600 мм', cat:'urn'},
  {n:'205', name:'Ауреа с пепельницей', size:'H690, 440×440, 45л', cat:'urn'},
  // Велопарковки
  {n:'17', name:'Велопарковка', size:'800×500×40 мм', cat:'bike'},
  {n:'18', name:'Велопарковка', size:'1260×600×1005 мм', cat:'bike'},
  {n:'29', name:'Велопарковка, секция с волной', size:'400×50×700 мм', cat:'bike'},
  {n:'30', name:'Велопарковка', size:'400×50×700 мм', cat:'bike'},
  {n:'44', name:'Велопарковка', size:'450×70×800 мм', cat:'bike'},
  {n:'54', name:'Велопарковка', size:'2145×524×56 мм', cat:'bike'},
  {n:'57', name:'Велопарковка', size:'490×80×860 мм', cat:'bike'},
  {n:'83', name:'Велопарковка (1 рама)', size:'990×994×42 мм', cat:'bike'},
  {n:'158', name:'Велопарковка', size:'750×2100×850 мм', cat:'bike'},
  {n:'159', name:'Велопарковка', size:'750×2800×850 мм', cat:'bike'},
  {n:'225', name:'Велопарковка', size:'м.п.×400/600×400 мм', cat:'bike'},
  // Ограждения
  {n:'15', name:'Ограждение тип 1 (цена за метр)', size:'1000×100×1200 мм', cat:'fence'},
  {n:'16', name:'Тросовое ограждение (цена за метр)', size:'1000×100×1200 мм', cat:'fence'},
  {n:'23', name:'Ограждение радиусное', size:'1000×90×1000 мм', cat:'fence'},
  {n:'71', name:'Ограждение (цена за метр)', size:'1000×50×1340 мм', cat:'fence'},
  {n:'100', name:'Ограждение электрощита тип 1', size:'1000×44×1600 мм', cat:'fence'},
  {n:'101', name:'Ограждение электрощита тип 2', size:'1000×44×1300 мм', cat:'fence'},
  {n:'102', name:'Ограждение электрощита тип 3', size:'1000×44×2100 мм', cat:'fence'},
  {n:'135', name:'Парковочный столбик', size:'D89×500 мм', cat:'fence'},
  {n:'136', name:'Парковочный столбик', size:'D89×750 мм', cat:'fence'},
  // Навесы
  {n:'52', name:'Короб ТБО запирающийся', size:'2500×1632×1700 мм', cat:'shelter'},
  {n:'69', name:'Ширма ТБО', size:'1600×742×1425 мм', cat:'shelter'},
  {n:'105', name:'Раздевалка', size:'6260×1879×3116 мм', cat:'shelter'},
  {n:'106', name:'Пергола', size:'4120×1350×3750 мм', cat:'shelter'},
  {n:'109', name:'Качели', size:'1950×500×3000 мм', cat:'shelter'},
  {n:'132', name:'Навес для 1 контейнера ТКО', size:'1600×1400×2150 мм', cat:'shelter'},
  {n:'133', name:'Навес для 2 контейнеров ТКО', size:'3150×1400×2150 мм', cat:'shelter'},
  {n:'134', name:'Навес для 3 контейнеров ТКО', size:'4700×1400×2150 мм', cat:'shelter'},
  {n:'141-2', name:'Контейнерная площадка на 3 контейнера', size:'6000×1920×2780 мм', cat:'shelter'},
  {n:'142-2', name:'Контейнерная площадка на 5 контейнеров', size:'6000×1920×2780 мм', cat:'shelter'},
  {n:'92-2', name:'Навес ТБО', size:'4700×1425×2150 мм', cat:'shelter'},
  {n:'156', name:'Стойка для сушки белья 2.5м', size:'1800×2500×1700 мм', cat:'shelter'},
  {n:'157', name:'Стойка для сушки белья 5.0м', size:'1800×5000×1700 мм', cat:'shelter'},
  // Навигация и стенды
  {n:'5', name:'Информационный стенд', size:'650×562×2000 мм', cat:'nav'},
  {n:'14', name:'Стенд безопасности', size:'830×500×2200 мм', cat:'nav'},
  {n:'22', name:'Навигационный объект тип 2', size:'150×150×1800 мм', cat:'nav'},
  {n:'27', name:'Просветительный элемент тип 2', size:'1050×2500×100 мм', cat:'nav'},
  {n:'32', name:'Просветительский МАФ. Лупа', size:'100×100×800 мм', cat:'nav'},
  {n:'33', name:'Входная стелла', size:'1330×200×4000 мм', cat:'nav'},
  {n:'34', name:'Просветительский знак тип 1А', size:'300×300×1265 мм', cat:'nav'},
  {n:'36', name:'Навигационный столб', size:'1300×200×3000 мм', cat:'nav'},
  {n:'37', name:'Навигационный стенд тип 2', size:'1200×200×2200 мм', cat:'nav'},
  {n:'43', name:'Информационный стенд', size:'625×100×2500 мм', cat:'nav'},
  {n:'50', name:'Элементы навигации Тип 1', size:'1000×177×843 мм', cat:'nav'},
  {n:'51', name:'Элементы навигации Тип 2', size:'544×177×843 мм', cat:'nav'},
  {n:'56', name:'Информационный стенд', size:'900×250×2100 мм', cat:'nav'},
  {n:'65', name:'Стенд Конная тропа', size:'420×60×2400 мм', cat:'nav'},
  {n:'66', name:'Стенд экологический тип 1', size:'450×260×1000 мм', cat:'nav'},
  {n:'68', name:'Стенд экологический тип 2', size:'1000×310×1000 мм', cat:'nav'},
  {n:'86', name:'Указательный столб', size:'795×100×2000 мм', cat:'nav'},
  {n:'97', name:'Сенсорное оборудование. Полосатое зеркало', size:'900×108×2100 мм', cat:'nav'},
  {n:'118', name:'Информационная табличка тип 1', size:'350×255×1149 мм', cat:'nav'},
  {n:'119', name:'Информационная табличка тип 2', size:'800×255×1230 мм', cat:'nav'},
  {n:'120', name:'Исторический стенд', size:'900×150×2100 мм', cat:'nav'},
  {n:'121', name:'Выставочный стенд Тип 2. Временный', size:'1200×600×2400 мм', cat:'nav'},
  {n:'127', name:'Информационный стенд тип 2', size:'400×400×700 мм', cat:'nav'},
  {n:'130', name:'Стенд напольный', size:'800×130×1700 мм', cat:'nav'},
  // Прочее
  {n:'8', name:'Обшивка электрощита', size:'600×600×950 мм', cat:'other'},
  {n:'10', name:'Ярмарочный павильон', size:'2300×2000×2680 мм', cat:'other'},
  {n:'28', name:'Вешалка у зоны купания', size:'350×350×1750 мм', cat:'other'},
  {n:'78', name:'Тумба Тип 1', size:'4090×2149×450 мм', cat:'other'},
  {n:'79', name:'Тумба Тип 2', size:'2790×2149×450 мм', cat:'other'},
  {n:'80', name:'Тумба Тип 3', size:'680×680×450 мм', cat:'other'},
  {n:'160', name:'Стойка для чистки ковров', size:'2353×1200×2000 мм', cat:'other'},
];

// Фото для карточек — из основного каталога, точное соответствие страницам
const CAT_PHOTOS = {
  'bench-back':    'images/catalog/p16_i9.jpeg',  // стр16 — скамейка со спинкой у здания
  'bench-noback':  'images/catalog/p6_i4.jpeg',   // стр6 — Серенита, изогнутая скамья без спинки
  'bench-radius':  'images/catalog/p7_i7.jpeg',   // стр7 — Арте радиусная
  'bench-modular': 'images/catalog/p4_i1.jpeg',   // стр4 — модульная скамья с кашпо
  'table':         'images/catalog/p23_i4.jpeg',  // стр23 — стол бетонный
  'lounger':       'images/catalog/p25_i1.jpeg',  // стр25 — шезлонги у озера
  'bbq':           'images/catalog/p23_i5.jpeg',  // стр23 — BBQ комплект
  'chess':         'images/catalog/p24_i1.jpeg',  // стр24 — шахматный комплект
  'planter':       'images/catalog/p20_i4.jpeg',  // стр20 — кашпо с деревом
  'urn':           'images/catalog/p17_i1.jpeg',  // стр17 — урны в парке
  'bike':          'images/catalog/p27_i1.jpeg',  // стр27 — парковочные столбики/велопарковки
  'fence':         'images/catalog/p27_i1.jpeg',  // стр27
  'shelter':       'images/portfolio/p4_i3.jpeg', // реальный объект — навесы/беседки
  'nav':           'images/catalog/p14_i1.jpeg',  // стр14 — навигационные элементы
  'other':         'images/catalog/p29_i4.jpeg',  // стр29 — плиты/декор
};

const CAT_NAMES = {
  'all': 'Все изделия',
  'bench-back': 'Скамейки со спинкой',
  'bench-noback': 'Скамейки без спинки',
  'bench-radius': 'Радиусные скамейки',
  'bench-modular': 'Модульные серии',
  'table': 'Столы',
  'lounger': 'Лежаки и шезлонги',
  'bbq': 'Мангалы и BBQ',
  'chess': 'Шахматные комплексы',
  'planter': 'Кашпо и вазоны',
  'urn': 'Урны',
  'bike': 'Велопарковки',
  'fence': 'Ограждения',
  'shelter': 'Навесы и укрытия',
  'nav': 'Навигация и стенды',
  'other': 'Прочее',
};

let currentCat = 'all';

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = items.map(item => `
    <div class="cat-card" onclick="openModal('${item.n}')">
      <div class="cat-card__img" style="background-image:url('${CAT_PHOTOS[item.cat] || 'images/bench1.jpeg'}')"></div>
      <div class="cat-card__body">
        <div class="cat-card__num">Арт. ${item.n}</div>
        <div class="cat-card__name">${item.name}</div>
        <div class="cat-card__size">${item.size}</div>
        <span class="cat-card__cta">Запросить цену →</span>
      </div>
    </div>
  `).join('');
  document.getElementById('cat-count').textContent = `${items.length} позиций`;
}

function updateCounts() {
  // all
  document.getElementById('cnt-all').textContent = ITEMS.length;
  Object.keys(CAT_NAMES).forEach(cat => {
    if (cat === 'all') return;
    const el = document.getElementById('cnt-' + cat);
    if (el) el.textContent = ITEMS.filter(i => i.cat === cat).length;
  });
}

function filterCatalog() {
  const q = document.getElementById('search').value.toLowerCase();
  let items = currentCat === 'all' ? ITEMS : ITEMS.filter(i => i.cat === currentCat);
  if (q) items = items.filter(i => i.name.toLowerCase().includes(q) || i.n.includes(q));
  renderGrid(items);
}

function setCat(cat) {
  currentCat = cat;
  document.querySelectorAll('.sidebar__link').forEach(l => l.classList.toggle('active', l.dataset.cat === cat));
  document.getElementById('cat-title').textContent = CAT_NAMES[cat] || cat;
  document.getElementById('search').value = '';
  filterCatalog();
  // close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

function openModal(num) {
  const item = ITEMS.find(i => i.n === num);
  if (!item) return;
  document.getElementById('modal-num').textContent = 'Арт. ' + item.n;
  document.getElementById('modal-title').textContent = item.name;
  document.getElementById('modal-size').textContent = 'Размеры: ' + item.size;
  document.getElementById('modal-img').style.backgroundImage = `url('${CAT_PHOTOS[item.cat] || 'images/bench1.jpeg'}')`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal') && !e.target.classList.contains('modal__close')) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleCatalogMenu() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Init
document.querySelectorAll('.sidebar__link').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); setCat(link.dataset.cat); });
});

updateCounts();
renderGrid(ITEMS);
