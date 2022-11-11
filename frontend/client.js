import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://afwwxlhknelxylrfvexi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd3d4bGhrbmVseHlscmZ2ZXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY0MzQ4MTgsImV4cCI6MTk4MjAxMDgxOH0.gk1F8Br9__04cvzqYIeeQ-U08KATiHovAw3r3ofNGAo"

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

export { supabase }