import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WYSIWYGEditor } from "@/components/WYSIWYGEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Folder, File, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty",
        variant: "destructive",
      });
      return;
    }

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

  const addPage = async () => {
    if (!selectedFolder || !newPageTitle.trim()) {
      toast({
        title: "Error",
        description: "Please select a folder and enter a page title",
        variant: "destructive",
      });
      return;
    }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <h1 className="text-4xl font-bold">Documentation Admin</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Folders Section */}
            <Card>
              <CardHeader>
                <CardTitle>Folders</CardTitle>
                <CardDescription>Manage documentation folders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="New folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  <Button onClick={addFolder} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {folders.map((folder) => (
                    <div key={folder.id} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        <span>{folder.name}</span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete folder?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete the folder and all its pages. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteFolder(folder.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pages Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Pages</CardTitle>
                <CardDescription>Create and edit documentation pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    <WYSIWYGEditor
                      value={newPageContent}
                      onChange={(content) => setNewPageContent(content)}
                    />
                  </div>
                  
                  <Button onClick={editingPage ? updatePage : addPage}>
                    {editingPage ? 'Update Page' : 'Add Page'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pages.map((page) => (
                    <Card key={page.id}>
                      <CardHeader className="space-y-0 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{page.title}</CardTitle>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingPage(page);
                                setNewPageTitle(page.title);
                                setNewPageContent(page.content);
                                setSelectedFolder(page.folder_id);
                              }}
                            >
                              <File className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete page?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deletePage(page.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <CardDescription>
                          Folder: {folders.find(f => f.id === page.folder_id)?.name}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}