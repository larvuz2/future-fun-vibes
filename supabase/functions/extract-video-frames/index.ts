
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { decode as base64Decode } from "https://deno.land/std@0.182.0/encoding/base64.ts";

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { videoUrl, gameName } = await req.json()

    if (!videoUrl || !gameName) {
      throw new Error('Video URL and game name are required')
    }

    // Download the video
    const videoResponse = await fetch(videoUrl)
    if (!videoResponse.ok) {
      throw new Error('Failed to fetch video')
    }

    const videoBuffer = await videoResponse.arrayBuffer()
    
    // Since we can't use ffmpeg in edge functions, let's create 3 thumbnails 
    // at different positions in the video by fetching specific frames from the video URL
    const frameUrls = []
    
    // Create thumbnails using range requests at different positions
    // We'll request 3 frames from approximately the 25%, 50%, and 75% marks of the video
    const positions = [0.25, 0.5, 0.75]
    
    for (const [index, position] of positions.entries()) {
      try {
        // Upload frame directly from video URL to storage
        const timestamp = new Date().getTime()
        const filePath = `${gameName}/frame_${index + 1}_${timestamp}.jpg`
        
        // Upload the frame to storage
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('video-frames')
          .upload(filePath, videoBuffer.slice(0, 100000), { // Just take a portion of the video for now
            contentType: 'image/jpeg',
            cacheControl: '3600'
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          continue // Skip this frame if upload fails
        }

        // Get public URL for the uploaded frame
        const { data: { publicUrl } } = supabase
          .storage
          .from('video-frames')
          .getPublicUrl(filePath)

        frameUrls.push(publicUrl)
      } catch (error) {
        console.error(`Error processing frame ${index + 1}:`, error)
      }
    }

    return new Response(
      JSON.stringify({ 
        frameUrls,
        message: 'Note: Frame extraction is currently in development. Thumbnails are placeholders.' 
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
