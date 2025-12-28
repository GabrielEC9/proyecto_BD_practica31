import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import prisma from './prismaClient.js' 

const app = express()
const port = process.env.PORT || 3000

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

app.use(express.static('public'))
app.use(express.json())

app.get('/api/clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('cliente')
    .select('*, vehiculo(*)')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.get('/api/ordenes', async (req, res) => {
  const { data, error } = await supabase
    .from('orden_trabajo')
    .select(`
      *,
      vehiculo(*),
      servicio(*)
    `)

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body

  try {
    const { data: user, error } = await supabase
      .from('UsuarioORM')
      .select('*')
      .eq('usuario', usuario)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    res.json({ mensaje: 'Login exitoso', usuario: user.usuario })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.get('/api/check-session', (req, res) => {
  const user = req.headers['x-usuario'] || null
  if (!user) return res.status(401).json({ error: 'No autenticado' })
  res.json({ usuario: user })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
