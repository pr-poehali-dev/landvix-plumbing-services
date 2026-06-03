import { useState } from 'react';
import Icon from '@/components/ui/icon';

const SERVICES = [
  'Монтаж сантехники',
  'Замена труб',
  'Устранение течи',
  'Котлы и отопление',
  'Фильтры воды',
  'Ванная под ключ',
];

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
  { href: '#faq', label: 'FAQ' },
];

const API_URL = 'https://functions.poehali.dev/167c1196-df62-4218-ae29-be6b8ad22ab9';

export default function ContactsSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, comment }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Не удалось отправить заявку. Позвоните нам напрямую.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="CheckCircle" size={42} className="text-green-500" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-slate-900">Заявка отправлена!</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Мы получили вашу заявку и перезвоним в течение 5 минут.
                  </p>
                  <button
                    onClick={() => { setSent(false); setName(''); setPhone(''); setService(''); setComment(''); }}
                    className="text-blue-600 text-sm font-semibold hover:underline mt-2"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-oswald text-2xl font-bold text-slate-900 mb-6">Форма заявки</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ваше имя</label>
                      <input
                        type="text"
                        required
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон</label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Тип услуги</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-700 bg-white"
                      >
                        <option value="">Выберите услугу...</option>
                        {SERVICES.map((s) => <option key={s}>{s}</option>)}
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Комментарий</label>
                      <textarea
                        rows={3}
                        placeholder="Опишите задачу..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                        <Icon name="AlertCircle" size={15} />
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-orange w-full py-4 rounded-xl font-bold text-white text-base mt-1 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Отправляем...
                        </>
                      ) : 'Отправить заявку'}
                    </button>
                    <p className="text-center text-gray-400 text-xs">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              )}
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
    </>
  );
}
