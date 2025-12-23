import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      
      <Hero />
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-serif text-primary mb-4">Próximos Eventos</h2>
        <p className="text-muted-foreground">O conteúdo virá do Sanity CMS em breve...</p>
      </section>
      
    </main>
  );
}