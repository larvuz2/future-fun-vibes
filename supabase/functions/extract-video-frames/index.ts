
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { videoUrl, gameName } = await req.json()

    if (!videoUrl || !gameName) {
      throw new Error('Video URL and game name are required')
    }

    // For now, return placeholder images that match the game's theme
    const placeholderImages = [
      'https://images.unsplash.com/photo-1633245091570-cd62f7f116a3?q=80&w=1974&auto=format&fit=crop', // fluid/water related
      'https://images.unsplash.com/photo-1608501078714-57c3ea4cf634?q=80&w=2070&auto=format&fit=crop', // simulation related
      'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=2070&auto=format&fit=crop'  // puzzle related
    ];

    return new Response(
      JSON.stringify({ 
        frameUrls: placeholderImages,
        message: 'Note: Frame extraction is currently in development. Using themed placeholder images.' 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})
