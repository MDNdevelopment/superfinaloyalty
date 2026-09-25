"use client";

import { useRegisteredStore } from "../stores/registeredStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import detectPlatform from "@/utils/detectPlatform";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=io.walletpasses.android&hl=en";

export default function page() {
  const isRegistered = useRegisteredStore((state) => state.isRegistered);
  const userEmail = useRegisteredStore((state) => state.userEmail);
  const [platform, setPlatform] = useState("unknown");
  const router = useRouter();

  useEffect(() => {
    if (!isRegistered) {
      router.push("/");
    }
    setPlatform(detectPlatform());
  }, [isRegistered, router]);

  if (!isRegistered) return null;

  return (
    <div className="d-flex justify-center items-center pt-10 w-5/6 lg:w-4/6 mx-auto">
      <h1 className="font-bold text-3xl lg:text-5xl text-center">
        Revisa tu correo
      </h1>
      <p className="text-gray-950 mt-10 text-center">
        Tu registro se ha completado con éxito. Para finalizar el proceso, por
        favor revisa tu correo electrónico{" "}
        <span className="text-primary-600">({userEmail})</span> donde
        encontrarás un enlace para acceder a tu tarjeta (Si no ves el correo en
        tu bandeja, revisa la carpeta de SPAM). En ese enlace, también podrás
        guardar tu tarjeta en tu app de billetera.{" "}
      </p>
      {platform === "android" && (
        <p className="text-center mt-4 text-sm text-gray-700 bg-red-50 border-l-4 border-primary-800 px-4 py-3 rounded-r-md w-full lg:w-2/3 mx-auto">
          Si usas Android, asegurate de tener la app{" "}
          <strong>WalletPasses</strong> instalada antes de abrir el enlace de
          tu tarjeta.{" "}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline font-semibold"
          >
            Descargar en Play Store
          </a>
        </p>
      )}
      {platform === "ios" && (
        <p className="text-center mt-4 text-sm text-gray-700 bg-red-50 border-l-4 border-primary-800 px-4 py-3 rounded-r-md w-full lg:w-2/3 mx-auto">
          Si usas iPhone o iPad, abrí el correo <strong>desde Safari</strong>{" "}
          para que puedas guardar la tarjeta en Wallet sin problemas.
        </p>
      )}
      <p className="text-primary-600 text-xl text-center mt-5 font-bold d-block">
        ¡Gracias por unirte a nosotros!
      </p>
    </div>
  );
}
