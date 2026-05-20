import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/ceb269fb-4e0d-409f-b49f-f63c48a5dc68.jpg';
const PORTFOLIO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/6d5352a8-8f9e-4293-a899-478dbceeae6f.jpg';

export const SERVICES = [
  { icon: 'Wrench', title: 'Монтаж сантехники', desc: 'Установка унитазов, раковин, ванн, душевых кабин. Работаем с любыми брендами.', price: 'от 1 500 ₽' },
  { icon: 'Pipette', title: 'Замена труб', desc: 'Замена стальных и чугунных труб на пластиковые. Скрытая и открытая прокладка.', price: 'от 800 ₽/м' },
  { icon: 'Droplets', title: 'Устранение течи', desc: 'Быстрый выезд при аварийных ситуациях. Работаем 24/7 без выходных.', price: 'от 500 ₽' },
  { icon: 'Flame', title: 'Котлы и отопление', desc: 'Установка и обслуживание газовых и электрических котлов. Проектирование систем.', price: 'от 3 000 ₽' },
  { icon: 'Filter', title: 'Фильтры воды', desc: 'Подбор, установка и обслуживание систем очистки воды под ваши задачи.', price: 'от 2 000 ₽' },
  { icon: 'ShowerHead', title: 'Ванная под ключ', desc: 'Полный монтаж сантехники в новой ванной комнате с гарантией 2 года.', price: 'от 15 000 ₽' },
];

const ZONES = [
  { id: 1, x: 50, y: 45, name: 'Центральный', time: '20 мин', color: '#1e88e5' },
  { id: 2, x: 28, y: 35, name: 'Советский', time: '35 мин', color: '#1565c0' },
  { id: 3, x: 70, y: 30, name: 'Кировский', time: '40 мин', color: '#0a4a8a' },
  { id: 4, x: 35, y: 65, name: 'Ленинский', time: '30 мин', color: '#1e88e5' },
  { id: 5, x: 72, y: 65, name: 'Октябрьский', time: '45 мин', color: '#1565c0' },
  { id: 6, x: 50, y: 78, name: 'Загородная зона', time: '60 мин', color: '#0a4a8a' },
];

interface HeroSectionProps {
  visible: Set<string>;
  revealRef: (id: string) => (el: HTMLElement | null) => void;
}

export default function HeroSection({ visible, revealRef: ref }: HeroSectionProps) {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <>
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
    </>
  );
}