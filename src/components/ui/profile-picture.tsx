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
  const [imageUrl, setImageUrl] = useState<string>(src);
  const sizeClass = sizes[size];

  useEffect(() => {
    const cacheProfilePicture = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        if (src.includes('dicebear.com')) {
          setImageUrl(src);
          setIsLoading(false);
          return;
        }

        const blob = await response.blob();
        const filename = `${alt.toLowerCase().replace(/\s+/g, '-')}-${size}-${Date.now()}.${blob.type.includes('svg') ? 'svg' : 'png'}`;

        const { data: uploadedFile, error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(filename, blob, {
            contentType: blob.type,
            cacheControl: '31536000',
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(filename);

        if (publicUrl) {
          setImageUrl(publicUrl);
        }
      } catch (error) {
        console.error('Error in profile picture handling:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (src) {
      setIsLoading(true);
      setImageUrl(src);
      cacheProfilePicture();
    }
  }, [src, alt, size]);

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {isLoading && (
        <Skeleton className={`${sizeClass} rounded-full absolute inset-0`} />
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={`rounded-full object-cover ${sizeClass} transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.error('Error loading image:', e);
          setIsLoading(false);
          setImageUrl(src);
        }}
        loading="lazy"
      />
    </div>
  );
}
