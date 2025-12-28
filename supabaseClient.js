<<<<<<< HEAD
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
=======
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvuqrksujmgwgvebokgw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
>>>>>>> 2e9ec9ec69639a0afd84dbdc1f2ac86bb4edaa46
