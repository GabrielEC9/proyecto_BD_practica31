import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


const SUPABASE_URL = "https://lvuqrksujmgwgvebokgw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dXFya3N1am1nd2d2ZWJva2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNzA0NzIsImV4cCI6MjA3NTc0NjQ3Mn0.-r4fp5yQi1pH2qHmbEbhm-6Q_4WgXc_yrr3JQZpGJV4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");


async function checkLoggedIn() {
  const { data } = await supabase.auth.getSession();
  if (data.session) window.location.href = "index.html";
}
checkLoggedIn();


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
    localStorage.setItem("supabaseSession", JSON.stringify(data.session));
    window.location.href = "index.html";
  }
});

