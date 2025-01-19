import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  Book,
  Gamepad2,
  Code2,
  Coins,
  Cpu,
  Users,
  Rocket,
  Shield,
  PlayCircle,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Documentation sections with their content
const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: Book,
    subsections: [
      {
        id: "what-is-future-fun",
        title: "What is Future.fun?",
        content: "Future.fun is a community-driven crowdfunding platform that connects gamers and developers through blockchain-based, premium browser gaming. By combining Unreal Engine visuals, real-time diffusion pipelines, and token-gated access, Future.fun provides developers with a seamless way to fund their projects while offering players high-quality gaming experiences."
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content: `Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content.
        Transparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants.
        Player Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features.`
      },
      {
        id: "why-choose-future-fun",
        title: "Why Choose Future.fun?",
        content: `Simplicity: A straightforward token-gated model that connects developers with their community.
        Transparency: Fair token launches and clear fee structures foster trust and equity.
        High-Quality Gaming: Compute-intensive games with cutting-edge visuals are accessible even on mid-range devices.
        Empowered Development: Indie developers gain funding tools and incentives to innovate and engage their audience.
        Sustainable Ecosystem: A balanced revenue model ensures developers, players, and the platform thrive.`
      }
    ]
  },
  {
    id: "for-gamers",
    title: "For Gamers",
    icon: Gamepad2,
    subsections: [
      {
        id: "unlocking-premium-experiences",
        title: "Unlocking Premium Experiences",
        content: "Players buy a game's token to access its premium content. These tokens act as the gateway to exclusive gameplay features, creating a direct and simple connection between players and the game."
      },
      {
        id: "supporting-developers",
        title: "Supporting Developers",
        content: "When players purchase tokens, they directly fund the game’s development. This creates a transparent and meaningful way to support indie developers while enjoying the game."
      },
      {
        id: "gaming-on-any-device",
        title: "Gaming on Any Device: How Streaming Works",
        content: "Future.fun’s streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient."
      },
      {
        id: "rewards-and-token-benefits",
        title: "Rewards and Token Benefits",
        content: "Future.fun’s streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient."
      }
    ]
  },
  {
    id: "for-developers",
    title: "For Developers",
    icon: Code2,
    subsections: [
      {
        id: "who-should-use-future-fun",
        title: "Who Should Use Future.fun?",
        content: "Future.fun is ideal for developers creating high-quality, compute-intensive games using engines like Unreal Engine, Unity or compute-intensive diffusion pipelines. Whether you're an indie studio or an established creator, the platform simplifies funding and engagement for visually rich, immersive gaming experiences."
      },
      {
        id: "token-creation-made-simple",
        title: "Token Creation Made Simple",
        content: "Developers can easily mint tokens tied to their games through an intuitive interface. Each token is unique to the game, offering branding, ticker customization, and immediate utility as a gateway to premium features."
      },
      {
        id: "distributing-game-prototypes",
        title: "Distributing Game Prototypes and Pilots",
        content: "Future.fun allows developers to release early prototypes or pilot versions of their games, token-gated to attract early adopters. This enables developers to gather community feedback, refine gameplay, and build momentum before a full release."
      },
      {
        id: "earning-and-sustaining-ecosystem",
        title: "Earning and Sustaining Your Game Ecosystem",
        content: "Every token purchase directly funds your game, providing immediate revenue to support development. As your game attracts more players, the demand for its tokens increases, ensuring sustained growth and financial viability. This dynamic rewards developers who focus on quality and engagement."
      }
    ]
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    icon: Coins,
    subsections: [
      {
        id: "how-tokens-work",
        title: "How Tokens Work",
        content: "Tokens are minted for each game and act as access keys to unlock premium content. Players buy these tokens to experience advanced game features, directly funding the game's development. The token price follows a bonding curve—a dynamic pricing model where the price increases as more tokens are purchased. This rewards early supporters and ties token value to the game’s popularity and demand."
      },
      {
        id: "fair-launch-model",
        title: "Fair Launch Model",
        content: "Each game token follows a fair launch principle, ensuring equal access to everyone: No Pre-Sales or Reserves: All tokens are available publicly from the start, without allocations for developers or insiders. Bonding Curve Dynamics: Prices start low and rise as demand grows, similar to the models seen in Pump.fun and Indie.fun. Immediate Gameplay Utility: Tokens grant instant access to premium game features, aligning their value with real usage and player engagement. This approach creates a level playing field, rewards quality, and builds trust within the community."
      },
      {
        id: "fee-structure",
        title: "Fee Structure and Revenue Distribution",
        content: "A transaction fee (4.5%) is applied to all token transactions, distributed as follows: 30% to Compute Costs: Covers the infrastructure needed for streaming and high-quality rendering. 30% to Developers: Supports ongoing game development and content updates. 20% to Platform Operations: Ensures the platform remains robust and user-friendly. 20% to Community Engagement: Supports initiatives that enhance player and developer experiences."
      },
      {
        id: "incentives-for-gamers",
        title: "Incentives for Gamers and Developers",
        content: "For Gamers: Tokens unlock premium experiences, offering direct value for their support. For Developers: Developers earn revenue with every token transaction tied to their game, enabling sustainable development."
      },
      {
        id: "solana-integration",
        title: "Solana Integration: Speed and Low Costs",
        content: "Future.fun leverages the Solana blockchain for its token infrastructure, ensuring: Fast Transactions: Near-instant token transfers, providing a seamless gaming experience. Low Fees: Affordable costs make it accessible for both gamers and developers, enhancing scalability and adoption."
      }
    ]
  },
  {
    id: "technology",
    title: "Technology",
    icon: Cpu,
    subsections: [
      {
        id: "advanced-streaming",
        title: "Advanced Streaming and AI Pipelines",
        content: "Future.fun utilizes state-of-the-art streaming technology combined with AI-driven pipelines to deliver high-quality, immersive gaming experiences. This ensures smooth gameplay, advanced visuals, and real-time rendering, powered entirely in the cloud."
      },
      {
        id: "compute-intensive-features",
        title: "Compute-Intensive Features on Any Device",
        content: "Players can enjoy visually rich, compute-intensive games without needing high-end hardware. The platform processes and streams gameplay from its robust cloud infrastructure, making premium gaming accessible on smartphones, tablets, and other devices."
      },
      {
        id: "ensuring-high-quality",
        title: "Ensuring High-Quality Gaming with Low Hardware Demands",
        content: "Future.fun's technology offloads demanding compute tasks to the cloud, reducing the burden on players’ devices. By combining efficient streaming with Unreal Engine and Unity support, the platform delivers a seamless, high-quality experience regardless of device capabilities."
      }
    ]
  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    subsections: [
      {
        id: "role-of-token-holders",
        title: "The Role of Token Holders",
        content: "Token holders play a vital role in the Future.fun ecosystem. By purchasing and holding game tokens, they: Gain access to premium content and advanced features. Directly support game development and reward developers for their efforts. Contribute to a game’s growth by creating demand for its tokens."
      },
      {
        id: "governance-and-decision-making",
        title: "Governance and Decision-Making",
        content: "Future.fun fosters a collaborative environment where the community can shape the platform’s future: Game-Specific Input: Developers and token holders interact directly, enabling community-driven decisions like feature priorities or updates. Platform Feedback: Token holders can voice their opinions on platform-wide improvements, ensuring the system reflects user needs."
      },
      {
        id: "building-developer-gamer-ecosystem",
        title: "Building a Developer-Gamer Ecosystem",
        content: "Future.fun bridges the gap between developers and gamers, creating a mutually beneficial ecosystem: For Developers: Token purchases provide funding and community engagement. For Gamers: Players access premium features while directly influencing the success of games they support. Shared Growth: As a game gains popularity, token value increases, benefiting both developers and early supporters. This dynamic ensures an equitable, engaging, and sustainable community-driven model for all participants."
      }
    ]
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: PlayCircle,
    subsections: [
      {
        id: "for-gamers",
        title: "For Gamers: Buying Tokens and Accessing Games",
        content: "Choose a Game: Explore the platform to find a game you want to play. Buy Tokens: Purchase the game’s tokens through an easy checkout process—no prior blockchain experience required. Start Playing: Use your tokens to unlock premium content and enjoy the game immediately."
      },
      {
        id: "for-developers",
        title: "For Developers: Creating Tokens and Sharing Games",
        content: "Create an Account: Sign up on Future.fun and access the developer dashboard. Submit Game and Token Info: Provide details about your game, including its description, visuals, and token branding. Wait for Approval: The Future.fun team reviews submissions to ensure quality and alignment with the platform’s standards. Launch Your Game: Once approved, your game and tokens go live, allowing players to support your project and access your content."
      },
      {
        id: "faqs-and-troubleshooting",
        title: "FAQs and Troubleshooting",
        content: "How long does approval take for developers? Approvals typically take a few days, depending on the volume of submissions and the complexity of your game. Can players buy tokens without a blockchain wallet? Yes! Future.fun integrates user-friendly tools for seamless purchases. What happens if my game is not approved? You’ll receive feedback to help you refine your submission and reapply. Where can I find support? Access the help center for step-by-step guides, FAQs, and assistance from the Future.fun team."
      }
    ]
  },
  {
    id: "future-roadmap",
    title: "Future Roadmap",
    icon: Rocket,
    subsections: [
      {
        id: "planned-features",
        title: "Planned Features and Updates",
        content: "Enhanced Developer Tools: Simplified interfaces for token creation and game submission, along with analytics dashboards to track player engagement and token performance. Improved Player Experience: Features like personalized game recommendations, smoother onboarding, and expanded payment options for token purchases. Streaming Optimization: Further improvements to cloud rendering and AI pipelines for even faster, more reliable gameplay across devices."
      },
      {
        id: "expanding-ecosystem",
        title: "Expanding the Ecosystem",
        content: "More Game Integrations: Support for additional game engines, ensuring compatibility with a wider range of developers. Broader Platform Access: Partnerships with content creators and gaming communities to bring more players and developers into the Future.fun ecosystem. Cross-Game Token Utility: Exploring ways to allow tokens from one game to unlock perks or features in others, fostering collaboration and interconnected gameplay experiences."
      },
      {
        id: "long-term-vision",
        title: "Long-Term Vision",
        content: "Future.fun aims to redefine how games and experiences are funded, played, and sustained: Empowering Indie Developers: Providing the tools and resources to create groundbreaking games without relying on traditional publishers. Global Accessibility: Ensuring players worldwide can access premium gaming experiences, regardless of hardware or technical expertise. Community-Driven Growth: Evolving the platform through feedback and contributions from gamers and developers alike, creating a truly collaborative ecosystem. By continuously innovating and expanding, Future.fun is set to become the cornerstone of Web3 gaming, bridging quality, accessibility, and community."
      }
    ]
  },
  {
    id: "legal-and-compliance",
    title: "Legal and Compliance",
    icon: Shield,
    subsections: [
      {
        id: "transparency-and-fairness",
        title: "Transparency and Fairness",
        content: "Fair Token Launches: All tokens are launched without pre-sales or reserved allocations, ensuring equal access for all participants. Clear Fee Structure: Every transaction fee is transparently allocated to compute costs, developers, and platform operations, reinforcing trust within the ecosystem. Open Reporting: Future.fun provides clear documentation on token usage, distribution, and revenue sharing to maintain accountability."
      },
      {
        id: "regional-and-international-compliance",
        title: "Regional and International Compliance",
        content: "Regulatory Adherence: The platform actively complies with regional and international laws to ensure smooth operations and user safety. KYC/AML Compliance: Developers and certain user accounts may undergo identity verification to meet anti-money laundering (AML) and know-your-customer (KYC) requirements. Global Accessibility: Legal frameworks are continually reviewed to ensure the platform remains accessible across different jurisdictions."
      },
      {
        id: "security-measures",
        title: "Security Measures",
        content: "Blockchain Security: Tokens and transactions leverage Solana’s robust and secure blockchain infrastructure to protect against fraud and tampering. Data Protection: Player and developer data are securely stored and managed in line with global privacy standards, such as GDPR and CCPA. Continuous Audits: Regular system audits and smart contract evaluations are conducted to ensure platform integrity and security."
      }
    ]
  }
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [activeSubsection, setActiveSubsection] = useState(sections[0].subsections[0].id);

  const currentSection = sections.find(section => section.id === activeSection);
  const currentSubsection = currentSection?.subsections.find(
    subsection => subsection.id === activeSubsection
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <SidebarProvider>
          <Sidebar className="w-64 border-r">
            <SidebarContent>
              {sections.map((section) => (
                <SidebarGroup key={section.id}>
                  <SidebarGroupLabel className="flex items-center gap-2">
                    <section.icon className="w-4 h-4" />
                    <span className="font-bold">{section.title}</span>
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.subsections.map((subsection) => (
                        <SidebarMenuItem key={subsection.id}>
                          <SidebarMenuButton
                            onClick={() => {
                              setActiveSection(section.id);
                              setActiveSubsection(subsection.id);
                            }}
                            data-active={activeSubsection === subsection.id}
                          >
                            {subsection.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">{currentSubsection?.title}</h1>
              <div className="prose prose-invert">
                {currentSubsection?.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
