import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { DocsContent } from "@/components/docs/DocsContent"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container pt-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex-1 flex w-full">
            <DocsSidebar />
            <DocsContent />
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  )
}