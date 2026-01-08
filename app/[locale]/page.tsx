import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

import { getShowcaseEventos } from "@/sanity/lib/eventos";

export default async function Home() {
  const eventos = await getShowcaseEventos(3);

  return (
    <main className="min-h-screen flex flex-col w-full">
      <Hero />
      <MainContent eventos={eventos} />
    </main>
  );
}