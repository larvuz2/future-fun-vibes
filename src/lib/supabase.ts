import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbcltontvlbnaawiqegc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY2x0b250dmxibmFhd2lxZWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzI0NjAsImV4cCI6MjAyNTQwODQ2MH0.ZpgVJmj1jS6TXSVvJI5RYTNOEfOJuAUxqxXXVGBpO7Y';

export const supabase = createClient(supabaseUrl, supabaseKey);