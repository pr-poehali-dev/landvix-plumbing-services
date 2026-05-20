import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/ceb269fb-4e0d-409f-b49f-f63c48a5dc68.jpg';
const PORTFOLIO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/6d5352a8-8f9e-4293-a899-478dbceeae6f.jpg';

const SERVICES = [
  { icon: 'Wrench', title: 'Монтаж сантехники', desc: 'Установка унитазов, раковин, ванн, душевых кабин. Работаем с любыми брендами.', price: 'от 1 500 ₽' },
  { icon: 'Pipette', title: 'Замена труб', desc: 'Замена стальных и чугунных труб на пластиковые. Скрытая и открытая прокладка.', price: 'от 800 ₽/м' },
  { icon: 'Droplets', title: 'Устранение течи', desc: 'Быстрый выезд при аварийных ситуациях. Работаем 24/7 без выходных.', price: 'от 500 ₽' },
  { icon: 'Flame', title: 'Котлы и отопление', desc: 'Установка и обслуживание газовых и электрических котлов. Проектирование систем.', price: 'от 3 000 ₽' },
  { icon: 'Filter', title: 'Фильтры воды', desc: 'Подбор, установка и обслуживание систем очистки воды под ваши задачи.', price: 'от 2 000 ₽' },
  { icon: 'ShowerHead', title: 'Ванная под ключ', desc: 'Полный монтаж сантехники в новой ванной комнате с гарантией 2 года.', price: 'от 15 000 ₽' },
];

const PORTFOLIO = [
  { title: 'Ванная в ЖК "Рассвет"', area: 'Центральный р-н', type: 'Монтаж под ключ', year: '2024' },
  { title: 'Замена труб в хрущёвке', area: 'Советский р-н', type: 'Замена трубопровода', year: '2024' },
  { title: 'Котёл Bosch в частном доме', area: 'Загородная зона', type: 'Отопление', year: '2023' },
  { title: 'Офис 450 м²', area: 'Бизнес-центр "Атлас"', type: 'Коммерческий объект', year: '2023' },
  { title: 'Душевая кабина Hansgrohe', area: 'Ленинский р-н', type: 'Установка', year: '2024' },
  { title: 'Система фильтрации', area: 'Кировский р-н', type: 'Водоочистка', year: '2024' },
];

const REVIEWS = [
  { name: 'Алексей Морозов', rating: 5, text: 'Вызвал мастера в 22:00 — приехал через 25 минут. Труба прорвалась под раковиной. Починили быстро, аккуратно, цена адекватная. Однозначно рекомендую!', date: 'Март 2024' },
  { name: 'Елена Соколова', rating: 5, text: 'Делали ванную комнату под ключ. Мастера профессиональные, привезли всё необходимое сами. Результат превзошёл ожидания. Теперь только к ним!', date: 'Февраль 2024' },
  { name: 'Игорь Власов', rating: 5, text: 'Заменили всю разводку в квартире — 3 комнаты. Работали 2 дня, чисто, без пыли и мусора. Гарантия дана, цена честная. Профессионалы!', date: 'Январь 2024' },
  { name: 'Наталья Ким', rating: 5, text: 'Установили котёл и батареи в доме. Консультировали по выбору оборудования, помогли сэкономить. Система работает отлично уже полгода.', date: 'Ноябрь 2023' },
];

const FAQ_ITEMS = [
  { q: 'Как быстро приедет мастер?', a: 'Стандартное время выезда — до 2 часов. При аварийных ситуациях (прорыв трубы, потоп) — в течение 30 минут по городу.' },
  { q: 'Есть ли гарантия на работы?', a: 'Да! На все виды сантехнических работ мы предоставляем гарантию от 1 года. На монтаж ванных комнат под ключ — 2 года.' },
  { q: 'Нужно ли готовить что-то к приезду мастера?', a: 'Обеспечьте доступ к счётчикам воды и основному вентилю. Остальное мастер сделает сам и привезёт необходимые материалы.' },
  { q: 'Работаете в выходные и праздники?', a: 'Да, мы работаем 7 дней в неделю, включая праздничные дни. Аварийная служба доступна круглосуточно 24/7.' },
  { q: 'Как рассчитывается стоимость?', a: 'Мастер делает бесплатную оценку работ на месте. Для крупных проектов возможен бесплатный выезд на замер и составление сметы.' },
];

const ZONES = [
  { id: 1, x: 50, y: 45, name: 'Центральный', time: '20 мин', color: '#1e88e5' },
  { id: 2, x: 28, y: 35, name: 'Советский', time: '35 мин', color: '#1565c0' },
  { id: 3, x: 70, y: 30, name: 'Кировский', time: '40 мин', color: '#0a4a8a' },
  { id: 4, x: 35, y: 65, name: 'Ленинский', time: '30 мин', color: '#1e88e5' },
  { id: 5, x: 72, y: 65, name: 'Октябрьский', time: '45 мин', color: '#1565c0' },
  { id: 6, x: 50, y: 78, name: 'Загородная зона', time: '60 мин', color: '#0a4a8a' },
];

function useScrollReveal() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.revealId;
            if (id) setVisible((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      el.dataset.revealId = id;
      refs.current.set(id, el);
    }
  };

  return { visible, ref };
}

export default function Index() {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { visible, ref } = useScrollReveal();

  const navLinks = [
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-white font-golos overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-800 flex items-center justify-center shadow-md">
              <Icon name="Droplets" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-bold text-lg text-slate-900 leading-none">АкваМастер</div>
              <div className="text-[10px] text-orange-500 font-semibold tracking-wide leading-none">САНТЕХНИКА</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79001234567" className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">
              <Icon name="Phone" size={15} className="text-orange-500" />
              +7 (900) 123-45-67
            </a>
            <a href="#contacts" className="btn-orange px-4 py-2 rounded-xl text-sm font-bold text-white">
              Вызвать мастера
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-slate-900">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700 py-1">
                {l.label}
              </a>
            ))}
            <a href="tel:+79001234567" className="flex items-center gap-2 font-bold text-slate-900 py-1">
              <Icon name="Phone" size={16} className="text-orange-500" />
              +7 (900) 123-45-67
            </a>
            <a href="#contacts" className="btn-orange px-4 py-3 rounded-xl text-center font-bold text-white">
              Вызвать мастера
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700" />
        <div className="absolute inset-0 bg-mesh opacity-60" />

        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img src={HERO_IMAGE} alt="Мастер сантехник" className="w-full h-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900/60 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">Доступны прямо сейчас</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-6xl xl:text-7xl font-bold leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              Сантехника
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">
                без проблем
              </span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Профессиональный монтаж, ремонт и замена сантехники. Выезд мастера за 30 минут.
              Работаем 24/7, даём гарантию на все виды работ.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <a href="#contacts" className="btn-orange px-7 py-4 rounded-2xl text-base font-bold text-white text-center">
                Вызвать мастера
              </a>
              <a href="tel:+79001234567" className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all text-base">
                <Icon name="Phone" size={18} />
                +7 (900) 123-45-67
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              {[
                { num: '1 200+', label: 'Выполненных заказов' },
                { num: '8 лет', label: 'На рынке' },
                { num: '30 мин', label: 'Выезд мастера' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-orange-300">{s.num}</div>
                  <div className="text-blue-200 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: 'Clock', text: 'Выезд 24/7', sub: 'Без выходных' },
              { icon: 'ShieldCheck', text: 'Гарантия 2 года', sub: 'На все работы' },
              { icon: 'Award', text: 'Лицензия', sub: 'Официально' },
              { icon: 'Star', text: '4.97 / 5', sub: '320+ отзывов' },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-2 hover:bg-white/15 transition-all animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Icon name={b.icon} size={20} className="text-orange-300" fallback="Star" />
                </div>
                <div className="text-white font-bold">{b.text}</div>
                <div className="text-blue-200 text-sm">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-white/50" />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={ref('services-head')}
            className={`text-center mb-16 transition-all duration-700 ${visible.has('services-head') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="section-label mb-3">Что мы делаем</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-slate-900">Наши услуги</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Полный спектр сантехнических работ от аварийного ремонта до монтажа с нуля
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                ref={ref(`service-${i}`)}
                className={`card-hover bg-white border border-blue-100 rounded-3xl p-7 flex flex-col gap-4 shadow-sm group transition-all duration-700 ${visible.has(`service-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                  <Icon name={s.icon} size={26} className="text-blue-700" fallback="Wrench" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-orange-500 font-bold text-lg">{s.price}</span>
                  <a href="#contacts" className="text-blue-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Заказать <Icon name="ArrowRight" size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP / ZONES ── */}
      <section id="map" className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div
            ref={ref('map-head')}
            className={`text-center mb-16 transition-all duration-700 ${visible.has('map-head') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="section-label text-orange-400 mb-3">Зона охвата</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              Карта зон
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">обслуживания</span>
            </h2>
            <p className="mt-4 text-blue-300 max-w-xl mx-auto">
              Нажмите на район — узнайте время выезда мастера
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="relative bg-blue-900/40 border border-blue-500/20 rounded-3xl overflow-hidden aspect-[4/3]">
                <svg viewBox="0 0 100 85" className="w-full h-full p-4">
                  <defs>
                    <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e88e5" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0a4a8a" stopOpacity="0.05" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="50" cy="48" rx="42" ry="35" fill="url(#cityGlow)" stroke="#1e88e5" strokeWidth="0.3" strokeDasharray="2,1.5" />
                  <line x1="50" y1="13" x2="50" y2="80" stroke="#1e88e5" strokeWidth="0.4" strokeOpacity="0.3" />
                  <line x1="8" y1="48" x2="92" y2="48" stroke="#1e88e5" strokeWidth="0.4" strokeOpacity="0.3" />
                  <line x1="15" y1="20" x2="85" y2="76" stroke="#1e88e5" strokeWidth="0.2" strokeOpacity="0.15" />
                  <line x1="85" y1="20" x2="15" y2="76" stroke="#1e88e5" strokeWidth="0.2" strokeOpacity="0.15" />

                  {ZONES.map((zone) => (
                    <g key={zone.id} style={{ cursor: 'pointer' }} onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}>
                      {activeZone === zone.id && (
                        <circle cx={zone.x} cy={zone.y} r="7" fill={zone.color} fillOpacity="0.2" />
                      )}
                      <circle
                        cx={zone.x}
                        cy={zone.y}
                        r={activeZone === zone.id ? '4.5' : '3.5'}
                        fill={activeZone === zone.id ? zone.color : '#1e88e5'}
                        stroke="white"
                        strokeWidth="1"
                        style={{ filter: activeZone === zone.id ? `drop-shadow(0 0 4px ${zone.color})` : 'none', transition: 'all 0.3s ease' }}
                      />
                      <text
                        x={zone.x}
                        y={zone.y + 8}
                        textAnchor="middle"
                        fontSize="3.2"
                        fill={activeZone === zone.id ? 'white' : '#93c5fd'}
                        fontFamily="'Golos Text', sans-serif"
                        fontWeight="600"
                        style={{ pointerEvents: 'none' }}
                      >
                        {zone.name}
                      </text>
                    </g>
                  ))}

                  <circle cx="50" cy="45" r="2" fill="#f57c00" stroke="white" strokeWidth="0.8" />
                  <text x="50" y="42" textAnchor="middle" fontSize="2.8" fill="#ff9800" fontFamily="'Golos Text', sans-serif" fontWeight="700">
                    База
                  </text>
                </svg>

                {activeZone && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                    <div className="font-bold text-base">{ZONES.find(z => z.id === activeZone)?.name} район</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon name="Clock" size={14} className="text-orange-300" />
                      <span className="text-orange-200 text-sm font-medium">
                        Время выезда: {ZONES.find(z => z.id === activeZone)?.time}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="text-white font-bold text-lg mb-2">Районы обслуживания</div>
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                    activeZone === zone.id
                      ? 'bg-blue-700 border-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                    <span className="text-white font-medium">{zone.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={13} className="text-orange-300" />
                    <span className="text-orange-300 text-sm font-bold">{zone.time}</span>
                  </div>
                </button>
              ))}
              <a href="#contacts" className="btn-orange mt-2 px-5 py-3.5 rounded-2xl text-center font-bold text-white text-sm">
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={ref('portfolio-head')}
            className={`text-center mb-16 transition-all duration-700 ${visible.has('portfolio-head') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="section-label mb-3">Наши работы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-slate-900">Портфолио</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Реальные объекты — от однокомнатных квартир до коммерческих помещений
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden aspect-video group">
              <img src={PORTFOLIO_IMAGE} alt="Портфолио" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-semibold text-orange-300 mb-1">Последний проект</div>
                <div className="font-oswald text-2xl font-bold">Ванная под ключ • ЖК "Рассвет"</div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-rows-2 gap-6">
              {PORTFOLIO.slice(0, 2).map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-blue-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="text-xs text-orange-500 font-bold tracking-wide uppercase mb-2">{p.type}</div>
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <div className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Icon name="MapPin" size={12} className="text-blue-600" />
                      {p.area}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mt-3">{p.year} год</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.slice(2).map((p, i) => (
              <div
                key={i}
                ref={ref(`port-${i}`)}
                className={`bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ${visible.has(`port-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-xs text-orange-500 font-bold tracking-wide uppercase mb-2">{p.type}</div>
                <div className="font-bold text-slate-900 text-sm">{p.title}</div>
                <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                  <Icon name="MapPin" size={11} className="text-blue-600" />
                  {p.area}
                </div>
                <div className="text-xs text-gray-400 mt-3">{p.year} год</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={ref('reviews-head')}
            className={`text-center mb-16 transition-all duration-700 ${visible.has('reviews-head') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="section-label mb-3">Клиенты о нас</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-slate-900">Отзывы</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-semibold">4.97 из 5</span>
              <span className="text-gray-400 text-sm">• 320+ отзывов</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                ref={ref(`review-${i}`)}
                className={`bg-gray-50 border border-blue-100 rounded-3xl p-7 transition-all duration-700 ${visible.has(`review-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <Icon key={j} name="Star" size={15} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                      <div className="text-gray-400 text-xs">{r.date}</div>
                    </div>
                  </div>
                  <div className="text-blue-300">
                    <Icon name="Quote" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4">
          <div
            ref={ref('faq-head')}
            className={`text-center mb-16 transition-all duration-700 ${visible.has('faq-head') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="section-label mb-3">Вопросы и ответы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-slate-900">FAQ</h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                ref={ref(`faq-${i}`)}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ${
                  openFaq === i ? 'border-blue-500 shadow-blue-100' : 'border-blue-100 hover:border-blue-300'
                } ${visible.has(`faq-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-blue-700 rotate-45' : 'bg-blue-100'}`}>
                    <Icon name="Plus" size={14} className={openFaq === i ? 'text-white' : 'text-blue-700'} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-blue-50 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="text-white">
              <div className="section-label text-orange-400 mb-3">Связаться с нами</div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-6">Оставьте заявку</h2>
              <p className="text-blue-200 mb-10 leading-relaxed">
                Перезвоним в течение 5 минут, уточним детали и назначим удобное время выезда мастера.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: 'Phone', label: 'Телефон', value: '+7 (900) 123-45-67', href: 'tel:+79001234567' },
                  { icon: 'Clock', label: 'Часы работы', value: 'Ежедневно 8:00 – 22:00, аварийная служба 24/7', href: null },
                  { icon: 'MapPin', label: 'Адрес офиса', value: 'г. Москва, ул. Водопроводная, 12', href: null },
                  { icon: 'Mail', label: 'Email', value: 'info@akvamasters.ru', href: 'mailto:info@akvamasters.ru' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={c.icon} size={18} className="text-orange-300" fallback="Phone" />
                    </div>
                    <div>
                      <div className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-white font-semibold hover:text-orange-300 transition-colors">{c.value}</a>
                      ) : (
                        <div className="text-white font-semibold">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="font-oswald text-2xl font-bold text-slate-900 mb-6">Форма заявки</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Тип услуги</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-700 bg-white">
                    <option value="">Выберите услугу...</option>
                    {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Комментарий</label>
                  <textarea
                    rows={3}
                    placeholder="Опишите задачу..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400 resize-none"
                  />
                </div>
                <button className="btn-orange w-full py-4 rounded-xl font-bold text-white text-base mt-1">
                  Отправить заявку
                </button>
                <p className="text-center text-gray-400 text-xs">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-800 flex items-center justify-center">
              <Icon name="Droplets" size={15} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-bold leading-none">АкваМастер</div>
              <div className="text-[10px] text-orange-400 font-semibold tracking-wide leading-none">САНТЕХНИКА</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm text-center">
            © 2024 АкваМастер. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── FLOATING CALL BTN ── */}
      <a
        href="tel:+79001234567"
        className="fixed bottom-6 right-6 z-50 btn-orange w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        aria-label="Позвонить"
      >
        <Icon name="Phone" size={22} className="text-white" />
      </a>
    </div>
  );
}
