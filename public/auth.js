
const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      errorMsg.textContent = '❌ Credenciales incorrectas';
      errorMsg.classList.remove('hidden');
    } else {
      window.location.href = 'index.html';
    }
  });
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });
}

(async () => {
  const { data } = await supabase.auth.getSession();
  const isLoginPage = window.location.pathname.includes('login.html');
  if (!data.session && !isLoginPage) {
    window.location.href = 'login.html';
  } else if (data.session && isLoginPage) {
    window.location.href = 'index.html';
  }
})();
