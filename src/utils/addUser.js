export default async function addUser(payload) {
  try {
    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!data.ok) {
      return false;
    }
    return true;
  } catch (e) {
    console.log("error in adding registered");
    return {
      ok: false,
      errors: e,
    };
  }
}
