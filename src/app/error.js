"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="text-center px-6 mt-10">
      <h1 className="text-[1.5em] font-bold text-secondary mb-4">
        Algo salió mal
      </h1>
      <p className="text-gray-800 mb-6">
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="bg-secondary text-white px-4 py-2 rounded-md"
      >
        Reintentar
      </button>
    </main>
  );
}
