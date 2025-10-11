
import { supabase } from './supabaseClient.js';

async function main() {
  const { data, error } = await supabase.from('cliente').select('*');

  if (error) {
    console.error('Error al obtener datos:', error);
  } else {
    console.log('Datos obtenidos:', data);
  }
}

main();
