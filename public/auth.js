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



