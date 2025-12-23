import Hero from "../components/Hero";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen flex flex-col w-full">
      
      <Hero />
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-serif text-primary mb-4">{t('upcomingEvents')}</h2>
        <p className="text-muted-foreground">{t('contentComingSoon')}</p>
      </section>
      
    </main>
  );
}