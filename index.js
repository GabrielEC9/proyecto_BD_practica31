import express from 'express'
import { supabase } from './supabaseClient.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/api/clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('cliente')
    .select(`*, vehiculo(*)`)
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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
