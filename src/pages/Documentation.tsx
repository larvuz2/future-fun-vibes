import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Users, Gamepad, Coins, Cpu, Users2, RocketIcon, Scale, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

// Documentation sections data
const sections = [
  {
    title: "Overview",
    icon: <Book className="w-5 h-5" />,
    subsections: [
      { title: "What is Future.fun?", content: "Future.fun is a community-driven crowdfunding platform that connects gamers and developers through blockchain-based, premium browser gaming. By combining Unreal Engine visuals, real-time diffusion pipelines, and token-gated access, Future.fun provides developers with a seamless way to fund their projects while offering players high-quality gaming experiences." },
      { title: "How It Works", content: "Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content. Transparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants. Player Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features." },
      { title: "Why Choose Future.fun?", content: "Simplicity: A straightforward token-gated model that connects developers with their community. Transparency: Fair token launches and clear fee structures foster trust and equity. High-Quality Gaming: Compute-intensive games with cutting-edge visuals are accessible even on mid-range devices. Empowered Development: Indie developers gain funding tools and incentives to innovate and engage their audience. Sustainable Ecosystem: A balanced revenue model ensures developers, players, and the platform thrive." }
    ]
  },
  {
    title: "For Gamers",
    icon: <Gamepad className="w-5 h-5" />,
    subsections: [
      { title: "Unlocking Premium Experiences", content: "Players buy a game’s token to access its premium content. These tokens act as the gateway to exclusive gameplay features, creating a direct and simple connection between players and the game." },
      { title: "Supporting Developers", content: "When players purchase tokens, they directly fund the game’s development. This creates a transparent and meaningful way to support indie developers while enjoying the game." },
      { title: "Gaming on Any Device: How Streaming Works", content: "Future.fun’s streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient." },
      { title: "Rewards and Token Benefits", content: "Future.fun’s streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient." }
    ]
  },
  {
    title: "For Developers",
    icon: <Users className="w-5 h-5" />,
    subsections: [
      { title: "Who Should Use Future.fun? (Focus on Unreal Engine, Unity, and Compute-Intensive Games)", content: "Future.fun is ideal for developers creating high-quality, compute-intensive games using engines like Unreal Engine, Unity or compute-intensive diffusion pipelines. Whether you’re an indie studio or an established creator, the platform simplifies funding and engagement for visually rich, immersive gaming experiences." },
      { title: "Token Creation Made Simple", content: "Developers can easily mint tokens tied to their games through an intuitive interface. Each token is unique to the game, offering branding, ticker customization, and immediate utility as a gateway to premium features." },
      { title: "Distributing Game Prototypes and Pilots", content: "Future.fun allows developers to release early prototypes or pilot versions of their games, token-gated to attract early adopters. This enables developers to gather community feedback, refine gameplay, and build momentum before a full release." },
      { title: "Earning and Sustaining Your Game Ecosystem", content: "Every token purchase directly funds your game, providing immediate revenue to support development. As your game attracts more players, the demand for its tokens increases, ensuring sustained growth and financial viability. This dynamic rewards developers who focus on quality and engagement." }
    ]
  },
  {
    title: "Tokenomics",
    icon: <Coins className="w-5 h-5" />,
    subsections: [
      { title: "How Tokens Work", content: "Tokens are minted for each game and act as access keys to unlock premium content. Players buy these tokens to experience advanced game features, directly funding the game's development. The token price follows a bonding curve—a dynamic pricing model where the price increases as more tokens are purchased. This rewards early supporters and ties token value to the game’s popularity and demand. The tokenomics model is inspired by platforms like Pump.fun and Indie.fun, ensuring transparent, equitable distribution and encouraging a strong link between player support and game quality." },
      { title: "Fair Launch Model", content: "Each game token follows a fair launch principle, ensuring equal access to everyone: No Pre-Sales or Reserves: All tokens are available publicly from the start, without allocations for developers or insiders. Bonding Curve Dynamics: Prices start low and rise as demand grows, similar to the models seen in Pump.fun and Indie.fun. Immediate Gameplay Utility: Tokens grant instant access to premium game features, aligning their value with real usage and player engagement. This approach creates a level playing field, rewards quality, and builds trust within the community." },
      { title: "Fee Structure and Revenue Distribution", content: "A transaction fee (4.5%) is applied to all token transactions, distributed as follows: 30% to Compute Costs: Covers the infrastructure needed for streaming and high-quality rendering. 30% to Developers: Supports ongoing game development and content updates. 20% to Platform Operations: Ensures the platform remains robust and user-friendly. 20% to Community Engagement: Supports initiatives that enhance player and developer experiences." },
      { title: "Incentives for Gamers and Developers", content: "For Gamers: Tokens unlock premium experiences, offering direct value for their support. For Developers: Developers earn revenue with every token transaction tied to their game, enabling sustainable development." },
      { title: "Solana Integration: Speed and Low Costs", content: "Future.fun leverages the Solana blockchain for its token infrastructure, ensuring: Fast Transactions: Near-instant token transfers, providing a seamless gaming experience. Low Fees: Affordable costs make it accessible for both gamers and developers, enhancing scalability and adoption." }
    ]
  },
  {
    title: "Technology",
    icon: <Cpu className="w-5 h-5" />,
    subsections: [
      { title: "Advanced Streaming and AI Pipelines", content: "Future.fun utilizes state-of-the-art streaming technology combined with AI-driven pipelines to deliver high-quality, immersive gaming experiences. This ensures smooth gameplay, advanced visuals, and real-time rendering, powered entirely in the cloud." },
      { title: "Compute-Intensive Features on Any Device", content: "Players can enjoy visually rich, compute-intensive games without needing high-end hardware. The platform processes and streams gameplay from its robust cloud infrastructure, making premium gaming accessible on smartphones, tablets, and other devices." },
      { title: "Ensuring High-Quality Gaming with Low Hardware Demands", content: "Future.fun's technology offloads demanding compute tasks to the cloud, reducing the burden on players’ devices. By combining efficient streaming with Unreal Engine and Unity support, the platform delivers a seamless, high-quality experience regardless of device capabilities." }
    ]
  },
  {
    title: "Community",
    icon: <Users2 className="w-5 h-5" />,
    subsections: [
      { title: "The Role of Token Holders", content: "Token holders play a vital role in the Future.fun ecosystem. By purchasing and holding game tokens, they: Gain access to premium content and advanced features. Directly support game development and reward developers for their efforts. Contribute to a game’s growth by creating demand for its tokens." },
      { title: "Governance and Decision-Making", content: "Future.fun fosters a collaborative environment where the community can shape the platform’s future: Game-Specific Input: Developers and token holders interact directly, enabling community-driven decisions like feature priorities or updates. Platform Feedback: Token holders can voice their opinions on platform-wide improvements, ensuring the system reflects user needs." },
      { title: "Building a Developer-Gamer Ecosystem", content: "Future.fun bridges the gap between developers and gamers, creating a mutually beneficial ecosystem: For Developers: Token purchases provide funding and community engagement. For Gamers: Players access premium features while directly influencing the success of games they support. Shared Growth: As a game gains popularity, token value increases, benefiting both developers and early supporters. This dynamic ensures an equitable, engaging, and sustainable community-driven model for all participants." }
    ]
  },
  {
    title: "Getting Started",
    icon: <RocketIcon className="w-5 h-5" />,
    subsections: [
      { title: "For Gamers: Buying Tokens and Accessing Games", content: "Choose a Game: Explore the platform to find a game you want to play. Buy Tokens: Purchase the game’s tokens through an easy checkout process—no prior blockchain experience required. Start Playing: Use your tokens to unlock premium content and enjoy the game immediately." },
      { title: "For Developers: Creating Tokens and Sharing Games", content: "Create an Account: Sign up on Future.fun and access the developer dashboard. Submit Game and Token Info: Provide details about your game, including its description, visuals, and token branding. Wait for Approval: The Future.fun team reviews submissions to ensure quality and alignment with the platform’s standards. Launch Your Game: Once approved, your game and tokens go live, allowing players to support your project and access your content." },
      { title: "FAQs and Troubleshooting", content: "How long does approval take for developers? Approvals typically take a few days, depending on the volume of submissions and the complexity of your game. Can players buy tokens without a blockchain wallet? Yes! Future.fun integrates user-friendly tools for seamless purchases. What happens if my game is not approved? You’ll receive feedback to help you refine your submission and reapply. Where can I find support? Access the help center for step-by-step guides, FAQs, and assistance from the Future.fun team." }
    ]
  },
  {
    title: "Future Roadmap",
    icon: <Scale className="w-5 h-5" />,
    subsections: [
      { title: "Planned Features and Updates", content: "Enhanced Developer Tools: Simplified interfaces for token creation and game submission, along with analytics dashboards to track player engagement and token performance. Improved Player Experience: Features like personalized game recommendations, smoother onboarding, and expanded payment options for token purchases. Streaming Optimization: Further improvements to cloud rendering and AI pipelines for even faster, more reliable gameplay across devices." },
      { title: "Expanding the Ecosystem", content: "More Game Integrations: Support for additional game engines, ensuring compatibility with a wider range of developers. Broader Platform Access: Partnerships with content creators and gaming communities to bring more players and developers into the Future.fun ecosystem. Cross-Game Token Utility: Exploring ways to allow tokens from one game to unlock perks or features in others, fostering collaboration and interconnected gameplay experiences." },
      { title: "Long-Term Vision", content: "Future.fun aims to redefine how games and experiences are funded, played, and sustained: Empowering Indie Developers: Providing the tools and resources to create groundbreaking games without relying on traditional publishers. Global Accessibility: Ensuring players worldwide can access premium gaming experiences, regardless of hardware or technical expertise. Community-Driven Growth: Evolving the platform through feedback and contributions from gamers and developers alike, creating a truly collaborative ecosystem. By continuously innovating and expanding, Future.fun is set to become the cornerstone of Web3 gaming, bridging quality, accessibility, and community." }
    ]
  },
  {
    title: "Legal and Compliance",
    icon: <ScrollText className="w-5 h-5" />,
    subsections: [
      { title: "Transparency and Fairness", content: "Fair Token Launches: All tokens are launched without pre-sales or reserved allocations, ensuring equal access for all participants. Clear Fee Structure: Every transaction fee is transparently allocated to compute costs, developers, and platform operations, reinforcing trust within the ecosystem. Open Reporting: Future.fun provides clear documentation on token usage, distribution, and revenue sharing to maintain accountability." },
      { title: "Regional and International Compliance", content: "Regulatory Adherence: The platform actively complies with regional and international laws to ensure smooth operations and user safety. KYC/AML Compliance: Developers and certain user accounts may undergo identity verification to meet anti-money laundering (AML) and know-your-customer (KYC) requirements. Global Accessibility: Legal frameworks are continually reviewed to ensure the platform remains accessible across different jurisdictions." },
      { title: "Security Measures", content: "Blockchain Security: Tokens and transactions leverage Solana’s robust and secure blockchain infrastructure to protect against fraud and tampering. Data Protection: Player and developer data are securely stored and managed in line with global privacy standards, such as GDPR and CCPA. Continuous Audits: Regular system audits and smart contract evaluations are conducted to ensure platform integrity and security." }
    ]
  }
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState(sections[0].title);
  const [activeSubsection, setActiveSubsection] = useState(sections[0].subsections[0].title);

  const getActiveContent = () => {
    const section = sections.find(s => s.title === activeSection);
    if (!section) return "";
    const subsection = section.subsections.find(s => s.title === activeSubsection);
    return subsection?.content || "";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="sticky top-24 space-y-4">
              {sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <button
                    onClick={() => setActiveSection(section.title)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left font-semibold px-2 py-1.5 rounded-md transition-colors",
                      activeSection === section.title
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/5"
                    )}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                  {activeSection === section.title && (
                    <div className="ml-7 space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.title}
                          onClick={() => setActiveSubsection(subsection.title)}
                          className={cn(
                            "w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors",
                            activeSubsection === subsection.title
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/5"
                          )}
                        >
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <motion.div 
            className="flex-1 prose prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">{activeSubsection}</h1>
            <div className="text-muted-foreground">
              {getActiveContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
