import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

import { getImpactoEventos, getShowcaseEventos } from "@/sanity/lib/eventos";

export default async function Home() {
  const [eventos, impactos] = await Promise.all([
    getShowcaseEventos(3),
    getImpactoEventos(3),
  ]);

  return (
    <main className="min-h-screen flex flex-col w-full">
      <Hero />
      <MainContent eventos={eventos} impactos={impactos} />
    </main>
  );
}