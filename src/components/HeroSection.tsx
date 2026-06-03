
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/ceb269fb-4e0d-409f-b49f-f63c48a5dc68.jpg';
const MASTER_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/e7d2c5a5-2fd3-4904-a12b-5a9f5da9c9ea.jpg';
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
  {
    id: 1,
    name: 'Центральный',
    sub: 'Ядро города',
    time: '20 мин',
    address: 'ул. Ленина, 45',
    points: '200,60 270,100 270,180 200,220 130,180 130,100',
  },
  {
    id: 2,
    name: 'Советский',
    sub: 'Северо-запад',
    time: '35 мин',
    address: 'пр. Победы, 12',
    points: '90,40 160,80 160,160 90,200 20,160 20,80',
  },
  {
    id: 3,
    name: 'Кировский',
    sub: 'Северо-восток',
    time: '40 мин',
    address: 'ул. Южная, 88',
    points: '310,40 380,80 380,160 310,200 240,160 240,80',
  },
  {
    id: 4,
    name: 'Ленинский',
    sub: 'Запад',
    time: '30 мин',
    address: 'ул. Западная, 3',
    points: '90,200 160,240 160,320 90,360 20,320 20,240',
  },
  {
    id: 5,
    name: 'Октябрьский',
    sub: 'Восток',
    time: '45 мин',
    address: 'ул. Восточная, 17',
    points: '310,200 380,240 380,320 310,360 240,320 240,240',
  },
  {
    id: 6,
    name: 'Загородная',
    sub: 'Пригород',
    time: '60 мин',
    address: 'ул. Парковая, 2',
    points: '200,300 270,340 270,420 200,460 130,420 130,340',
  },
];

interface HeroSectionProps {
  visible: Set<string>;
  revealRef: (id: string) => (el: HTMLElement | null) => void;
}

export default function HeroSection({ visible, revealRef: ref }: HeroSectionProps) {
  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700" />
        <div className="absolute inset-0 bg-mesh opacity-60" />



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

          <div className="hidden lg:flex items-end justify-center relative">
            {/* Декоративное кольцо */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] rounded-full border border-white/10" />
              <div className="absolute w-[340px] h-[340px] rounded-full border border-white/10" />
            </div>

            {/* Фото мастера */}
            <div className="relative z-10 w-80 xl:w-96">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                <img
                  src={MASTER_IMAGE}
                  alt="Мастер АкваМастер"
                  className="w-full h-[480px] xl:h-[540px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>

              {/* Бейдж рейтинга */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm leading-none">4.97</div>
                  <div className="text-gray-400 text-[10px]">320+ отзывов</div>
                </div>
              </div>

              {/* Бейдж опыта */}
              <div className="absolute -bottom-4 -left-4 bg-orange-500 rounded-2xl px-4 py-3 shadow-xl text-white">
                <div className="font-oswald text-2xl font-bold leading-none">8 лет</div>
                <div className="text-orange-100 text-xs">опыта работы</div>
              </div>
            </div>
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

    </>
  );
}