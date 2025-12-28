const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMessage.textContent = data.error || "Usuario o contraseña incorrectos";
        errorMessage.classList.remove("hidden");
        return;
      }

      localStorage.setItem(
        "usuarioSession",
        JSON.stringify({
          usuario: data.usuario,
          loginAt: new Date().toISOString(),
        })
      );

      window.location.href = "index.html";
    } catch (err) {
      errorMessage.textContent = "Error de conexión con el servidor";
      errorMessage.classList.remove("hidden");
      console.error(err);
    }
  });
}

export function verificarSesion() {
  const session = localStorage.getItem("usuarioSession");
  if (!session) {
    window.location.href = "login.html";
  }
}

export function cerrarSesion() {
  localStorage.removeItem("usuarioSession");
  window.location.href = "login.html";
}
