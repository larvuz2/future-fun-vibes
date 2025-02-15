
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
  const sizeClass = sizes[size];

  useEffect(() => {
    const cacheProfilePicture = async () => {
      try {
        // Check if image is already from our Supabase storage
        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl('test.svg');
        
        if (src.startsWith(publicUrl.split('/test.svg')[0])) {
          setCachedUrl(src);
          return;
        }

        // Generate a unique filename for the SVG
        const filename = `${alt.toLowerCase().replace(/\s+/g, '-')}-${size}.svg`;
        
        // Try to fetch from cache first
        const { data: existingFile } = await supabase.storage
          .from('profile-pictures')
          .getPublicUrl(`${filename}`);

        if (existingFile.publicUrl) {
          setCachedUrl(existingFile.publicUrl);
          return;
        }

        // If not in cache, fetch from DiceBear and store
        const response = await fetch(src);
        const svgBlob = await response.blob();
        
        const { data: uploadedFile, error } = await supabase.storage
          .from('profile-pictures')
          .upload(filename, svgBlob, {
            contentType: 'image/svg+xml',
            cacheControl: '31536000', // Cache for 1 year
            upsert: true
          });

        if (error) throw error;

        const { data: { publicUrl: newPublicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(filename);

        setCachedUrl(newPublicUrl);
      } catch (error) {
        console.error('Error caching profile picture:', error);
        setCachedUrl(src); // Fallback to original URL
      }
    };

    cacheProfilePicture();
  }, [src, alt, size]);

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
        loading="lazy"
      />
    </div>
  );
}
