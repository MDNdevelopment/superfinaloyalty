"use client";

import { useRegisteredStore } from "../stores/registeredStore";
import { redirect } from "next/navigation";

export default function page() {
  const { isRegistered, userEmail } = useRegisteredStore.getState();

  console.log(isRegistered);
  if (!isRegistered) {
    // redirect("/");
  }
  return (
    <div className="d-flex justify-center items-center pt-10 w-5/6 lg:w-4/6 mx-auto">
      <h1 className="font-bold text-3xl lg:text-5xl text-center">
        Revisa tu correo
      </h1>
      <p className="text-gray-950 mt-10 text-center">
        Tu registro se ha completado con éxito. Para finalizar el proceso, por
        favor revisa tu correo electrónico{" "}
        <span className="text-primary-600">({userEmail})</span> donde
        encontrarás un enlace para acceder a tu tarjeta. En ese enlace, también
        podrás guardar tu tarjeta en tu app de billetera.{" "}
      </p>
      <p className="text-primary-600 text-xl text-center mt-5 font-bold d-block">
        ¡Gracias por unirte a nosotros!
      </p>
    </div>
  );
}
