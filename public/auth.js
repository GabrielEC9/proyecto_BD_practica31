document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form')
  const errorMsg = document.getElementById('error-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const usuario = document.getElementById('email').value
    const password = document.getElementById('password').value

    errorMsg.textContent = ''
    errorMsg.classList.add('hidden')

    try {
      const res = await fetch('/api/login-orm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      })
      const data = await res.json()

      if (!res.ok) {
        errorMsg.textContent = data.error || 'Correo o contraseña incorrectos.'
        errorMsg.classList.remove('hidden')
        return
      }

      // Login correcto
      window.location.href = 'index.html'

    } catch (err) {
      console.error(err)
      errorMsg.textContent = 'Error del servidor.'
      errorMsg.classList.remove('hidden')
    }
  })
})


