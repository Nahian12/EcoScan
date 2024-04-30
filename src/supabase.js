import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bwmczrlpwgcafmfgrvps.supabase.co" //import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bWN6cmxwd2djYWZtZmdydnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MDIxMzUsImV4cCI6MjAyOTk3ODEzNX0.i3xG8KjJ_ZiVSaqMF88YJh-4izgoEIGgpKyZ16cjV6U" //import.meta.env.VITE_SUPABASE_ANON_KEY

export default createClient(supabaseUrl, supabaseAnonKey)