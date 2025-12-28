import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://lvuqrksujmgwgvebokgw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dXFya3N1am1nd2d2ZWJva2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNzA0NzIsImV4cCI6MjA3NTc0NjQ3Mn0.-r4fp5yQi1pH2qHmbEbhm-6Q_4WgXc_yrr3JQZpGJV4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  const { data, error } = await supabase.rpc('login_usuario', { p_usuario: usuario, p_password: password });

  if (error) {
    console.error(error);
    errorMessage.textContent = "Error al iniciar sesión";
    errorMessage.classList.remove("hidden");
    return;
  }

  if (!data || data.length === 0) {
    errorMessage.textContent = "Usuario o contraseña incorrectos";
    errorMessage.classList.remove("hidden");
    return;
  }

  localStorage.setItem("usuarioSession", JSON.stringify({
    id: data[0].id,
    usuario: data[0].usuario,
    loginAt: new Date().toISOString()
  }));

  window.location.href = "index.html";
});

export function verificarSesion() {
  const session = localStorage.getItem("usuarioSession");
  if (!session) {
    window.location.href = "login.html";
  }
}

// Función para cerrar sesión
export function cerrarSesion() {
  localStorage.removeItem("usuarioSession");
  window.location.href = "login.html";
}

