<<<<<<< HEAD
import 'dotenv/config'
import express from 'express'
import { supabase } from './supabaseClient.js'
import prisma from './prismaClient.js'
import bcrypt from 'bcrypt'  // <-- Importamos bcrypt
=======
import express from 'express'
import { supabase } from './supabaseClient.js'
>>>>>>> 2e9ec9ec69639a0afd84dbdc1f2ac86bb4edaa46

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/api/clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('cliente')
<<<<<<< HEAD
    .select('*, vehiculo(*)')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

=======
    .select(`*, vehiculo(*)`)
  if (error) return res.status(500).json({ error: error.message })
>>>>>>> 2e9ec9ec69639a0afd84dbdc1f2ac86bb4edaa46
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
<<<<<<< HEAD

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Login usando Prisma ORM y bcrypt
app.post('/api/login-orm', async (req, res) => {
  const { usuario, password } = req.body

  try {
    const user = await prisma.usuarioORM.findUnique({
      where: { usuario }
    })

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    // Comparamos la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    res.json({
      mensaje: 'Login exitoso usando ORM (Prisma)',
      usuario: user.usuario
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

=======
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

>>>>>>> 2e9ec9ec69639a0afd84dbdc1f2ac86bb4edaa46
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
