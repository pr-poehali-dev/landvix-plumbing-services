import { useState } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
  { href: '#faq', label: 'FAQ' },
];

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <button onClick={onOpenModal} className="btn-orange px-4 py-2 rounded-xl text-sm font-bold text-white">
            Вызвать мастера
          </button>
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
          <button onClick={() => { onOpenModal(); setMenuOpen(false); }} className="btn-orange px-4 py-3 rounded-xl text-center font-bold text-white">
            Вызвать мастера
          </button>
        </div>
      )}
    </header>
  );
}
