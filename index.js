
import 'dotenv/config'
import express from 'express'
import prisma from './prismaClient.js'
import bcrypt from 'bcrypt'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/api/clientes', async (req, res) => {
  const { data, error } = await prisma.cliente.findMany({
    include: { vehiculo: true }
  })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.get('/api/ordenes', async (req, res) => {
  const { data, error } = await prisma.orden_trabajo.findMany({
    include: { vehiculo: true, servicio: true }
  })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.post('/api/login-orm', async (req, res) => {
  const { usuario, password } = req.body

  try {
    const user = await prisma.usuarioORM.findUnique({
      where: { usuario }
    })

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' })

    res.json({ mensaje: 'Login exitoso', usuario: user.usuario })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
