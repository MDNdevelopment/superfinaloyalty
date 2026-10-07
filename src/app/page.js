"use client";
import { useState } from "react";
import CustomForm from "@/components/CustomForm";
import CustomSpinner from "@/components/CustomSpinner";
import WalletGuide from "@/components/WalletGuide";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import { useGetCardData } from "@/hooks/useGetCardData";

export default function Home() {
  const { cardData, isLoading, error, retry } = useGetCardData();
  const [termsOpen, setTermsOpen] = useState(false);
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
          <div className="flex items-center justify-between gap-3">
            <h2
              onClick={() => setTermsOpen((prev) => !prev)}
              className="text-2xl font-extrabold text-gray-900 text-left cursor-pointer"
            >
              Términos y condiciones
            </h2>
            <button
              type="button"
              onClick={() => setTermsOpen((prev) => !prev)}
              aria-expanded={termsOpen}
              aria-controls="terminos-lista"
              aria-label={termsOpen ? "Ocultar términos" : "Mostrar términos"}
              className="w-9 h-9 shrink-0 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
            >
              <svg
                className={`w-5 h-5 text-gray-900 transition-transform ${termsOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          {termsOpen && (
            <ul id="terminos-lista" className="text-left text-gray-700 text-sm mt-3">
              {(cardData?.terms ?? "").split("\n").map((term, index) => (
                <li className="my-2" key={`term-${index}`}>
                  {term}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
