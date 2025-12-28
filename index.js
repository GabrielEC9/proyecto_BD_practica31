import 'dotenv/config'
import express from 'express'
import prisma from './prismaClient.js'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors()) // permitir solicitudes desde cualquier origen
app.use(express.static('public'))
app.use(express.json())

// Endpoint de login usando Prisma ORM
app.post('/api/login-orm', async (req, res) => {
  const { usuario, password } = req.body

  try {
    const user = await prisma.usuarioORM.findUnique({
      where: { usuario }
    })

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: user.usuario
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
