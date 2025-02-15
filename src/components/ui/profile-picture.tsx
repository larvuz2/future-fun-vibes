
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface ProfilePictureProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24"
};

export function ProfilePicture({ src, alt, size = "md", className = "" }: ProfilePictureProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cachedUrl, setCachedUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const sizeClass = sizes[size];

  useEffect(() => {
    const cacheProfilePicture = async () => {
      try {
        // Generate a unique filename for the SVG
        const filename = `${alt.toLowerCase().replace(/\s+/g, '-')}-${size}-${Date.now()}.svg`;
        
        // Try to fetch the image first to verify it exists
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        
        const svgBlob = await response.blob();
        if (!svgBlob.type.includes('svg')) {
          throw new Error('Invalid image type');
        }

        // Upload to Supabase storage
        const { data: uploadedFile, error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(filename, svgBlob, {
            contentType: 'image/svg+xml',
            cacheControl: '31536000', // Cache for 1 year
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(filename);

        if (!publicUrl) {
          throw new Error('Failed to get public URL');
        }

        setCachedUrl(publicUrl);
        setError(false);
      } catch (error) {
        console.error('Error in profile picture handling:', error);
        setCachedUrl(src); // Fallback to original URL
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (src) {
      // Reset states when src changes
      setIsLoading(true);
      setError(false);
      setCachedUrl(null);
      
      // Start caching process
      cacheProfilePicture();
    }
  }, [src, alt, size]);

  if (error) {
    return (
      <div className={`relative ${sizeClass} ${className} bg-muted rounded-full flex items-center justify-center`}>
        <span className="text-muted-foreground text-xs">!</span>
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {isLoading && (
        <Skeleton className={`${sizeClass} rounded-full absolute inset-0`} />
      )}
      <img
        src={cachedUrl || src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClass} transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        loading="lazy"
      />
    </div>
  );
}
