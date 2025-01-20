import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const Documentation = () => {
  const [folders, setFolders] = useState<DocFolder[]>([]);
  const [pages, setPages] = useState<DocPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<DocPage | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Documentation component mounted");
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      
      // Fetch folders
      console.log("Fetching folders...");
      const { data: foldersData, error: foldersError } = await supabase
        .from("futurefundocs_folders")
        .select("*")
        .order("order_index");

      if (foldersError) {
        console.error("Error fetching folders:", foldersError);
        toast({
          variant: "destructive",
          title: "Error fetching folders",
          description: foldersError.message,
        });
        return;
      }

      // Fetch pages
      console.log("Fetching pages...");
      const { data: pagesData, error: pagesError } = await supabase
        .from("futurefundocs_pages")
        .select("*")
        .order("order_index");

      if (pagesError) {
        console.error("Error fetching pages:", pagesError);
        toast({
          variant: "destructive",
          title: "Error fetching pages",
          description: pagesError.message,
        });
        return;
      }

      console.log("Folders data:", foldersData);
      console.log("Pages data:", pagesData);

      if (foldersData) setFolders(foldersData);
      if (pagesData) {
        setPages(pagesData);
        
        // Set default pages
        const defaultPages = [
          {
            id: "default-page",
            folder_id: "default-folder",
            title: "What is Future.fun?",
            content: "Future.fun is a revolutionary community-driven crowdfunding platform that connects gamers and developers through blockchain-powered, token-gated experiences. Our platform enables high-quality gaming experiences through advanced streaming technology.",
            order_index: 0
          },
          {
            id: "how-it-works",
            folder_id: "default-folder",
            title: "How it Works",
            content: "Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content.\n\nTransparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants.\n\nPlayer Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features.",
            order_index: 1
          }
        ];
        
        setSelectedPage(defaultPages[0]);
        console.log("Set default page:", defaultPages[0]);
      }
    } catch (error) {
      console.error("Error in initializeData:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch documentation data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageSelect = (pageId: string) => {
    console.log("Selecting page with ID:", pageId);
    const page = pages.find(p => p.id === pageId);
    if (page) {
      console.log("Selected page:", page);
      setSelectedPage(page);
      toast({
        title: "Page selected",
        description: `Viewing: ${page.title}`,
      });
    }
  };

  const FileTree = () => (
    <Tree
      className="p-4"
      initialExpandedItems={folders.map(f => f.id)}
    >
      {folders.map((folder) => (
        <Folder key={folder.id} element={folder.name} value={folder.id}>
          {pages
            .filter(page => page.folder_id === folder.id)
            .map(page => (
              <File
                key={page.id}
                value={page.id}
                onClick={() => handlePageSelect(page.id)}
              >
                {page.title}
              </File>
            ))}
        </Folder>
      ))}
    </Tree>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg">Loading documentation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Mobile Menu */}
          <div className="md:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mb-4">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <FileTree />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full glass rounded-lg p-6">
            <div className="flex gap-6">
              {/* Desktop File Tree */}
              <div className="hidden md:block w-1/3">
                <FileTree />
              </div>

              {/* Vertical Separator - Desktop Only */}
              <div className="hidden md:block">
                <Separator orientation="vertical" className="h-auto" />
              </div>

              {/* Content Area */}
              <div className="flex-1">
                <ScrollArea className="h-[calc(100vh-theme(spacing.64))]">
                  <div className="max-w-3xl mx-auto prose prose-invert">
                    {selectedPage ? (
                      <div className="space-y-6">
                        <h1 className="text-4xl font-bold mb-6">
                          {selectedPage.title}
                        </h1>
                        <div className="whitespace-pre-line">
                          {selectedPage.content}
                        </div>
                      </div>
                    ) : (
                      <p>Select a topic from the documentation tree to view its content.</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;