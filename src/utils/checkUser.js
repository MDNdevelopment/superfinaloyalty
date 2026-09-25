export default async function checkUser(payload) {
  try {
    const response = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.isRegistered) {
      return {
        ok: true,
        userExists: true,
        errors: "El usuario ya se encuentra registrado",
      };
    }
    return {
      ok: true,
      userExists: false,
      errors: "",
    };
  } catch (e) {
    console.log("error in checking registered");
    return {
      ok: false,
      errors: e,
    };
  }
}
