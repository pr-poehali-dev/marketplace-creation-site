import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/49c75862-670a-4361-885b-7e06f207ac5c/files/902ed05e-64c0-4519-a2fc-e565cf131427.jpg";
const BUILDER_IMAGE = "https://cdn.poehali.dev/projects/49c75862-670a-4361-885b-7e06f207ac5c/files/b22358ff-4fdd-4d77-8fc9-47626fe5f8a3.jpg";
const TEMPLATES_IMAGE = "https://cdn.poehali.dev/projects/49c75862-670a-4361-885b-7e06f207ac5c/files/7932aa50-1d85-42ed-b952-99d458a3dce0.jpg";

type Section = "home" | "builder" | "templates";

const FEATURES = [
  { icon: "Zap", title: "Запуск за 5 минут", desc: "Выберите шаблон и получите готовый маркетплейс без единой строки кода" },
  { icon: "Palette", title: "Визуальный редактор", desc: "Меняйте цвета, шрифты, расположение блоков прямо в браузере" },
  { icon: "ShoppingCart", title: "Встроенные платежи", desc: "Принимайте оплату картой, СБП и криптовалютой с первого дня" },
  { icon: "Users", title: "Кабинет продавца", desc: "Личные кабинеты для продавцов и покупателей из коробки" },
  { icon: "BarChart3", title: "Аналитика в реальном времени", desc: "Следите за продажами, трафиком и конверсией на дашборде" },
  { icon: "Shield", title: "Защита и безопасность", desc: "SSL, модерация объявлений и антифрод встроены по умолчанию" },
];

const TEMPLATES = [
  { name: "TechHub", category: "Электроника", color: "from-blue-600 to-cyan-500", sales: "2 340+ магазинов", tags: ["Электроника", "Гаджеты"] },
  { name: "FashionFlow", category: "Мода", color: "from-pink-600 to-purple-500", sales: "1 890+ магазинов", tags: ["Одежда", "Обувь"] },
  { name: "AvitoPro", category: "Объявления", color: "from-orange-500 to-yellow-400", sales: "3 120+ площадок", tags: ["Авто", "Недвижимость"] },
  { name: "FoodMarket", category: "Еда", color: "from-green-500 to-teal-400", sales: "980+ магазинов", tags: ["Доставка", "Рестораны"] },
  { name: "CraftBazaar", category: "Handmade", color: "from-purple-600 to-pink-500", sales: "1 450+ магазинов", tags: ["Handmade", "Искусство"] },
  { name: "PropNest", category: "Недвижимость", color: "from-indigo-600 to-blue-500", sales: "670+ площадок", tags: ["Аренда", "Продажа"] },
];

const BUILDER_TOOLS = [
  { icon: "Layout", label: "Макет" },
  { icon: "Type", label: "Текст" },
  { icon: "Image", label: "Медиа" },
  { icon: "ShoppingBag", label: "Товары" },
  { icon: "CreditCard", label: "Оплата" },
  { icon: "Star", label: "Отзывы" },
];

const TICKER_ITEMS = [
  "Маркетплейс за 5 минут", "Без кода", "Встроенные платежи", "Тысячи шаблонов",
  "Аналитика продаж", "Кабинет продавца", "Мобильная версия", "Защита транзакций",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeColor, setActiveColor] = useState("#a259ff");
  const [activeBg, setActiveBg] = useState("#0d0d1a");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeSection]);

  const colors = ["#a259ff", "#00d2ff", "#ff4fa3", "#ff9500", "#00e676"];
  const bgs = ["#0d0d1a", "#0a1628", "#1a0d0d", "#0d1a0d", "#1a0a1a"];

  return (
    <div className="min-h-screen bg-background grid-bg relative overflow-x-hidden">
      {/* Ambient orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none z-0 animate-pulse-glow delay-500" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-pink-500/5 blur-[150px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
            <Icon name="Store" size={16} className="text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-white">MARKET<span className="gradient-text">FORGE</span></span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
          {([
            { id: "home", label: "Обзор", icon: "Home" },
            { id: "builder", label: "Конструктор", icon: "Settings2" },
            { id: "templates", label: "Шаблоны", icon: "LayoutGrid" },
          ] as { id: Section; label: string; icon: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-neon-purple text-white shadow-lg"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-outline-neon px-4 py-2 rounded-lg text-sm">Войти</button>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm">
            <span>Начать бесплатно</span>
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          {([
            { id: "home", label: "Обзор", icon: "Home" },
            { id: "builder", label: "Конструктор", icon: "Settings2" },
            { id: "templates", label: "Шаблоны", icon: "LayoutGrid" },
          ] as { id: Section; label: string; icon: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
              className="font-display text-3xl font-bold text-white/70 hover:text-white transition-colors flex items-center gap-3"
            >
              <Icon name={item.icon} size={28} />
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="btn-outline-neon px-6 py-3 rounded-xl">Войти</button>
            <button className="btn-primary px-6 py-3 rounded-xl"><span>Начать</span></button>
          </div>
        </div>
      )}

      {/* TICKER */}
      <div className="fixed top-[69px] left-0 right-0 z-40 overflow-hidden border-b border-white/5 bg-neon-purple/10 backdrop-blur-sm py-2">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 font-body text-xs font-medium text-neon-cyan/70 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-neon-purple inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <main className="relative z-10 pt-28">
        {/* ===== HOME SECTION ===== */}
        {activeSection === "home" && (
          <div key="home">
            {/* Hero */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative" ref={heroRef}>
              <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="inline-flex items-center gap-2 bg-neon-purple/15 border border-neon-purple/30 rounded-full px-4 py-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="font-body text-sm text-neon-cyan font-medium">Новая эра онлайн-торговли</span>
                </div>

                <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 tracking-tight">
                  <span className="text-white block">ЗАПУСТИ СВОЙ</span>
                  <span className="gradient-text-hot block">МАРКЕТПЛЕЙС</span>
                  <span className="text-white/40 block text-5xl md:text-6xl">БЕЗ ЕДИНОЙ СТРОКИ КОДА</span>
                </h1>

                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Визуальный конструктор, готовые шаблоны и встроенные платежи.
                  Превратите идею в работающий бизнес за один день.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <button
                    onClick={() => setActiveSection("builder")}
                    className="btn-primary px-8 py-4 rounded-xl text-base glow-purple"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="Rocket" size={18} />
                      Создать маркетплейс
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveSection("templates")}
                    className="btn-outline-neon px-8 py-4 rounded-xl text-base"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="Eye" size={18} />
                      Смотреть шаблоны
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-8 mb-16">
                  {[
                    { val: "15 000+", label: "Активных магазинов" },
                    { val: "₽2.4 млрд", label: "Оборот на платформе" },
                    { val: "4.9★", label: "Рейтинг пользователей" },
                  ].map((stat) => (
                    <div key={stat.val} className="text-center">
                      <div className="font-display text-3xl font-bold gradient-text">{stat.val}</div>
                      <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero image */}
              <div className={`w-full max-w-5xl mx-auto relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-purple animate-float">
                  <img src={HERO_IMAGE} alt="Платформа маркетплейсов" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                <div className="absolute -top-4 -left-4 card-glass rounded-xl px-4 py-3 flex items-center gap-2 glow-purple">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-body text-xs text-white font-medium">Online: 3 420 продавцов</span>
                </div>
                <div className="absolute -bottom-4 -right-4 card-glass rounded-xl px-4 py-3 flex items-center gap-2 glow-cyan">
                  <Icon name="TrendingUp" size={14} className="text-neon-cyan" />
                  <span className="font-body text-xs text-white font-medium">+₽847К сегодня</span>
                </div>
              </div>
            </section>

            {/* Features grid */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="font-display text-5xl font-bold text-white mb-4">ВСЁ ЧТО НУЖНО<br /><span className="gradient-text">ДЛЯ СТАРТА</span></h2>
                  <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">Не платите за десятки сервисов — всё включено в одну платформу</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FEATURES.map((f, i) => (
                    <div key={f.title} className={`card-glass card-glass-hover rounded-2xl p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="w-12 h-12 rounded-xl bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center mb-4">
                        <Icon name={f.icon} size={22} className="text-neon-purple" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="card-glass rounded-3xl p-12 relative overflow-hidden border border-neon-purple/20 glow-purple">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10 pointer-events-none" />
                  <h2 className="font-display text-5xl font-bold text-white mb-4 relative">ГОТОВ К ЗАПУСКУ?</h2>
                  <p className="font-body text-muted-foreground text-lg mb-8 relative">Первые 14 дней бесплатно, без привязки карты</p>
                  <button onClick={() => setActiveSection("builder")} className="btn-primary px-10 py-5 rounded-xl text-lg relative">
                    <span className="flex items-center gap-3">
                      <Icon name="Zap" size={22} />
                      Попробовать бесплатно
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== BUILDER SECTION ===== */}
        {activeSection === "builder" && (
          <div key="builder" className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="px-6 py-12 max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full px-4 py-2 mb-4">
                  <Icon name="Wand2" size={14} className="text-neon-cyan" />
                  <span className="font-body text-sm text-neon-cyan">Визуальный редактор</span>
                </div>
                <h2 className="font-display text-5xl font-bold text-white mb-3">КОНСТРУКТОР<br /><span className="gradient-text">МАРКЕТПЛЕЙСА</span></h2>
                <p className="font-body text-muted-foreground">Настройте внешний вид прямо здесь — без кода</p>
              </div>

              <div className="grid lg:grid-cols-4 gap-4 h-[600px]">
                {/* Left panel — tools */}
                <div className="card-glass rounded-2xl p-4 flex flex-col gap-3 border border-white/5">
                  <div className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Компоненты</div>
                  {BUILDER_TOOLS.map((tool) => (
                    <button key={tool.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-neon-purple/10 hover:border-neon-purple/30 border border-transparent transition-all group text-left">
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 flex items-center justify-center transition-colors">
                        <Icon name={tool.icon} size={16} className="text-muted-foreground group-hover:text-neon-purple" />
                      </div>
                      <span className="font-body text-sm text-muted-foreground group-hover:text-white transition-colors">{tool.label}</span>
                      <Icon name="Plus" size={14} className="text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}

                  <div className="mt-auto">
                    <div className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Страницы</div>
                    {["Главная", "Каталог", "Товар", "Корзина", "Профиль"].map((page) => (
                      <button key={page} className="w-full text-left px-3 py-2 rounded-lg font-body text-xs text-muted-foreground hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
                        <Icon name="FileText" size={12} />
                        {page}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Center — canvas */}
                <div className="lg:col-span-2 card-glass rounded-2xl overflow-hidden border border-white/5 relative">
                  <div className="bg-black/30 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="font-body text-xs text-muted-foreground mx-auto">mymarketplace.ru</span>
                  </div>

                  <div className="h-full overflow-auto" style={{ background: activeBg }}>
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
                      <div className="font-display text-lg font-bold" style={{ color: activeColor }}>МОЙ МАГАЗИН</div>
                      <div className="flex gap-3">
                        {["Каталог", "О нас", "Контакты"].map(n => (
                          <span key={n} className="font-body text-xs text-white/60">{n}</span>
                        ))}
                      </div>
                    </div>

                    <div className="px-6 py-8 text-center border-b border-white/5">
                      <div className="font-display text-3xl font-bold text-white mb-2">Лучшие товары</div>
                      <div className="font-body text-sm text-white/50 mb-4">Тысячи продавцов, миллионы товаров</div>
                      <div className="inline-block px-6 py-2 rounded-lg font-display text-sm font-medium text-white" style={{ background: activeColor }}>
                        Смотреть каталог
                      </div>
                    </div>

                    <div className={`p-4 ${activeLayout === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}`}>
                      {["Кроссовки Nike", "iPhone 15 Pro", "Куртка зимняя", "Рюкзак туристический"].map((item, i) => (
                        <div key={item} className="rounded-lg overflow-hidden border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div className="h-20 flex items-center justify-center" style={{ background: `${activeColor}22` }}>
                            <Icon name="Package" size={28} style={{ color: activeColor }} />
                          </div>
                          <div className="p-2">
                            <div className="font-body text-xs text-white font-medium">{item}</div>
                            <div className="font-display text-sm font-bold mt-1" style={{ color: activeColor }}>
                              {["₽4 990", "₽89 000", "₽7 500", "₽3 200"][i]}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — properties */}
                <div className="card-glass rounded-2xl p-4 flex flex-col gap-4 border border-white/5">
                  <div className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest">Настройки</div>

                  <div>
                    <div className="font-body text-xs text-muted-foreground mb-2">Акцентный цвет</div>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveColor(c)}
                          className={`w-8 h-8 rounded-lg transition-all ${activeColor === c ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"}`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-body text-xs text-muted-foreground mb-2">Фон страницы</div>
                    <div className="flex gap-2 flex-wrap">
                      {bgs.map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveBg(c)}
                          className={`w-8 h-8 rounded-lg border transition-all ${activeBg === c ? "ring-2 ring-white scale-110 border-white/30" : "opacity-60 hover:opacity-100 border-white/10"}`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-body text-xs text-muted-foreground mb-2">Раскладка товаров</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveLayout("grid")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-body text-xs transition-all ${activeLayout === "grid" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20"}`}
                      >
                        <Icon name="Grid3X3" size={14} /> Сетка
                      </button>
                      <button
                        onClick={() => setActiveLayout("list")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-body text-xs transition-all ${activeLayout === "list" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20"}`}
                      >
                        <Icon name="List" size={14} /> Список
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="font-body text-xs text-muted-foreground mb-2">Шрифт заголовков</div>
                    {["Современный", "Классический", "Жирный"].map(f => (
                      <label key={f} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                        <div className="w-3 h-3 rounded-full border border-neon-purple group-hover:bg-neon-purple/30 transition-colors" />
                        <span className="font-body text-xs text-muted-foreground group-hover:text-white transition-colors">{f}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <button className="btn-primary w-full py-3 rounded-xl text-sm">
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="Rocket" size={16} />
                        Опубликовать
                      </span>
                    </button>
                    <button className="btn-outline-neon w-full py-2.5 rounded-xl text-sm">
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="Save" size={14} />
                        Сохранить черновик
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Builder info */}
              <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-display text-3xl font-bold text-white mb-3">МОЩНЫЙ РЕДАКТОР<br /><span className="gradient-text">ДЛЯ ВСЕХ</span></h3>
                  <p className="font-body text-muted-foreground mb-4">Перетаскивайте блоки, меняйте цвета и настраивайте контент прямо в браузере. Не нужен дизайнер или программист.</p>
                  <div className="flex flex-col gap-2">
                    {["Drag & drop редактор блоков", "Мобильная версия автоматически", "Публикация в один клик", "История изменений и версии"].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} className="text-neon-cyan flex-shrink-0" />
                        <span className="font-body text-sm text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 glow-cyan">
                  <img src={BUILDER_IMAGE} alt="Конструктор" className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TEMPLATES SECTION ===== */}
        {activeSection === "templates" && (
          <div key="templates" className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="px-6 py-12 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full px-4 py-2 mb-4">
                  <Icon name="Sparkles" size={14} className="text-neon-pink" />
                  <span className="font-body text-sm text-neon-pink">Готовые решения</span>
                </div>
                <h2 className="font-display text-5xl font-bold text-white mb-3">ШАБЛОНЫ<br /><span className="gradient-text">МАРКЕТПЛЕЙСОВ</span></h2>
                <p className="font-body text-muted-foreground max-w-lg mx-auto">Выберите готовый шаблон и запустите площадку за несколько минут</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {["Все", "Электроника", "Мода", "Объявления", "Еда", "Handmade", "Недвижимость"].map(f => (
                  <button key={f} className={`px-4 py-2 rounded-xl font-body text-sm font-medium border transition-all ${f === "Все" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"}`}>
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TEMPLATES.map((tpl, i) => (
                  <div
                    key={tpl.name}
                    className={`card-glass card-glass-hover rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${selectedTemplate === i ? "border-neon-purple glow-purple scale-[1.02]" : "border-white/5"}`}
                    onClick={() => setSelectedTemplate(selectedTemplate === i ? null : i)}
                  >
                    <div className={`h-40 bg-gradient-to-br ${tpl.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 grid-bg" />
                      <span className="font-display text-3xl font-bold text-white relative z-10">{tpl.name}</span>
                      {selectedTemplate === i && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Icon name="Check" size={14} className="text-gray-900" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-white">{tpl.name}</h3>
                          <p className="font-body text-xs text-muted-foreground">{tpl.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-body text-xs text-muted-foreground">{tpl.sales}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-3">
                        {tpl.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-body text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className={`mt-4 w-full py-2.5 rounded-xl font-display text-sm font-medium tracking-wider uppercase transition-all ${selectedTemplate === i ? "btn-primary text-white" : "btn-outline-neon"}`}>
                        <span>{selectedTemplate === i ? "Выбран ✓" : "Выбрать шаблон"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img src={TEMPLATES_IMAGE} alt="Шаблоны" className="w-full h-56 object-cover" />
                </div>
                <div className="card-glass rounded-2xl p-8 border border-neon-purple/20">
                  <h3 className="font-display text-3xl font-bold text-white mb-3">НЕ НАШЛИ<br /><span className="gradient-text">ПОДХОДЯЩИЙ?</span></h3>
                  <p className="font-body text-muted-foreground mb-6">Создайте уникальный маркетплейс с нуля в нашем конструкторе. Или закажите разработку под ваш бизнес.</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setActiveSection("builder")} className="btn-primary py-3 rounded-xl text-sm">
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="Wand2" size={16} />
                        Создать с нуля
                      </span>
                    </button>
                    <button className="btn-outline-neon py-3 rounded-xl text-sm">
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="MessageCircle" size={16} />
                        Заказать разработку
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-10 px-6 mt-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <Icon name="Store" size={14} className="text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">MARKET<span className="gradient-text">FORGE</span></span>
            </div>
            <p className="font-body text-xs text-muted-foreground">© 2024 MarketForge. Все права защищены.</p>
            <div className="flex gap-4">
              {["Условия", "Конфиденциальность", "Поддержка"].map(l => (
                <button key={l} className="font-body text-xs text-muted-foreground hover:text-white transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
