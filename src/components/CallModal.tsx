import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const SERVICES = [
  'Монтаж сантехники',
  'Замена труб',
  'Устранение течи',
  'Котлы и отопление',
  'Фильтры воды',
  'Ванная под ключ',
];

interface CallModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CallModal({ open, onClose }: CallModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSent(false); setName(''); setPhone(''); setService(''); setComment(''); }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl animate-fade-up overflow-hidden">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 px-7 pt-7 pb-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <Icon name="X" size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Icon name="Wrench" size={20} className="text-orange-300" />
            </div>
            <div>
              <div className="font-oswald text-xl font-bold text-white leading-none">Вызвать мастера</div>
              <div className="text-blue-200 text-xs mt-0.5">Перезвоним за 5 минут</div>
            </div>
          </div>
        </div>

        <div className="px-7 py-6">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="CheckCircle" size={36} className="text-green-500" />
              </div>
              <div className="font-oswald text-2xl font-bold text-slate-900">Заявка принята!</div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Мы получили вашу заявку и перезвоним в течение 5 минут.
              </p>
              <button onClick={handleClose} className="btn-orange px-6 py-3 rounded-xl font-bold text-white mt-2">
                Закрыть
              </button>
            </div>
          ) : (
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
                  rows={2}
                  placeholder="Опишите задачу..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-golos text-gray-800 placeholder:text-gray-400 resize-none"
                />
              </div>
              <button type="submit" className="btn-orange w-full py-4 rounded-xl font-bold text-white text-base mt-1">
                Отправить заявку
              </button>
              <p className="text-center text-gray-400 text-xs">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
