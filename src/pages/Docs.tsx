import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { DocsContent } from "@/components/docs/DocsContent"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="container flex-1">
          <SidebarProvider defaultOpen={true}>
            <div className="flex w-full mt-24 mb-16">
              <DocsSidebar />
              <DocsContent />
            </div>
          </SidebarProvider>
        </div>
      </div>
      <Footer />
    </div>
  )
}