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
    <div className="w-4/5 md:w-2/5 mx-auto mb-6 border-l-4 border-primary-800 bg-red-50 rounded-r-md overflow-hidden">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left px-4 py-4 font-semibold text-gray-800 flex justify-between items-center cursor-pointer transition-colors"
      >
        <div className="flex flex-col gap-0.5">
          <span>📱 Guarda tu tarjeta en tu teléfono</span>
          {!isExpanded && (
            <span className="text-xs font-normal text-gray-500">
              Toca aquí para ver las instrucciones
            </span>
          )}
        </div>
        <span
          className={`text-xl flex-shrink-0 ml-2 ${!isExpanded ? "animate-bounce" : ""}`}
        >
          {isExpanded ? "▲" : "▼"}
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 text-gray-700 text-sm flex flex-col gap-4">
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
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
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
