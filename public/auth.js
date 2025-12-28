import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs/dist/bcrypt.min.js'

const SUPABASE_URL = "https://lvuqrksujmgwgvebokgw.supabase.co";
const SUPABASE_ANON_KEY = "<REEMPLAZA_CON_ANON_KEY>";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("UsuarioORM")
    .select("id, usuario, password")
    .eq("usuario", usuario)
    .single();

  if (error || !data) {
    errorMessage.textContent = "Usuario no encontrado";
    errorMessage.classList.remove("hidden");
    return;
  }

  const valid = bcrypt.compareSync(password, data.password);

  if (!valid) {
    errorMessage.textContent = "Contraseña incorrecta";
    errorMessage.classList.remove("hidden");
    return;
  }

  localStorage.setItem("usuarioSession", JSON.stringify({
    id: data.id,
    usuario: data.usuario,
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


export function cerrarSesion() {
  localStorage.removeItem("usuarioSession");
  window.location.href = "login.html";
}



