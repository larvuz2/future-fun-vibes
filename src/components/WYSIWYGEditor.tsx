import { Editor } from '@tinymce/tinymce-react';
import { supabase } from "@/integrations/supabase/client";

interface WYSIWYGEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const WYSIWYGEditor = ({ value, onChange }: WYSIWYGEditorProps) => {
  return (
    <Editor
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          'codesample'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | image | codesample',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        file_picker_types: 'image',
        automatic_uploads: true,
        images_upload_handler: async (blobInfo) => {
          const file = blobInfo.blob();
          const fileName = blobInfo.filename();
          
          try {
            const { data, error } = await supabase.storage
              .from('documentation-images')
              .upload(`images/${fileName}`, file);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
              .from('documentation-images')
              .getPublicUrl(`images/${fileName}`);

            return publicUrl;
          } catch (error) {
            console.error('Error uploading image:', error);
            return '';
          }
        }
      }}
    />
  );
};