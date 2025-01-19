import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Users, Gamepad2, Code2, Coins, Cpu, Users2, Rocket, Scale } from "lucide-react"
import { Link } from "react-router-dom"

const sidebarItems = [
  {
    section: "Overview",
    icon: Book,
    items: [
      { title: "What is Future.fun?", path: "/docs/overview/what-is-future-fun" },
      { title: "How It Works", path: "/docs/overview/how-it-works" },
      { title: "Why Choose Future.fun?", path: "/docs/overview/why-choose-future-fun" },
    ],
  },
  {
    section: "For Gamers",
    icon: Gamepad2,
    items: [
      { title: "Unlocking Premium Experiences", path: "/docs/gamers/premium-experiences" },
      { title: "Supporting Developers", path: "/docs/gamers/supporting-developers" },
      { title: "Gaming on Any Device: How Streaming Works", path: "/docs/gamers/streaming" },
      { title: "Rewards and Token Benefits", path: "/docs/gamers/rewards" },
    ],
  },
  {
    section: "For Developers",
    icon: Code2,
    items: [
      { title: "Who Should Use Future.fun?", path: "/docs/developers/who-should-use" },
      { title: "Token Creation Made Simple", path: "/docs/developers/token-creation" },
      { title: "Distributing Game Prototypes", path: "/docs/developers/distribution" },
      { title: "Earning and Ecosystem", path: "/docs/developers/earning" },
    ],
  },
  {
    section: "Tokenomics",
    icon: Coins,
    items: [
      { title: "How Tokens Work", path: "/docs/tokenomics/how-tokens-work" },
      { title: "Fair Launch Model", path: "/docs/tokenomics/fair-launch" },
      { title: "Fee Structure", path: "/docs/tokenomics/fee-structure" },
      { title: "Incentives", path: "/docs/tokenomics/incentives" },
      { title: "Solana Integration", path: "/docs/tokenomics/solana" },
    ],
  },
  {
    section: "Technology",
    icon: Cpu,
    items: [
      { title: "Advanced Streaming", path: "/docs/technology/streaming" },
      { title: "Compute Features", path: "/docs/technology/compute" },
      { title: "High-Quality Gaming", path: "/docs/technology/quality" },
    ],
  },
  {
    section: "Community",
    icon: Users,
    items: [
      { title: "Token Holders", path: "/docs/community/token-holders" },
      { title: "Governance", path: "/docs/community/governance" },
      { title: "Developer-Gamer Ecosystem", path: "/docs/community/ecosystem" },
    ],
  },
  {
    section: "Getting Started",
    icon: Rocket,
    items: [
      { title: "For Gamers", path: "/docs/getting-started/gamers" },
      { title: "For Developers", path: "/docs/getting-started/developers" },
      { title: "FAQs", path: "/docs/getting-started/faqs" },
    ],
  },
  {
    section: "Future Roadmap",
    icon: Users2,
    items: [
      { title: "Planned Features", path: "/docs/roadmap/features" },
      { title: "Expanding Ecosystem", path: "/docs/roadmap/ecosystem" },
      { title: "Long-Term Vision", path: "/docs/roadmap/vision" },
    ],
  },
  {
    section: "Legal and Compliance",
    icon: Scale,
    items: [
      { title: "Transparency", path: "/docs/legal/transparency" },
      { title: "Compliance", path: "/docs/legal/compliance" },
      { title: "Security", path: "/docs/legal/security" },
    ],
  },
]

export function DocsSidebar() {
  return (
    <Sidebar className="w-72">
      <SidebarContent className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border/50 hover:[&::-webkit-scrollbar-thumb]:bg-border">
        {sidebarItems.map((section) => (
          <SidebarGroup key={section.section}>
            <SidebarGroupLabel>
              <section.icon className="mr-2" />
              {section.section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}