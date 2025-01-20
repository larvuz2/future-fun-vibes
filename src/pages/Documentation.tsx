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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    const { data: foldersData } = await supabase
      .from("futurefundocs_folders")
      .select("*")
      .order("order_index");
    
    const { data: pagesData } = await supabase
      .from("futurefundocs_pages")
      .select("*")
      .order("order_index");

    if (foldersData) setFolders(foldersData);
    if (pagesData) {
      setPages(pagesData);
      // Find and set the "What is Future.fun?" page as default
      const defaultPage = pagesData.find(page => page.title === "What is Future.fun?");
      if (defaultPage) {
        setSelectedPage(defaultPage);
        console.log("Default page set:", defaultPage);
      }
    }

    setLoading(false);
  };

  const handlePageSelect = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setSelectedPage(page);
      console.log("Selected page:", page);
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
    return <div>Loading...</div>;
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