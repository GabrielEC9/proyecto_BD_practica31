
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Error: ' + error.message);
  } else {

    window.location.href = 'index.html';
  }
});


async function protegerPagina() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {

    window.location.href = 'login.html';
  }
}

if (window.location.pathname.endsWith('index.html')) {
  protegerPagina();
}
