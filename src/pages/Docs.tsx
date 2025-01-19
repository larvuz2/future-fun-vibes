import { SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { DocsContent } from "@/components/docs/DocsContent"
import { Navbar } from "@/components/Navbar"

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <div className="flex-1 flex w-full">
          <DocsSidebar />
          <DocsContent />
        </div>
      </SidebarProvider>
    </div>
  )
}