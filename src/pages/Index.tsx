import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentSections from '@/components/ContentSections';
import ContactsSection from '@/components/ContactsSection';
import CallModal from '@/components/CallModal';

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

  const revealRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      el.dataset.revealId = id;
      refs.current.set(id, el);
    }
  };

  return { visible, revealRef };
}

export default function Index() {
  const { visible, revealRef } = useScrollReveal();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-golos overflow-x-hidden">
      <Header onOpenModal={() => setModalOpen(true)} />
      <HeroSection visible={visible} revealRef={revealRef} onOpenModal={() => setModalOpen(true)} />
      <ContentSections visible={visible} revealRef={revealRef} />
      <ContactsSection />
      <CallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
