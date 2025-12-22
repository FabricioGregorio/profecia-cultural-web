export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      
      {/* Adicionei 'font-serif' aqui para puxar a Cinzel */}
      <h1 className="text-4xl font-bold font-serif text-primary mb-4 text-center">
        Profecia Cultural
      </h1>
      
      {/* O parágrafo herdará a font-sans (Geist) do body automaticamente */}
      <p className="text-xl text-center text-muted-foreground">
        O sistema está online e pronto para receber os dados.
      </p>
      
    </main>
  );
}