import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbcltontvlbnaawiqegc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY2x0b250dmxibmFhd2lxZWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4MjQ2MzQsImV4cCI6MjA1MDQwMDYzNH0.cBuTAwNNB4xM-FjwmTCGK6gIP3i7kQPfLaiI49eNVm0';

export const supabase = createClient(supabaseUrl, supabaseKey);