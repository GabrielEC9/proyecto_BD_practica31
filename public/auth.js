import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
  console.log('auth.js cargado');

  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Limpiar mensaje de error
    errorMsg.textContent = '';
    errorMsg.classList.add('hidden');

    try {
      const response = await fetch('/api/login-orm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: email, password })
      });

      const result = await response.json();

      if (response.ok) {
        // Login exitoso, redirigir
        window.location.href = 'index.html';
      } else {
        // Mostrar mensaje de error
        errorMsg.textContent = result.error || 'Correo o contraseña incorrectos.';
        errorMsg.classList.remove('hidden');
      }

    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Ocurrió un error al iniciar sesión.';
      errorMsg.classList.remove('hidden');
    }
  });
});
