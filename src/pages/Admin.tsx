import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WYSIWYGEditor } from "@/components/WYSIWYGEditor";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Folder = {
  id: string;
  name: string;
  order_index: number;
  is_deleted: boolean;
};

type Page = {
  id: string;
  folder_id: string;
  title: string;
  content: string;
  order_index: number;
  is_deleted: boolean;
};

export default function Admin() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [isEditingPage, setIsEditingPage] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageContent, setNewPageContent] = useState("");
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const { data: foldersData, error: foldersError } = await supabase
        .from("futurefundocs_folders")
        .select("*")
        .order("order_index");
      
      if (foldersError) {
        console.error("Error fetching folders:", foldersError);
        toast({
          title: "Error",
          description: "Failed to fetch folders",
          variant: "destructive",
        });
        return;
      }

      const { data: pagesData, error: pagesError } = await supabase
        .from("futurefundocs_pages")
        .select("*")
        .eq('is_deleted', false)
        .order("order_index");

      if (pagesError) {
        console.error("Error fetching pages:", pagesError);
        toast({
          title: "Error",
          description: "Failed to fetch pages",
          variant: "destructive",
        });
        return;
      }

      console.log("Folders data:", foldersData);
      console.log("Pages data:", pagesData);

      if (foldersData) setFolders(foldersData);
      if (pagesData) setPages(pagesData);
    } catch (error) {
      console.error("Error in fetchData:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  };

  const addFolder = async () => {
    if (!newFolderName.trim()) return;
    
    try {
      const { error } = await supabase
        .from("futurefundocs_folders")
        .insert({
          name: newFolderName,
          order_index: folders.length,
          is_deleted: false
        });

      if (error) throw error;

      setNewFolderName("");
      setIsAddingFolder(false);
      await fetchData();
      toast({
        title: "Success",
        description: "Folder added successfully",
      });
    } catch (error) {
      console.error("Error adding folder:", error);
      toast({
        title: "Error",
        description: "Failed to add folder",
        variant: "destructive",
      });
    }
  };

  const toggleFolderVisibility = async (folder: Folder) => {
    console.log("Toggling visibility for folder:", folder.id);
    
    try {
      const newIsDeleted = !folder.is_deleted;
      
      const { error: folderError } = await supabase
        .from("futurefundocs_folders")
        .update({ is_deleted: newIsDeleted })
        .eq("id", folder.id);

      if (folderError) throw folderError;

      // Update pages visibility if folder is being hidden
      if (newIsDeleted) {
        const { error: pagesError } = await supabase
          .from("futurefundocs_pages")
          .update({ is_deleted: true })
          .eq("folder_id", folder.id);

        if (pagesError) throw pagesError;
      }

      // Update local state
      setFolders(prevFolders => 
        prevFolders.map(f => 
          f.id === folder.id ? { ...f, is_deleted: newIsDeleted } : f
        )
      );

      if (newIsDeleted) {
        setPages(prevPages => 
          prevPages.map(page => 
            page.folder_id === folder.id 
              ? { ...page, is_deleted: true }
              : page
          )
        );
      }

      toast({
        title: "Success",
        description: `Folder ${newIsDeleted ? 'hidden' : 'visible'} successfully`,
      });

      // Refresh data to ensure consistency
      await fetchData();
    } catch (error) {
      console.error("Error toggling folder visibility:", error);
      toast({
        title: "Error",
        description: "Failed to update folder visibility",
        variant: "destructive",
      });
    }
  };

  const addPage = async () => {
    if (!selectedFolder || !newPageTitle.trim() || !newPageContent.trim()) return;
    
    const { error } = await supabase
      .from("futurefundocs_pages")
      .insert({
        folder_id: selectedFolder,
        title: newPageTitle,
        content: newPageContent,
        order_index: pages.filter(p => p.folder_id === selectedFolder).length,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add page",
        variant: "destructive",
      });
      return;
    }

    setNewPageTitle("");
    setNewPageContent("");
    setIsAddingPage(false);
    fetchData();
    toast({
      title: "Success",
      description: "Page added successfully",
    });
  };

  const updatePage = async (id: string) => {
    console.log("Updating page:", id);
    console.log("New title:", newPageTitle);
    console.log("New content:", newPageContent);

    const { error } = await supabase
      .from("futurefundocs_pages")
      .update({
        title: newPageTitle,
        content: newPageContent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating page:", error);
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      });
      return;
    }

    setNewPageTitle("");
    setNewPageContent("");
    setIsEditingPage(null);
    fetchData();
    toast({
      title: "Success",
      description: "Page updated successfully",
    });
  };

  const deletePage = async (id: string) => {
    const { error } = await supabase
      .from("futurefundocs_pages")
      .update({ is_deleted: true })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
      return;
    }

    setPages(prevPages => prevPages.filter(page => page.id !== id));
    setPageToDelete(null);
    toast({
      title: "Success",
      description: "Page deleted successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl font-bold mb-8">Documentation Admin</h1>
          
          <div className="space-y-8">
            {/* Folders Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Folders</h2>
                <Button onClick={() => setIsAddingFolder(true)}>Add Folder</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {folders.map((folder) => (
                    <TableRow key={folder.id}>
                      <TableCell>{folder.name}</TableCell>
                      <TableCell>
                        <Switch
                          checked={!folder.is_deleted}
                          onCheckedChange={() => toggleFolderVisibility(folder)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => setSelectedFolder(folder.id)}
                        >
                          View Pages
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pages Section */}
            {selectedFolder && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">
                    Pages in {folders.find(f => f.id === selectedFolder)?.name}
                  </h2>
                  <Button onClick={() => setIsAddingPage(true)}>Add Page</Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages
                      .filter(page => page.folder_id === selectedFolder)
                      .map((page) => (
                        <TableRow key={page.id}>
                          <TableCell>{page.title}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              className="mr-2"
                              onClick={() => {
                                setIsEditingPage(page.id);
                                setNewPageTitle(page.title);
                                setNewPageContent(page.content);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => setPageToDelete(page.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Add Folder Dialog */}
          <Dialog open={isAddingFolder} onOpenChange={setIsAddingFolder}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Folder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                <Button onClick={addFolder}>Add Folder</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Page Dialog */}
          <Dialog open={isAddingPage} onOpenChange={setIsAddingPage}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Page Title"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                  />
                </div>
                <div>
                  <WYSIWYGEditor
                    value={newPageContent}
                    onChange={setNewPageContent}
                  />
                </div>
                <Button onClick={addPage}>Add Page</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Page Dialog */}
          <Dialog
            open={isEditingPage !== null}
            onOpenChange={() => setIsEditingPage(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Page Title"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                  />
                </div>
                <div>
                  <WYSIWYGEditor
                    value={newPageContent}
                    onChange={setNewPageContent}
                  />
                </div>
                <Button onClick={() => isEditingPage && updatePage(isEditingPage)}>
                  Update Page
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Page Confirmation Dialog */}
          <AlertDialog open={pageToDelete !== null} onOpenChange={() => setPageToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this page. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => pageToDelete && deletePage(pageToDelete)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}
