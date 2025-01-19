import { SidebarInset } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"

export function DocsContent() {
  const location = useLocation()
  
  return (
    <SidebarInset className="bg-background">
      <div className="prose prose-invert max-w-4xl p-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to Future.fun Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Select a topic from the sidebar to start learning about Future.fun's features and capabilities.
        </p>
      </div>
    </SidebarInset>
  )
}