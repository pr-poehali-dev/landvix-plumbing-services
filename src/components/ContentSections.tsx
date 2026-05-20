import { useState } from 'react';
import Icon from '@/components/ui/icon';

const PORTFOLIO_IMAGE = 'https://cdn.poehali.dev/projects/cb066a4a-b259-46cf-8abe-34a46dc855cf/files/6d5352a8-8f9e-4293-a899-478dbceeae6f.jpg';

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

interface ContentSectionsProps {
  visible: Set<string>;
  ref: (id: string) => (el: HTMLElement | null) => void;
}

export default function ContentSections({ visible, ref }: ContentSectionsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
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
    </>
  );
}
