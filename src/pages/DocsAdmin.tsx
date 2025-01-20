import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Editor } from '@tinymce/tinymce-react';

type DocFolder = {
  id: string;
  name: string;
  order_index: number;
};

type DocPage = {
  id: string;
  folder_id: string;
  title: string;
  content: string;
  order_index: number;
};

export default function DocsAdmin() {
  const [folders, setFolders] = useState<DocFolder[]>([]);
  const [pages, setPages] = useState<DocPage[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState("");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageContent, setNewPageContent] = useState("");
  const [editingPage, setEditingPage] = useState<DocPage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: foldersData, error: foldersError } = await supabase
        .from('futurefundocs_folders')
        .select('*')
        .order('order_index');

      if (foldersError) throw foldersError;

      const { data: pagesData, error: pagesError } = await supabase
        .from('futurefundocs_pages')
        .select('*')
        .order('order_index');

      if (pagesError) throw pagesError;

      setFolders(foldersData || []);
      setPages(pagesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch documentation data",
        variant: "destructive",
      });
    }
  };

  const addFolder = async () => {
    try {
      const { error } = await supabase
        .from('futurefundocs_folders')
        .insert({
          name: newFolderName,
          order_index: folders.length,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder added successfully",
      });
      
      setNewFolderName("");
      fetchData();
    } catch (error) {
      console.error("Error adding folder:", error);
      toast({
        title: "Error",
        description: "Failed to add folder",
        variant: "destructive",
      });
    }
  };

  const addPage = async () => {
    try {
      const { error } = await supabase
        .from('futurefundocs_pages')
        .insert({
          folder_id: selectedFolder,
          title: newPageTitle,
          content: newPageContent,
          order_index: pages.filter(p => p.folder_id === selectedFolder).length,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page added successfully",
      });
      
      setNewPageTitle("");
      setNewPageContent("");
      setSelectedFolder("");
      fetchData();
    } catch (error) {
      console.error("Error adding page:", error);
      toast({
        title: "Error",
        description: "Failed to add page",
        variant: "destructive",
      });
    }
  };

  const updatePage = async () => {
    if (!editingPage) return;

    try {
      const { error } = await supabase
        .from('futurefundocs_pages')
        .update({
          title: newPageTitle,
          content: newPageContent,
        })
        .eq('id', editingPage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page updated successfully",
      });
      
      setEditingPage(null);
      setNewPageTitle("");
      setNewPageContent("");
      fetchData();
    } catch (error) {
      console.error("Error updating page:", error);
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      });
    }
  };

  const deletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('futurefundocs_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('futurefundocs_folders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <h1 className="text-4xl font-bold">Documentation Admin</h1>
          
          {/* Add Folder Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Folders</h2>
            <div className="flex gap-4">
              <Input
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Button onClick={addFolder}>Add Folder</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <div key={folder.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{folder.name}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFolder(folder.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Page Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Pages</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Folder</Label>
                  <Select
                    value={selectedFolder}
                    onValueChange={setSelectedFolder}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    placeholder="Page title"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Content</Label>
                <Editor
                  value={newPageContent}
                  onEditorChange={(content) => setNewPageContent(content)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </div>
              
              <Button onClick={editingPage ? updatePage : addPage}>
                {editingPage ? 'Update Page' : 'Add Page'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <div key={page.id} className="p-4 border rounded-lg">
                  <div className="space-y-2">
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-gray-500">
                      Folder: {folders.find(f => f.id === page.folder_id)?.name}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPage(page);
                          setNewPageTitle(page.title);
                          setNewPageContent(page.content);
                          setSelectedFolder(page.folder_id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deletePage(page.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
