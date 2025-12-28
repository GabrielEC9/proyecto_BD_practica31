import prisma from './prismaClient.js'
import bcrypt from 'bcryptjs'

const loginForm = document.getElementById("login-form")
const errorMessage = document.getElementById("error-message")

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      errorMessage.textContent = "Usuario no encontrado"
      errorMessage.classList.remove("hidden")
      return
    }

    const validPassword = await bcrypt.compare(password, usuario.passwordHash)
    if (!validPassword) {
      errorMessage.textContent = "Contraseña incorrecta"
      errorMessage.classList.remove("hidden")
      return
    }

    localStorage.setItem("userSession", JSON.stringify({
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre
    }))

    errorMessage.classList.add("hidden")
    window.location.href = "index.html"

  } catch (err) {
    console.error(err)
    errorMessage.textContent = "Error al iniciar sesión"
    errorMessage.classList.remove("hidden")
  }
})


export function verificarSesion() {
  const session = localStorage.getItem("userSession")
  if (!session) {
    window.location.href = "login.html"
  }
}


export function cerrarSesion() {
  localStorage.removeItem("userSession")
  window.location.href = "login.html"
}

