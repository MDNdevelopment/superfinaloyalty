import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await fetch(
      process.env.URL_ADD ?? process.env.NEXT_PUBLIC_URL_ADD,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return NextResponse.json({ ok: data.ok ?? response.ok });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
