export default function Hero({
  description = "Únete a nuestro programa de fidelización y disfruta de beneficios exclusivos.",
}) {
  return (
    <header className="relative bg-[#EA671F]">
      <picture>
        <source media="(min-width: 768px)" srcSet="/hero-patron.webp" />
        <img
          src="/hero-patron-movil.webp"
          alt="Superfina"
          className="block w-full h-auto"
        />
      </picture>
      <div className="px-6 pt-6 pb-16 text-center md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:pt-0 md:pb-12">
        <div className="max-w-xl mx-auto">
          <p className="inline-block bg-white text-secondary text-xs font-extrabold uppercase tracking-[0.2em] rounded-full px-3 py-1.5">
            Club Superfina
          </p>
          <h1 className="mt-3 text-white font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-tight text-balance">
            {description}
          </h1>
        </div>
      </div>
    </header>
  );
}
