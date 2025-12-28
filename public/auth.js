<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form')
  const errorMsg = document.getElementById('error-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    errorMsg.textContent = ''
    errorMsg.classList.add('hidden')

    try {
      const response = await fetch('/api/login-orm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: email, password })
      })

      const result = await response.json()

      if (response.ok) {
        console.log('Login exitoso:', result)
        window.location.href = 'index.html' // redirige al inicio
      } else {
        errorMsg.textContent = result.error || 'Usuario o contraseña incorrectos'
        errorMsg.classList.remove('hidden')
      }

    } catch (err) {
      console.error('Error en fetch:', err)
      errorMsg.textContent = 'Error de conexión con el servidor.'
      errorMsg.classList.remove('hidden')
    }
  })
})



=======
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dXFya3N1am1nd2d2ZWJva2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNzA0NzIsImV4cCI6MjA3NTc0NjQ3Mn0.-r4fp5yQi1pH2qHmbEbhm-6Q_4WgXc_yrr3JQZpGJV4'

const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form')
  const errorMsg = document.getElementById('error-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    errorMsg.textContent = ''
    errorMsg.classList.add('hidden')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Supabase error:', error)
      errorMsg.textContent = 'Correo o contraseña incorrectos.'
      errorMsg.classList.remove('hidden')
    } else {
      console.log('Inicio de sesión correcto:', data)
      window.location.href = 'index.html'
    }
  })
})



>>>>>>> 2e9ec9ec69639a0afd84dbdc1f2ac86bb4edaa46
