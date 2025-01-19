import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { DocsContent } from "@/components/docs/DocsContent"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Navbar */}
      <Navbar />
      
      {/* Main content area with sidebar and content */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto">
          <SidebarProvider defaultOpen={true}>
            <div className="flex gap-8 pt-24 pb-24">
              {/* 2. Sidebar */}
              <div className="w-72 shrink-0">
                <DocsSidebar />
              </div>
              
              {/* 3. Content area */}
              <div className="flex-1">
                <DocsContent />
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>

      {/* 4. Footer */}
      <Footer />
    </div>
  )
}