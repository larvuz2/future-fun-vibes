
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

const isIOS = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

export function ProfilePicture({ src, alt, size = "md", className = "" }: ProfilePictureProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>(src);
  const [errorCount, setErrorCount] = useState(0);
  const sizeClass = sizes[size];
  const isIOSDevice = isIOS();

  useEffect(() => {
    const cacheProfilePicture = async () => {
      try {
        // For iOS devices, use the original source directly
        if (isIOSDevice) {
          console.log('iOS device detected, using original source');
          setImageUrl(src);
          setIsLoading(false);
          return;
        }

        // For DiceBear avatars, use them directly
        if (src.includes('dicebear.com')) {
          console.log('DiceBear avatar detected, using original source');
          setImageUrl(src);
          setIsLoading(false);
          return;
        }

        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
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
          console.error('Supabase upload error:', uploadError);
          // Fallback to original source on upload error
          setImageUrl(src);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(filename);

        if (publicUrl) {
          console.log('Successfully cached profile picture:', publicUrl);
          setImageUrl(publicUrl);
        }
      } catch (error) {
        console.error('Profile picture handling error:', error);
        // Increment error count and fallback to original source
        setErrorCount(prev => prev + 1);
        setImageUrl(src);
      } finally {
        setIsLoading(false);
      }
    };

    if (src) {
      setIsLoading(true);
      cacheProfilePicture();
    }
  }, [src, alt, size, isIOSDevice]);

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
          console.error('Image loading error:', e);
          setIsLoading(false);
          // If we haven't tried the original source yet, fall back to it
          if (imageUrl !== src) {
            setImageUrl(src);
          }
        }}
        loading="lazy"
      />
    </div>
  );
}
