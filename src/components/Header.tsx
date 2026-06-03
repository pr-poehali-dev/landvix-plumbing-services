import { useState } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
  { href: '#faq', label: 'FAQ' },
];

const PERKS = [
  { icon: 'Clock', text: 'Работаем 24/7' },
  { icon: 'ShieldCheck', text: 'Гарантия 2 года' },
  { icon: 'Zap', text: 'Выезд за 30 мин' },
  { icon: 'BadgeCheck', text: 'Лицензия СРО' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">

      {/* ── Верхняя полоска ── */}
      <div className="bg-blue-900 text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 overflow-x-auto scrollbar-none">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
                <Icon name={p.icon} size={12} className="text-orange-400" fallback="Check" />
                <span className="text-blue-100 font-medium">{p.text}</span>
              </div>
            ))}
          </div>
          <a
            href="tel:+79001234567"
            className="hidden sm:flex items-center gap-1.5 font-bold text-white hover:text-orange-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Icon name="Phone" size={12} className="text-orange-400" />
            +7 (900) 123-45-67
          </a>
        </div>
      </div>

      {/* ── Основная шапка ── */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center shadow-md">
              <Icon name="Droplets" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-bold text-xl text-slate-900 leading-none tracking-wide">АкваМастер</div>
              <div className="text-[10px] text-orange-500 font-bold tracking-widest leading-none mt-0.5">САНТЕХНИКА</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
            >
              <Icon name="Phone" size={15} className="text-orange-500" />
              <span className="text-sm font-bold text-slate-900">+7 (900) 123-45-67</span>
            </a>
            <a
              href="#contacts"
              className="btn-orange px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2"
            >
              <Icon name="Wrench" size={14} className="text-white" />
              Вызвать мастера
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-blue-50 transition-all">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* ── Мобильное меню ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-4 py-5 flex flex-col gap-2 shadow-xl">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-gray-700 px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="border-t border-blue-100 mt-2 pt-3 flex flex-col gap-2">
            <a href="tel:+79001234567" className="flex items-center gap-2 px-3 py-2.5 font-bold text-slate-900">
              <Icon name="Phone" size={16} className="text-orange-500" />
              +7 (900) 123-45-67
            </a>
            <a
              href="#contacts"
              onClick={() => setMenuOpen(false)}
              className="btn-orange px-4 py-3.5 rounded-xl text-center font-bold text-white flex items-center justify-center gap-2"
            >
              <Icon name="Wrench" size={16} className="text-white" />
              Вызвать мастера
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                <Icon name={p.icon} size={13} className="text-blue-700" fallback="Check" />
                <span className="text-xs font-semibold text-blue-800">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
