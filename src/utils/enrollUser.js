export default async function enrollUser(payload) {
  try {
    const response = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const parsedResponse = await response.json();

    if (!parsedResponse.ok) {
      return {
        ...parsedResponse,
        ok: false,
        errors:
          parsedResponse.errors ??
          "Error al registrar usuario, por favor inténtalo de nuevo.",
      };
    }
    return { ...parsedResponse, ok: true };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      errors: "Error al registrar usuario, por favor inténtalo de nuevo.",
    };
  }
}
