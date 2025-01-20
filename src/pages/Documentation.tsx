import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@/components/ui/accordion";

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

  const defaultPages = [
    {
      id: "what-is-future-fun",
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

      // Set default folder if none exists
      const defaultFolder = {
        id: "default-folder",
        name: "Getting Started",
        order_index: 0
      };

      // Set folders and default pages
      if (foldersData) {
        setFolders([defaultFolder, ...foldersData]);
        setPages(defaultPages);
        setSelectedPage(defaultPages[0]); // Set default selected page
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

  const handlePageSelect = (page: DocPage) => {
    console.log("Selecting page:", page);
    setSelectedPage(page);
    toast({
      title: "Page selected",
      description: `Viewing: ${page.title}`,
    });
  };

  const DocTree = () => (
    <Accordion type="single" collapsible className="w-full">
      {folders.map((folder) => (
        <AccordionItem key={folder.id} value={folder.id}>
          <AccordionTrigger className="text-sm hover:no-underline">
            {folder.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-1">
              {pages
                .filter(page => page.folder_id === folder.id)
                .map(page => (
                  <Button
                    key={page.id}
                    variant="ghost"
                    className="justify-start text-sm font-normal"
                    onClick={() => handlePageSelect(page)}
                  >
                    {page.title}
                  </Button>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
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
                  <DocTree />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full glass rounded-lg p-6">
            <div className="flex gap-6">
              {/* Desktop Doc Tree */}
              <div className="hidden md:block w-1/3">
                <DocTree />
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