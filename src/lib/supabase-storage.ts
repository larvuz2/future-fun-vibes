import { supabase } from "@/integrations/supabase/client";

export const uploadDocumentationImage = async (file: File) => {
  const fileName = `${Math.random().toString(36).substring(7)}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('documentation-images')
    .upload(`images/${fileName}`, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('documentation-images')
    .getPublicUrl(`images/${fileName}`);

  return publicUrl;
};