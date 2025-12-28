import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

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

    const { data, error } = await supabase
      .from('UsuarioORM')
      .select('*')
      .eq('usuario', email)
      .single()

    if (error || !data) {
      errorMsg.textContent = 'Correo o contraseña incorrectos.'
      errorMsg.classList.remove('hidden')
      return
    }

    // Comparar contraseña
    const isValid = await bcrypt.compare(password, data.password)
    if (!isValid) {
      errorMsg.textContent = 'Correo o contraseña incorrectos.'
      errorMsg.classList.remove('hidden')
      return
    }

  
    window.location.href = 'index.html'
  })
})
