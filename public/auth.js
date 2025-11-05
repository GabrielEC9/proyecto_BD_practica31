import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
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
