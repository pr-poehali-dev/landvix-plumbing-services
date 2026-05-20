import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentSections from '@/components/ContentSections';
import ContactsSection from '@/components/ContactsSection';

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
  const { visible, ref } = useScrollReveal();

  return (
    <div className="min-h-screen bg-white font-golos overflow-x-hidden">
      <Header />
      <HeroSection visible={visible} ref={ref} />
      <ContentSections visible={visible} ref={ref} />
      <ContactsSection />
    </div>
  );
}
