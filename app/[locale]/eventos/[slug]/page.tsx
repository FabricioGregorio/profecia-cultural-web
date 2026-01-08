import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Image from "next/image";

import { getEventoPorSlug } from "@/sanity/lib/eventos";
import type { EventoDetalhado } from "@/sanity/lib/eventos";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function EventoPage({ params }: Props) {
  const { locale, slug } = await params;

  const evento = (await getEventoPorSlug(slug)) as EventoDetalhado | null;

  if (!evento) return notFound();

  const dataInicio = evento.periodoRealizacao?.inicio || evento.dataRealizacao;
  const dataFim = evento.periodoRealizacao?.fim;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen flex flex-col w-full">
      {/* Hero com imagem */}
      <div className="w-full h-96 relative bg-foreground/5">
        {evento.capa && (
          <Image
            src={urlFor(evento.capa).url()}
            alt={evento.titulo}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{evento.titulo}</h1>
          
          {/* Data e Local */}
          <div className="flex flex-col sm:flex-row gap-4 text-foreground/70 mb-6">
            {dataInicio && (
              <div>
                <p className="font-semibold text-sm uppercase tracking-wide mb-1">Data</p>
                <p>
                  {formatDate(dataInicio)}
                  {dataFim && dataFim !== dataInicio && ` — ${formatDate(dataFim)}`}
                </p>
              </div>
            )}
            
            {evento.local && (
              <div>
                <p className="font-semibold text-sm uppercase tracking-wide mb-1">Local</p>
                <p>
                  {Array.isArray(evento.local)
                    ? evento.local.join(", ")
                    : evento.local}
                </p>
              </div>
            )}
          </div>

          {/* Categorias */}
          {evento.categorias && evento.categorias.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {evento.categorias.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Descrição curta */}
        {evento.descricaoCurta && (
          <p className="text-lg text-foreground/80 mb-8 pb-8 border-b border-foreground/10">
            {evento.descricaoCurta}
          </p>
        )}

        {/* Conceito */}
        {evento.conceito && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">O Conceito</h2>
            <div className="prose prose-invert max-w-none">
              <PortableText value={evento.conceito} />
            </div>
          </div>
        )}

        {/* Galeria */}
        {evento.galeria && evento.galeria.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Galeria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {evento.galeria.map((imagem, index) => (
                <div
                  key={imagem._key || index}
                  className="relative h-64 bg-foreground/5 rounded-lg overflow-hidden"
                >
                  <>
                    <Image
                      src={urlFor(imagem).url()}
                      alt={imagem.legenda || `Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {imagem.legenda && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <p className="text-white text-sm">{imagem.legenda}</p>
                      </div>
                    )}
                  </>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vídeos */}
        {evento.videos && evento.videos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Vídeos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {evento.videos.map((video, index) => {
                // Extrair video ID do YouTube ou Vimeo
                let embedUrl = "";
                if (video.url?.includes("youtube.com") || video.url?.includes("youtu.be")) {
                  const videoId =
                    video.url?.split("v=")[1] || video.url?.split("/").pop();
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                } else if (video.url?.includes("vimeo.com")) {
                  const videoId = video.url?.split("/").pop();
                  embedUrl = `https://player.vimeo.com/video/${videoId}`;
                }

                return embedUrl ? (
                  <div key={index} className="relative w-full h-64">
                    <iframe
                      src={embedUrl}
                      title={video.titulo || `Vídeo ${index + 1}`}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Frase de Impacto */}
        {evento.impacto && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-lg italic text-foreground">&ldquo;{evento.impacto}&rdquo;</p>
          </div>
        )}
      </div>
    </main>
  );
}
