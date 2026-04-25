import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/49c75862-670a-4361-885b-7e06f207ac5c/files/902ed05e-64c0-4519-a2fc-e565cf131427.jpg";
const TEMPLATES_IMAGE = "https://cdn.poehali.dev/projects/49c75862-670a-4361-885b-7e06f207ac5c/files/7932aa50-1d85-42ed-b952-99d458a3dce0.jpg";

type Section = "home" | "builder" | "templates";
type DeviceMode = "desktop" | "tablet" | "mobile";
type BlockType = "hero" | "catalog" | "banner" | "reviews" | "footer" | "categories" | "features";

interface CanvasBlock {
  id: string;
  type: BlockType;
  label: string;
  icon: string;
  visible: boolean;
}

const BLOCK_LIBRARY: { type: BlockType; label: string; icon: string; desc: string }[] = [
  { type: "hero", label: "Главный баннер", icon: "Megaphone", desc: "Заголовок + CTA кнопка" },
  { type: "categories", label: "Категории", icon: "LayoutGrid", desc: "Сетка категорий товаров" },
  { type: "catalog", label: "Каталог товаров", icon: "ShoppingBag", desc: "Карточки с ценами" },
  { type: "banner", label: "Промо-баннер", icon: "Percent", desc: "Акции и скидки" },
  { type: "reviews", label: "Отзывы", icon: "Star", desc: "Рейтинг и комментарии" },
  { type: "features", label: "Преимущества", icon: "Sparkles", desc: "Блок с иконками" },
  { type: "footer", label: "Подвал", icon: "AlignBottom", desc: "Контакты и ссылки" },
];

const DEFAULT_BLOCKS: CanvasBlock[] = [
  { id: "b1", type: "hero", label: "Главный баннер", icon: "Megaphone", visible: true },
  { id: "b2", type: "categories", label: "Категории", icon: "LayoutGrid", visible: true },
  { id: "b3", type: "catalog", label: "Каталог товаров", icon: "ShoppingBag", visible: true },
  { id: "b4", type: "reviews", label: "Отзывы", icon: "Star", visible: true },
  { id: "b5", type: "footer", label: "Подвал", icon: "AlignBottom", visible: true },
];

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

const TICKER_ITEMS = [
  "Маркетплейс за 5 минут", "Без кода", "Встроенные платежи", "Тысячи шаблонов",
  "Аналитика продаж", "Кабинет продавца", "Мобильная версия", "Защита транзакций",
];

const FONTS = [
  { name: "Oswald", label: "Oswald" },
  { name: "Montserrat", label: "Montserrat" },
  { name: "Rubik", label: "Rubik" },
  { name: "Golos Text", label: "Golos Text" },
];

const RADIUS_OPTIONS = [
  { value: "0px", label: "Квадрат" },
  { value: "6px", label: "Мягкий" },
  { value: "14px", label: "Округлый" },
  { value: "999px", label: "Пилюля" },
];

// ─── Block Preview Components ───────────────────────────────────────────────

function BlockHero({ color, font, bg, storeName, radius }: { color: string; font: string; bg: string; storeName: string; radius: string }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${color}33 0%, ${bg} 100%)`, padding: "28px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{storeName}</div>
      <div style={{ fontFamily: "Golos Text, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
        Тысячи товаров от проверенных продавцов
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ background: color, color: "#fff", borderRadius: radius, padding: "7px 16px", fontSize: 11, fontFamily: font, fontWeight: 600 }}>Каталог</div>
        <div style={{ border: `1px solid ${color}`, color: color, borderRadius: radius, padding: "7px 16px", fontSize: 11, fontFamily: font }}>О нас</div>
      </div>
    </div>
  );
}

function BlockCategories({ color, bg, radius }: { color: string; bg: string; radius: string }) {
  const cats = ["👗 Одежда", "📱 Гаджеты", "🏠 Дом", "🚗 Авто", "🎮 Игры", "🌿 Спорт"];
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 10, fontFamily: "Golos Text, sans-serif" }}>КАТЕГОРИИ</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cats.map(c => (
          <div key={c} style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: radius, padding: "5px 10px", fontSize: 10, color: "rgba(255,255,255,0.8)", fontFamily: "Golos Text, sans-serif" }}>{c}</div>
        ))}
      </div>
    </div>
  );
}

function BlockCatalog({ color, bg, layout, radius, font }: { color: string; bg: string; layout: string; radius: string; font: string }) {
  const items = [
    { name: "Кроссовки Nike", price: "₽4 990", emoji: "👟" },
    { name: "iPhone 15 Pro", price: "₽89 000", emoji: "📱" },
    { name: "Куртка зимняя", price: "₽7 500", emoji: "🧥" },
    { name: "Рюкзак", price: "₽3 200", emoji: "🎒" },
  ];
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 10, fontFamily: "Golos Text, sans-serif" }}>ТОВАРЫ</div>
      <div style={{ display: layout === "grid" ? "grid" : "flex", gridTemplateColumns: layout === "grid" ? "1fr 1fr" : undefined, flexDirection: layout !== "grid" ? "column" : undefined, gap: 8 }}>
        {items.map(item => (
          <div key={item.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: radius, overflow: "hidden" }}>
            {layout === "grid" ? (
              <>
                <div style={{ background: `${color}20`, padding: "12px 0", textAlign: "center", fontSize: 22 }}>{item.emoji}</div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Golos Text, sans-serif", marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: font }}>{item.price}</div>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px" }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Golos Text, sans-serif" }}>{item.name}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: font, flexShrink: 0 }}>{item.price}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockBanner({ color, radius }: { color: string; radius: string }) {
  return (
    <div style={{ margin: "0 20px 0", padding: "14px 16px", background: `linear-gradient(135deg, ${color}55, ${color}22)`, borderRadius: radius, border: `1px solid ${color}44`, marginBottom: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "Oswald, sans-serif", marginBottom: 3 }}>🔥 СКИДКИ ДО 70%</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "Golos Text, sans-serif" }}>Только сегодня — успей купить!</div>
    </div>
  );
}

function BlockReviews({ color, radius }: { color: string; radius: string }) {
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 10, fontFamily: "Golos Text, sans-serif" }}>ОТЗЫВЫ</div>
      {[
        { name: "Алексей К.", text: "Быстрая доставка, всё пришло в срок!", stars: 5 },
        { name: "Мария Р.", text: "Отличный магазин, рекомендую.", stars: 5 },
      ].map(r => (
        <div key={r.name} style={{ background: "rgba(255,255,255,0.03)", borderRadius: radius, padding: "10px 12px", marginBottom: 6, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontSize: 10, color: "#fff", fontFamily: "Golos Text, sans-serif", fontWeight: 600 }}>{r.name}</div>
            <div style={{ color, fontSize: 10 }}>{"★".repeat(r.stars)}</div>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "Golos Text, sans-serif" }}>{r.text}</div>
        </div>
      ))}
    </div>
  );
}

function BlockFeatures({ color, radius }: { color: string; radius: string }) {
  const items = [{ e: "⚡", t: "Быстро" }, { e: "🔒", t: "Безопасно" }, { e: "📦", t: "Доставка" }];
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
      {items.map(i => (
        <div key={i.t} style={{ flex: 1, textAlign: "center", background: `${color}12`, borderRadius: radius, padding: "10px 6px", border: `1px solid ${color}25` }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>{i.e}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "Golos Text, sans-serif" }}>{i.t}</div>
        </div>
      ))}
    </div>
  );
}

function BlockFooter({ color }: { color: string }) {
  return (
    <div style={{ padding: "14px 20px", background: "rgba(0,0,0,0.3)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color, fontFamily: "Oswald, sans-serif", fontWeight: 700 }}>МАГАЗИН</div>
        <div style={{ display: "flex", gap: 10 }}>
          {["О нас", "Помощь", "Контакты"].map(l => (
            <div key={l} style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "Golos Text, sans-serif" }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderBlock(block: CanvasBlock, props: { color: string; bg: string; layout: string; radius: string; font: string; storeName: string }) {
  if (!block.visible) return null;
  switch (block.type) {
    case "hero": return <BlockHero key={block.id} color={props.color} font={props.font} bg={props.bg} storeName={props.storeName} radius={props.radius} />;
    case "categories": return <BlockCategories key={block.id} color={props.color} bg={props.bg} radius={props.radius} />;
    case "catalog": return <BlockCatalog key={block.id} color={props.color} bg={props.bg} layout={props.layout} radius={props.radius} font={props.font} />;
    case "banner": return <BlockBanner key={block.id} color={props.color} radius={props.radius} />;
    case "reviews": return <BlockReviews key={block.id} color={props.color} radius={props.radius} />;
    case "features": return <BlockFeatures key={block.id} color={props.color} radius={props.radius} />;
    case "footer": return <BlockFooter key={block.id} color={props.color} />;
    default: return null;
  }
}

// ─── Builder Component ───────────────────────────────────────────────────────

function BuilderSection() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>(DEFAULT_BLOCKS);
  const [color, setColor] = useState("#a259ff");
  const [bg, setBg] = useState("#0d0d1a");
  const [layout, setLayout] = useState("grid");
  const [radius, setRadius] = useState("14px");
  const [font, setFont] = useState("Oswald");
  const [storeName, setStoreName] = useState("МОЙ МАГАЗИН");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"blocks" | "design" | "layers">("blocks");
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<CanvasBlock[][]>([DEFAULT_BLOCKS]);
  const [histIdx, setHistIdx] = useState(0);

  const colors = ["#a259ff", "#00d2ff", "#ff4fa3", "#ff6b35", "#00e676", "#ffd700"];
  const bgs = ["#0d0d1a", "#0a1628", "#1a0d0d", "#0d1a0d", "#1a1a0a", "#1a0a1a"];

  const pushHistory = (newBlocks: CanvasBlock[]) => {
    const next = history.slice(0, histIdx + 1);
    next.push(newBlocks);
    setHistory(next);
    setHistIdx(next.length - 1);
    setBlocks(newBlocks);
  };

  const undo = () => {
    if (histIdx > 0) { setHistIdx(histIdx - 1); setBlocks(history[histIdx - 1]); }
  };
  const redo = () => {
    if (histIdx < history.length - 1) { setHistIdx(histIdx + 1); setBlocks(history[histIdx + 1]); }
  };

  const addBlock = (type: BlockType) => {
    const lib = BLOCK_LIBRARY.find(b => b.type === type)!;
    const nb: CanvasBlock = { id: `b${Date.now()}`, type, label: lib.label, icon: lib.icon, visible: true };
    pushHistory([...blocks, nb]);
  };

  const removeBlock = (id: string) => {
    pushHistory(blocks.filter(b => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(null);
  };

  const toggleVisible = (id: string) => {
    pushHistory(blocks.map(b => b.id === id ? { ...b, visible: !b.visible } : b));
  };

  const moveBlock = (id: string, dir: "up" | "down") => {
    const idx = blocks.findIndex(b => b.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === blocks.length - 1) return;
    const next = [...blocks];
    const swap = dir === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    pushHistory(next);
  };

  // Drag & drop reorder
  const handleDragStart = (id: string) => setDragItem(id);
  const handleDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); setDragOver(id); };
  const handleDrop = (targetId: string) => {
    if (!dragItem || dragItem === targetId) { setDragOver(null); setDragItem(null); return; }
    const from = blocks.findIndex(b => b.id === dragItem);
    const to = blocks.findIndex(b => b.id === targetId);
    const next = [...blocks];
    next.splice(to, 0, next.splice(from, 1)[0]);
    pushHistory(next);
    setDragOver(null);
    setDragItem(null);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deviceWidth = device === "mobile" ? 375 : device === "tablet" ? 600 : "100%";

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ paddingTop: 0 }}>
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-background/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {(["blocks", "design", "layers"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md font-body text-xs font-medium transition-all ${activeTab === tab ? "bg-neon-purple/80 text-white" : "text-muted-foreground hover:text-white"}`}
              >
                {{ blocks: "Блоки", design: "Дизайн", layers: "Слои" }[tab]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={undo} disabled={histIdx === 0} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground disabled:opacity-30 transition-all" title="Отменить">
              <Icon name="Undo2" size={14} />
            </button>
            <button onClick={redo} disabled={histIdx >= history.length - 1} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground disabled:opacity-30 transition-all" title="Повторить">
              <Icon name="Redo2" size={14} />
            </button>
          </div>
        </div>

        {/* Device switcher */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          {([
            { d: "desktop", icon: "Monitor" },
            { d: "tablet", icon: "Tablet" },
            { d: "mobile", icon: "Smartphone" },
          ] as { d: DeviceMode; icon: string }[]).map(({ d, icon }) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`p-1.5 rounded-md transition-all ${device === d ? "bg-neon-cyan/20 text-neon-cyan" : "text-muted-foreground hover:text-white"}`}
            >
              <Icon name={icon} size={14} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 border border-white/5">
            <Icon name="Globe" size={12} className="text-muted-foreground" />
            <input
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="bg-transparent font-display text-xs text-white outline-none w-28 placeholder:text-muted-foreground"
              placeholder="Название магазина"
            />
          </div>
          <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all ${saved ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/5 text-muted-foreground hover:text-white border border-white/5"}`}>
            <Icon name={saved ? "CheckCircle" : "Save"} size={12} />
            {saved ? "Сохранено" : "Черновик"}
          </button>
          <button className="btn-primary px-4 py-1.5 rounded-lg text-xs">
            <span className="flex items-center gap-1.5">
              <Icon name="Rocket" size={12} />
              Опубликовать
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT PANEL ── */}
        <div className="w-56 flex-shrink-0 border-r border-white/5 flex flex-col overflow-hidden bg-background/50">
          {/* Blocks tab */}
          {activeTab === "blocks" && (
            <div className="flex flex-col h-full overflow-y-auto p-3 gap-2">
              <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Добавить блок</div>
              {BLOCK_LIBRARY.map(item => (
                <button
                  key={item.type}
                  onClick={() => addBlock(item.type)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-neon-purple/10 border border-transparent hover:border-neon-purple/30 transition-all group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-muted-foreground group-hover:text-neon-purple" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-white/80 group-hover:text-white transition-colors leading-tight">{item.label}</div>
                    <div className="font-body text-[10px] text-muted-foreground">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Design tab */}
          {activeTab === "design" && (
            <div className="flex flex-col h-full overflow-y-auto p-3 gap-4">
              <div>
                <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Акцент</div>
                <div className="flex gap-1.5 flex-wrap">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-lg transition-all ${color === c ? "ring-2 ring-white ring-offset-1 ring-offset-background scale-110" : "opacity-70 hover:opacity-100"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent" />
                  <span className="font-body text-[10px] text-muted-foreground">Свой цвет</span>
                </div>
              </div>

              <div>
                <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Фон</div>
                <div className="flex gap-1.5 flex-wrap">
                  {bgs.map(c => (
                    <button
                      key={c}
                      onClick={() => setBg(c)}
                      className={`w-7 h-7 rounded-lg border transition-all ${bg === c ? "ring-2 ring-white ring-offset-1 ring-offset-background scale-110 border-white/30" : "opacity-70 hover:opacity-100 border-white/10"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Скругление</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {RADIUS_OPTIONS.map(r => (
                    <button
                      key={r.value}
                      onClick={() => setRadius(r.value)}
                      className={`py-1.5 px-2 text-[10px] font-body transition-all border ${radius === r.value ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20"}`}
                      style={{ borderRadius: r.value === "0px" ? 4 : r.value === "6px" ? 6 : r.value === "14px" ? 10 : 99 }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Раскладка</div>
                <div className="flex gap-1.5">
                  <button onClick={() => setLayout("grid")} className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border font-body text-[10px] transition-all ${layout === "grid" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
                    <Icon name="Grid3X3" size={11} /> Сетка
                  </button>
                  <button onClick={() => setLayout("list")} className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border font-body text-[10px] transition-all ${layout === "list" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
                    <Icon name="List" size={11} /> Список
                  </button>
                </div>
              </div>

              <div>
                <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Шрифт</div>
                <div className="flex flex-col gap-1">
                  {FONTS.map(f => (
                    <button
                      key={f.name}
                      onClick={() => setFont(f.name)}
                      className={`py-2 px-3 rounded-lg text-left text-xs transition-all border ${font === f.name ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10" : "border-white/5 text-muted-foreground hover:text-white hover:border-white/10"}`}
                      style={{ fontFamily: f.name }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Layers tab */}
          {activeTab === "layers" && (
            <div className="flex flex-col h-full overflow-y-auto p-3 gap-1">
              <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Слои страницы</div>
              {blocks.map((block, idx) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={() => handleDragStart(block.id)}
                  onDragOver={e => handleDragOver(e, block.id)}
                  onDrop={() => handleDrop(block.id)}
                  onClick={() => setSelectedBlock(block.id === selectedBlock ? null : block.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border group ${
                    selectedBlock === block.id ? "bg-neon-purple/15 border-neon-purple/40" : "border-transparent hover:bg-white/5"
                  } ${dragOver === block.id ? "border-neon-cyan/60 bg-neon-cyan/10" : ""}`}
                >
                  <Icon name="GripVertical" size={12} className="text-muted-foreground/40 cursor-grab flex-shrink-0" />
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${selectedBlock === block.id ? "bg-neon-purple/30" : "bg-white/5"}`}>
                    <Icon name={block.icon} size={11} className={selectedBlock === block.id ? "text-neon-purple" : "text-muted-foreground"} />
                  </div>
                  <span className="font-body text-xs text-white/70 flex-1 truncate">{block.label}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={e => { e.stopPropagation(); toggleVisible(block.id); }} className="p-0.5 hover:text-white text-muted-foreground transition-colors">
                      <Icon name={block.visible ? "Eye" : "EyeOff"} size={11} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); moveBlock(block.id, "up"); }} disabled={idx === 0} className="p-0.5 hover:text-white text-muted-foreground transition-colors disabled:opacity-30">
                      <Icon name="ChevronUp" size={11} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); moveBlock(block.id, "down"); }} disabled={idx === blocks.length - 1} className="p-0.5 hover:text-white text-muted-foreground transition-colors disabled:opacity-30">
                      <Icon name="ChevronDown" size={11} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); removeBlock(block.id); }} className="p-0.5 hover:text-red-400 text-muted-foreground transition-colors">
                      <Icon name="Trash2" size={11} />
                    </button>
                  </div>
                </div>
              ))}
              {blocks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground font-body text-xs">
                  <Icon name="Layers" size={28} className="mx-auto mb-2 opacity-30" />
                  Добавьте блоки во вкладке «Блоки»
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── CANVAS ── */}
        <div className="flex-1 overflow-auto flex flex-col items-center bg-[#0a0a12] relative">
          {/* Canvas header */}
          <div className="sticky top-0 z-10 w-full flex items-center justify-center py-2 bg-[#0a0a12]/80 backdrop-blur-sm border-b border-white/5">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="font-body text-[10px] text-muted-foreground ml-2">
                {storeName.toLowerCase().replace(/ /g, "-")}.marketforge.ru
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-start justify-center p-6 w-full">
            <div
              className="relative overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                width: deviceWidth,
                maxWidth: "100%",
                minHeight: 500,
                background: bg,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Nav bar in preview */}
              <div style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 10 }}>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color }}>🛒 {storeName}</div>
                <div style={{ display: "flex", gap: 12 }}>
                  {["Каталог", "Продавцам", "Войти"].map(n => (
                    <div key={n} style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "Golos Text, sans-serif" }}>{n}</div>
                  ))}
                </div>
              </div>

              {/* Blocks */}
              {blocks.map(block => (
                <div
                  key={block.id}
                  className={`relative transition-all duration-200 ${selectedBlock === block.id ? "ring-2 ring-neon-purple/70 ring-inset" : ""}`}
                  onClick={() => setSelectedBlock(block.id === selectedBlock ? null : block.id)}
                  style={{ cursor: "pointer", opacity: block.visible ? 1 : 0.3, filter: block.visible ? "none" : "grayscale(1)" }}
                >
                  {renderBlock(block, { color, bg, layout, radius, font, storeName })}
                  {selectedBlock === block.id && (
                    <div className="absolute top-2 right-2 flex gap-1 z-20">
                      <button
                        onClick={e => { e.stopPropagation(); toggleVisible(block.id); }}
                        className="p-1 bg-background/80 rounded-md border border-white/10 hover:border-neon-cyan/50 transition-all"
                      >
                        <Icon name={block.visible ? "Eye" : "EyeOff"} size={11} className="text-neon-cyan" />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); removeBlock(block.id); }}
                        className="p-1 bg-background/80 rounded-md border border-white/10 hover:border-red-500/50 transition-all"
                      >
                        <Icon name="Trash2" size={11} className="text-red-400" />
                      </button>
                    </div>
                  )}
                  {selectedBlock === block.id && block.visible && (
                    <div className="absolute inset-0 pointer-events-none border-2 border-neon-purple/40 rounded-sm" />
                  )}
                </div>
              ))}

              {blocks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                  <Icon name="PlusCircle" size={40} className="text-muted-foreground/30 mb-3" />
                  <div className="font-body text-sm text-muted-foreground/50">Добавьте блоки из панели слева</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: quick stats ── */}
        <div className="w-48 flex-shrink-0 border-l border-white/5 flex flex-col overflow-hidden bg-background/50 p-3 gap-3">
          <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Статус</div>

          <div className="card-glass rounded-xl p-3 border border-white/5">
            <div className="font-body text-[10px] text-muted-foreground mb-1">Блоков на странице</div>
            <div className="font-display text-2xl font-bold gradient-text">{blocks.filter(b => b.visible).length}</div>
            <div className="font-body text-[10px] text-muted-foreground">из {blocks.length} всего</div>
          </div>

          <div className="card-glass rounded-xl p-3 border border-white/5">
            <div className="font-body text-[10px] text-muted-foreground mb-2">Превью на устройстве</div>
            <div className="flex items-center gap-2">
              <Icon name={{ desktop: "Monitor", tablet: "Tablet", mobile: "Smartphone" }[device] as string} size={14} className="text-neon-cyan" />
              <span className="font-body text-xs text-white">{{ desktop: "Десктоп", tablet: "Планшет", mobile: "Телефон" }[device]}</span>
            </div>
          </div>

          <div className="card-glass rounded-xl p-3 border border-white/5">
            <div className="font-body text-[10px] text-muted-foreground mb-2">Акцент</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: color }} />
              <span className="font-body text-[10px] text-muted-foreground uppercase">{color}</span>
            </div>
          </div>

          <div className="card-glass rounded-xl p-3 border border-white/5">
            <div className="font-body text-[10px] text-muted-foreground mb-2">История</div>
            <div className="flex gap-1.5">
              <button onClick={undo} disabled={histIdx === 0} className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all flex items-center justify-center">
                <Icon name="Undo2" size={12} className="text-muted-foreground" />
              </button>
              <button onClick={redo} disabled={histIdx >= history.length - 1} className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all flex items-center justify-center">
                <Icon name="Redo2" size={12} className="text-muted-foreground" />
              </button>
            </div>
            <div className="font-body text-[10px] text-muted-foreground mt-1 text-center">{histIdx + 1} / {history.length}</div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="font-display text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">SEO</div>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 font-body text-[10px] text-white placeholder:text-muted-foreground outline-none focus:border-neon-purple/50 transition-colors" placeholder="Заголовок страницы" defaultValue={storeName} />
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 font-body text-[10px] text-white placeholder:text-muted-foreground outline-none focus:border-neon-purple/50 transition-colors resize-none" placeholder="Описание для поисковиков..." rows={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeSection]);

  return (
    <div className={`min-h-screen bg-background relative overflow-x-hidden ${activeSection !== "builder" ? "grid-bg" : ""}`}>
      {activeSection !== "builder" && (
        <>
          <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0 animate-pulse-glow" />
          <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none z-0 animate-pulse-glow delay-500" />
        </>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3.5 backdrop-blur-xl bg-background/70 border-b border-white/5">
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
                activeSection === item.id ? "bg-neon-purple text-white shadow-lg" : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-outline-neon px-4 py-2 rounded-lg text-sm">Войти</button>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm"><span>Начать бесплатно</span></button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          {([
            { id: "home", label: "Обзор", icon: "Home" },
            { id: "builder", label: "Конструктор", icon: "Settings2" },
            { id: "templates", label: "Шаблоны", icon: "LayoutGrid" },
          ] as { id: Section; label: string; icon: string }[]).map((item) => (
            <button key={item.id} onClick={() => { setActiveSection(item.id); setMenuOpen(false); }} className="font-display text-3xl font-bold text-white/70 hover:text-white transition-colors flex items-center gap-3">
              <Icon name={item.icon} size={28} />{item.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="btn-outline-neon px-6 py-3 rounded-xl">Войти</button>
            <button className="btn-primary px-6 py-3 rounded-xl"><span>Начать</span></button>
          </div>
        </div>
      )}

      {/* TICKER — only on non-builder pages */}
      {activeSection !== "builder" && (
        <div className="fixed top-[61px] left-0 right-0 z-40 overflow-hidden border-b border-white/5 bg-neon-purple/10 backdrop-blur-sm py-2">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6 font-body text-xs font-medium text-neon-cyan/70 uppercase tracking-widest">
                <span className="w-1 h-1 rounded-full bg-neon-purple inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── BUILDER: fullscreen, no ticker offset ── */}
      {activeSection === "builder" && (
        <div className="pt-[61px] h-screen overflow-hidden">
          <BuilderSection />
        </div>
      )}

      {activeSection !== "builder" && (
        <main className="relative z-10 pt-[95px]">
          {/* ===== HOME ===== */}
          {activeSection === "home" && (
            <div>
              <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative">
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
                    Визуальный конструктор, готовые шаблоны и встроенные платежи. Превратите идею в работающий бизнес за один день.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <button onClick={() => setActiveSection("builder")} className="btn-primary px-8 py-4 rounded-xl text-base glow-purple">
                      <span className="flex items-center gap-2"><Icon name="Rocket" size={18} />Создать маркетплейс</span>
                    </button>
                    <button onClick={() => setActiveSection("templates")} className="btn-outline-neon px-8 py-4 rounded-xl text-base">
                      <span className="flex items-center gap-2"><Icon name="Eye" size={18} />Смотреть шаблоны</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {[{ val: "15 000+", label: "Активных магазинов" }, { val: "₽2.4 млрд", label: "Оборот на платформе" }, { val: "4.9★", label: "Рейтинг пользователей" }].map(stat => (
                      <div key={stat.val} className="text-center">
                        <div className="font-display text-3xl font-bold gradient-text">{stat.val}</div>
                        <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`w-full max-w-5xl mx-auto relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-purple animate-float">
                    <img src={HERO_IMAGE} alt="Платформа" className="w-full h-auto object-cover" />
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

              <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="font-display text-5xl font-bold text-white mb-4">ВСЁ ЧТО НУЖНО<br /><span className="gradient-text">ДЛЯ СТАРТА</span></h2>
                    <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">Не платите за десятки сервисов — всё включено</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((f, i) => (
                      <div key={f.title} className="card-glass card-glass-hover rounded-2xl p-6" style={{ transitionDelay: `${i * 80}ms` }}>
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

              <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="card-glass rounded-3xl p-12 relative overflow-hidden border border-neon-purple/20 glow-purple">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10 pointer-events-none" />
                    <h2 className="font-display text-5xl font-bold text-white mb-4 relative">ГОТОВ К ЗАПУСКУ?</h2>
                    <p className="font-body text-muted-foreground text-lg mb-8 relative">Первые 14 дней бесплатно, без привязки карты</p>
                    <button onClick={() => setActiveSection("builder")} className="btn-primary px-10 py-5 rounded-xl text-lg relative">
                      <span className="flex items-center gap-3"><Icon name="Zap" size={22} />Попробовать бесплатно</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ===== TEMPLATES ===== */}
          {activeSection === "templates" && (
            <div className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
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
                    <button key={f} className={`px-4 py-2 rounded-xl font-body text-sm font-medium border transition-all ${f === "Все" ? "border-neon-purple text-neon-purple bg-neon-purple/10" : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"}`}>{f}</button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {TEMPLATES.map((tpl, i) => (
                    <div key={tpl.name} className={`card-glass card-glass-hover rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${selectedTemplate === i ? "border-neon-purple glow-purple scale-[1.02]" : "border-white/5"}`} onClick={() => setSelectedTemplate(selectedTemplate === i ? null : i)}>
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
                          <div className="font-body text-xs text-muted-foreground">{tpl.sales}</div>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-3">
                          {tpl.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-body text-xs text-muted-foreground">{tag}</span>
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
                    <p className="font-body text-muted-foreground mb-6">Создайте уникальный маркетплейс с нуля в нашем конструкторе.</p>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => setActiveSection("builder")} className="btn-primary py-3 rounded-xl text-sm">
                        <span className="flex items-center justify-center gap-2"><Icon name="Wand2" size={16} />Создать с нуля</span>
                      </button>
                      <button className="btn-outline-neon py-3 rounded-xl text-sm">
                        <span className="flex items-center justify-center gap-2"><Icon name="MessageCircle" size={16} />Заказать разработку</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
      )}
    </div>
  );
}
