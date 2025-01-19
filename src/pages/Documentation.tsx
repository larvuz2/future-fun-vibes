import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Users, Code, Coins, Cpu, Users2, Rocket, ScrollText, Shield } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import DocumentationContent from "@/components/DocumentationContent";

const Documentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("overview");

  const sections = [
    {
      title: "Overview",
      icon: BookOpen,
      id: "overview",
      subsections: ["what-is-future-fun", "how-it-works", "why-choose-future-fun"]
    },
    {
      title: "For Gamers",
      icon: Users,
      id: "for-gamers",
      subsections: ["unlocking-premium-experiences", "supporting-developers", "gaming-on-any-device", "rewards-and-token-benefits"]
    },
    {
      title: "For Developers",
      icon: Code,
      id: "for-developers",
      subsections: ["who-should-use-future-fun", "token-creation-made-simple", "distributing-game-prototypes", "earning-and-sustaining"]
    },
    {
      title: "Tokenomics",
      icon: Coins,
      id: "tokenomics",
      subsections: ["how-tokens-work", "fair-launch-model", "fee-structure", "incentives", "solana-integration"]
    },
    {
      title: "Technology",
      icon: Cpu,
      id: "technology",
      subsections: ["advanced-streaming", "compute-intensive-features", "ensuring-high-quality"]
    },
    {
      title: "Community",
      icon: Users2,
      id: "community",
      subsections: ["role-of-token-holders", "governance", "building-ecosystem"]
    },
    {
      title: "Getting Started",
      icon: Rocket,
      id: "getting-started",
      subsections: ["for-gamers-guide", "for-developers-guide", "faqs"]
    },
    {
      title: "Future Roadmap",
      icon: ScrollText,
      id: "future-roadmap",
      subsections: ["planned-features", "expanding-ecosystem", "long-term-vision"]
    },
    {
      title: "Legal and Compliance",
      icon: Shield,
      id: "legal",
      subsections: ["transparency", "regional-compliance", "security"]
    }
  ];

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "overview";
    setCurrentSection(path);
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sections.map((section) => (
                      <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton
                          onClick={() => navigate(`/documentation/${section.id}`)}
                          isActive={currentSection === section.id}
                          className={cn(
                            "w-full flex items-center gap-2",
                            currentSection === section.id && "font-semibold"
                          )}
                        >
                          <section.icon className="h-4 w-4" />
                          <span>{section.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 overflow-auto">
            <div className="container max-w-3xl py-6 lg:py-10">
              <DocumentationContent currentSection={currentSection} />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Documentation;