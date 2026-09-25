import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { customerData } = await request.json();

    const response = await fetch(
      process.env.URL_CHECK ?? process.env.NEXT_PUBLIC_URL_CHECK,
      {
        method: "POST",
        body: JSON.stringify({ customerData }),
      }
    );
    const data = await response.json();
    return NextResponse.json({ isRegistered: data.isRegistered });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    );
  }
}
