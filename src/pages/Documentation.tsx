import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu, Folder, File, ArrowLeft, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Accordion } from "@/components/ui/accordion";

type DocFolder = {
  id: string;
  name: string;
  order_index: number;
  is_deleted: boolean;
};

type DocPage = {
  id: string;
  folder_id: string;
  title: string;
  content: string;
  order_index: number;
  is_deleted: boolean;
};

const Documentation = () => {
  const [folders, setFolders] = useState<DocFolder[]>([]);
  const [pages, setPages] = useState<DocPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<DocPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Documentation component mounted");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const { data: foldersData, error: foldersError } = await supabase
        .from('futurefundocs_folders')
        .select('*')
        .eq('is_deleted', false)
        .order('order_index');

      if (foldersError) throw foldersError;

      const { data: pagesData, error: pagesError } = await supabase
        .from('futurefundocs_pages')
        .select('*')
        .eq('is_deleted', false)
        .order('order_index');

      if (pagesError) throw pagesError;

      setFolders(foldersData);
      setPages(pagesData);
      
      // Set specific page as default
      const defaultPage = pagesData.find(page => page.id === "11579ba6-7916-4adf-90a0-ea9ff13e803e");
      if (defaultPage) {
        console.log("Setting default page:", defaultPage);
        setSelectedPage(defaultPage);
      } else {
        console.log("Default page not found, using first page");
        setSelectedPage(pagesData[0]);
      }

    } catch (error) {
      console.error("Error fetching documentation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageSelect = (page: DocPage) => {
    console.log("Selecting page:", page);
    setSelectedPage(page);
    setIsOpen(false); // Close mobile menu when page is selected
    
    // Scroll to top on both mobile and desktop
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const findAdjacentPage = (direction: 'prev' | 'next') => {
    if (!selectedPage) return null;
    const sortedPages = [...pages].sort((a, b) => a.order_index - b.order_index);
    const currentIndex = sortedPages.findIndex(p => p.id === selectedPage.id);
    
    if (direction === 'prev' && currentIndex > 0) {
      return sortedPages[currentIndex - 1];
    }
    if (direction === 'next' && currentIndex < sortedPages.length - 1) {
      return sortedPages[currentIndex + 1];
    }
    return null;
  };

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
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mb-4">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <Accordion type="multiple" defaultValue={folders.map(f => f.id)} className="w-full space-y-0">
                    {folders.map((folder) => (
                      <AccordionItem key={folder.id} value={folder.id} className="border-none">
                        <AccordionTrigger className="text-sm hover:no-underline py-1">
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4" />
                            {folder.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0">
                          <div className="flex flex-col space-y-0.5 pl-4">
                            {pages
                              .filter(page => page.folder_id === folder.id)
                              .map(page => (
                                <Button
                                  key={page.id}
                                  variant="ghost"
                                  className="justify-start text-sm font-normal h-7"
                                  onClick={() => handlePageSelect(page)}
                                >
                                  <File className="h-4 w-4 mr-2" />
                                  {page.title}
                                </Button>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full glass rounded-lg p-6">
            <div className="flex gap-6">
              {/* Desktop Doc Tree */}
              <div className="hidden md:block w-1/3">
                <Accordion type="multiple" defaultValue={folders.map(f => f.id)} className="w-full space-y-0">
                  {folders.map((folder) => (
                    <AccordionItem key={folder.id} value={folder.id} className="border-none">
                      <AccordionTrigger className="text-sm hover:no-underline py-1">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4" />
                          {folder.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0">
                        <div className="flex flex-col space-y-0.5 pl-4">
                          {pages
                            .filter(page => page.folder_id === folder.id)
                            .map(page => (
                              <Button
                                key={page.id}
                                variant="ghost"
                                className="justify-start text-sm font-normal h-7"
                                onClick={() => handlePageSelect(page)}
                              >
                                <File className="h-4 w-4 mr-2" />
                                {page.title}
                              </Button>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                        <div dangerouslySetInnerHTML={{ __html: selectedPage.content }} />
                      </div>
                    ) : (
                      <p>Select a topic from the documentation tree to view its content.</p>
                    )}
                  </div>
                </ScrollArea>

                {/* Mobile Navigation - Stacked Buttons */}
                <div className="md:hidden flex flex-col mt-8 gap-4">
                  {findAdjacentPage('prev') && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 w-full"
                      onClick={() => {
                        handlePageSelect(findAdjacentPage('prev')!);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="line-clamp-1">Previous: {findAdjacentPage('prev')?.title}</span>
                    </Button>
                  )}
                  {findAdjacentPage('next') && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 w-full"
                      onClick={() => {
                        handlePageSelect(findAdjacentPage('next')!);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span className="line-clamp-1">Next: {findAdjacentPage('next')?.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
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