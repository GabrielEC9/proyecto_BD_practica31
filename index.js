import express from 'express';
import { supabase } from './supabaseClient.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('cliente').select('*');
  if (error) return res.status(500).send(error.message);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
