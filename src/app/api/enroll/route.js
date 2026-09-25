import { NextResponse } from "next/server";
import generateJWT from "@/utils/generateJWT";

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await fetch(
      `${process.env.URL_ENROLL ?? process.env.NEXT_PUBLIC_URL_ENROLL}${
        process.env.URL_PROGRAM ?? process.env.NEXT_PUBLIC_URL_PROGRAM
      }`,
      {
        method: "POST",
        headers: {
          Authorization: generateJWT(
            process.env.LL_API_KEY ?? process.env.NEXT_PUBLIC_LL_API_KEY,
            process.env.LL_API_SECRET ?? process.env.NEXT_PUBLIC_LL_API_SECRET,
            process.env.LL_USERNAME ?? process.env.NEXT_PUBLIC_LL_USERNAME
          ),
        },
        body: JSON.stringify(payload),
      }
    );
    const parsedResponse = await response.json();

    if (parsedResponse.error) {
      let error;
      if (parsedResponse.error.includes("is not valid")) {
        error = "El correo electrónico ingresado no es válido.";
      } else {
        error = "Error al registrar usuario, por favor inténtalo de nuevo.";
      }
      return NextResponse.json({ ok: false, errors: error });
    }

    return NextResponse.json({
      pid: parsedResponse.pid,
      url: parsedResponse.url,
      ok: true,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        ok: false,
        errors: "Error al registrar usuario, por favor inténtalo de nuevo.",
      },
      { status: 500 }
    );
  }
}
