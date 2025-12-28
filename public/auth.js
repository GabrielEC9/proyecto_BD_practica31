import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form')
  const errorMsg = document.getElementById('error-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault() // evita recarga de página

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    errorMsg.textContent = ''
    errorMsg.classList.add('hidden')

    try {
      const res = await fetch('/api/login-orm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        errorMsg.textContent = data.error || 'Correo o contraseña incorrectos.'
        errorMsg.classList.remove('hidden')
        return
      }

      // Login exitoso
      console.log('Login correcto:', data)
      window.location.href = 'index.html'

    } catch (err) {
      console.error(err)
      errorMsg.textContent = 'Error al conectar con el servidor.'
      errorMsg.classList.remove('hidden')
    }
  })
})

