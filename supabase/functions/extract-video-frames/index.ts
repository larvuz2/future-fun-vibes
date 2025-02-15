
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

    // Get video buffer
    const videoBuffer = await videoResponse.arrayBuffer()

    // Create a temporary file
    const tempVideoPath = await Deno.makeTempFile({ suffix: '.mp4' })
    await Deno.writeFile(tempVideoPath, new Uint8Array(videoBuffer))

    // Use ffmpeg to get video duration
    const ffprobeCmd = new Deno.Command('ffprobe', {
      args: [
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        tempVideoPath
      ]
    })
    const ffprobeOutput = await ffprobeCmd.output()
    const duration = parseFloat(new TextDecoder().decode(ffprobeOutput.stdout))

    // Generate 3 random timestamps
    const timestamps = Array.from({ length: 3 }, () => 
      Math.floor(Math.random() * (duration - 1)) + 1
    ).sort((a, b) => a - b)

    const frameUrls = []

    // Extract frames at random timestamps
    for (const [index, timestamp] of timestamps.entries()) {
      const outputPath = await Deno.makeTempFile({ suffix: '.jpg' })
      
      const ffmpegCmd = new Deno.Command('ffmpeg', {
        args: [
          '-ss', timestamp.toString(),
          '-i', tempVideoPath,
          '-vframes', '1',
          '-q:v', '2',
          outputPath
        ]
      })
      
      await ffmpegCmd.output()

      // Read the extracted frame
      const frameData = await Deno.readFile(outputPath)

      // Upload to Supabase Storage
      const filePath = `${gameName}/frame_${index + 1}_${Date.now()}.jpg`
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('video-frames')
        .upload(filePath, frameData, {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error(`Failed to upload frame ${index + 1}`)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('video-frames')
        .getPublicUrl(filePath)

      frameUrls.push(publicUrl)

      // Clean up temporary frame file
      await Deno.remove(outputPath)
    }

    // Clean up temporary video file
    await Deno.remove(tempVideoPath)

    return new Response(
      JSON.stringify({ frameUrls }),
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
