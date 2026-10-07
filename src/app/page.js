"use client";
import CustomForm from "@/components/CustomForm";
import CustomSpinner from "@/components/CustomSpinner";
import WalletGuide from "@/components/WalletGuide";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import { useGetCardData } from "@/hooks/useGetCardData";

export default function Home() {
  const { cardData, isLoading, error, retry } = useGetCardData();
  if (isLoading) {
    return (
      <main className="flex justify-center items-center mt-20 text-gray-700">
        <CustomSpinner />
        Cargando...
      </main>
    );
  }

  if (error || !cardData) {
    return (
      <main className="text-center px-6 mt-10">
        <h1 className="text-[1.5em] font-bold text-secondary mb-4">
          No pudimos cargar la información
        </h1>
        <p className="text-gray-800 mb-6">
          Ocurrió un problema al conectar con el servidor. Por favor revisa tu
          conexión e intenta nuevamente.
        </p>
        <button
          onClick={retry}
          className="bg-secondary text-white px-6 py-3 rounded-full font-bold"
        >
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main>
      <Hero description={cardData?.description} />
      <div className="px-4 -mt-12 relative z-10 max-w-xl mx-auto space-y-6 pb-12">
        <Benefits />
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
          <WalletGuide />
          <CustomForm />
        </div>
        <section id="terminos" className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 text-left">
            Términos y condiciones
          </h2>
          <ul className="text-left text-gray-700 text-sm mt-3">
            {(cardData?.terms ?? "").split("\n").map((term, index) => (
              <li className="my-2" key={`term-${index}`}>
                {term}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
