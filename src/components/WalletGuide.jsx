"use client";
import { useEffect, useState } from "react";
import detectPlatform from "@/utils/detectPlatform";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=io.walletpasses.android&hl=en";

export default function WalletGuide() {
  const [platform, setPlatform] = useState("unknown");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);
    if (detected === "android" || detected === "ios") {
      setIsExpanded(true);
    }
  }, []);

  const showAndroid = platform === "android" || platform === "unknown";
  const showIOS = platform === "ios" || platform === "unknown";

  return (
    <div className="bg-peach rounded-2xl p-5 text-left">
      <div className="flex gap-4 items-center">
        <svg className="w-16 h-16 flex-shrink-0 text-gray-900" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="3" width="24" height="42" rx="5" />
          <path d="M20 7h8" />
          <rect x="16" y="18" width="16" height="11" rx="2" className="text-secondary" stroke="#FF6503" />
          <circle cx="34" cy="36" r="7" fill="#FF6503" stroke="none" />
          <path d="M34 32.5v7M30.5 36h7" stroke="#fff" />
        </svg>
        <div>
          <p className="font-bold text-secondary text-lg">Guía de registro</p>
          <p className="text-gray-800 text-sm">
            Lee estos pasos antes de registrarte: recibirás tu tarjeta por
            correo y así podrás guardarla en tu celular.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-3 text-sm font-semibold text-gray-900 underline cursor-pointer"
      >
        {isExpanded ? "Ocultar los pasos ▲" : "Ver los pasos ▼"}
      </button>

      {isExpanded && (
        <div className="mt-3 text-gray-700 text-sm flex flex-col gap-4">
          {showAndroid && (
            <div>
              <p className="font-semibold text-gray-800 mb-2">Android</p>
              <ol className="list-decimal list-inside space-y-2 mb-3">
                <li>
                  Descarga <strong>WalletPasses</strong> desde el Play Store.
                </li>
                <li>Vuelve aquí y completa el registro.</li>
                <li>
                  Cuando recibas el correo, podrás guardar tu tarjeta
                  fácilmente.
                </li>
              </ol>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-white font-semibold px-4 py-2 rounded-full"
              >
                Descargar WalletPasses
              </a>
            </div>
          )}

          {showIOS && (
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                iPhone / iPad
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Completa el registro y espera el correo.</li>
                <li>
                  Abre el correo <strong>desde Safari</strong> (otros
                  navegadores pueden no abrir la tarjeta correctamente).
                </li>
                <li>
                  Toca el enlace de tu tarjeta y luego{" "}
                  <strong>&quot;Añadir a Wallet&quot;</strong>.
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
