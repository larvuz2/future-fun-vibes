import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

type Folder = {
  id: string;
  name: string;
  order_index: number;
};

type Page = {
  id: string;
  folder_id: string;
  title: string;
  content: string;
  order_index: number;
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
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
    fetchData();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.role !== "admin") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
  };

  const fetchData = async () => {
    const { data: foldersData } = await supabase
      .from("documentation_folders")
      .select("*")
      .order("order_index");
    
    const { data: pagesData } = await supabase
      .from("documentation_pages")
      .select("*")
      .order("order_index");

    if (foldersData) setFolders(foldersData);
    if (pagesData) setPages(pagesData);
  };

  const addFolder = async () => {
    if (!newFolderName.trim()) return;
    
    const { error } = await supabase
      .from("documentation_folders")
      .insert({
        name: newFolderName,
        order_index: folders.length,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add folder",
        variant: "destructive",
      });
      return;
    }

    setNewFolderName("");
    setIsAddingFolder(false);
    fetchData();
    toast({
      title: "Success",
      description: "Folder added successfully",
    });
  };

  const deleteFolder = async (id: string) => {
    const { error } = await supabase
      .from("documentation_folders")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
      return;
    }

    fetchData();
    toast({
      title: "Success",
      description: "Folder deleted successfully",
    });
  };

  const addPage = async () => {
    if (!selectedFolder || !newPageTitle.trim() || !newPageContent.trim()) return;
    
    const { error } = await supabase
      .from("documentation_pages")
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
    const { error } = await supabase
      .from("documentation_pages")
      .update({
        title: newPageTitle,
        content: newPageContent,
      })
      .eq("id", id);

    if (error) {
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
      .from("documentation_pages")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
      return;
    }

    fetchData();
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {folders.map((folder) => (
                    <TableRow key={folder.id}>
                      <TableCell>{folder.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => setSelectedFolder(folder.id)}
                        >
                          View Pages
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteFolder(folder.id)}
                        >
                          Delete
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
                              onClick={() => deletePage(page.id)}
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
                  <Label htmlFor="folderName">Folder Name</Label>
                  <Input
                    id="folderName"
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
                  <Label htmlFor="pageTitle">Page Title</Label>
                  <Input
                    id="pageTitle"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pageContent">Content</Label>
                  <Textarea
                    id="pageContent"
                    value={newPageContent}
                    onChange={(e) => setNewPageContent(e.target.value)}
                    className="h-[200px]"
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
                  <Label htmlFor="editPageTitle">Page Title</Label>
                  <Input
                    id="editPageTitle"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="editPageContent">Content</Label>
                  <Textarea
                    id="editPageContent"
                    value={newPageContent}
                    onChange={(e) => setNewPageContent(e.target.value)}
                    className="h-[200px]"
                  />
                </div>
                <Button onClick={() => isEditingPage && updatePage(isEditingPage)}>
                  Update Page
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}