import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Documentation = () => {
  const [selectedContent, setSelectedContent] = useState("what-is");

  const contentMap: { [key: string]: { title: string; content: string } } = {
    // Overview section
    "what-is": {
      title: "What is Future.fun?",
      content: `Future.fun is a community-driven crowdfunding platform that connects gamers and developers through blockchain-based, premium browser gaming. By combining Unreal Engine visuals, real-time diffusion pipelines, and token-gated access, Future.fun provides developers with a seamless way to fund their projects while offering players high-quality gaming experiences.`
    },
    "how-it-works": {
      title: "How It Works",
      content: `Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content.
      Transparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants.
      Player Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features.`
    },
    "why-choose": {
      title: "Why Choose Future.fun?",
      content: `Simplicity: A straightforward token-gated model that connects developers with their community.
      Transparency: Fair token launches and clear fee structures foster trust and equity.
      High-Quality Gaming: Compute-intensive games with cutting-edge visuals are accessible even on mid-range devices.
      Empowered Development: Indie developers gain funding tools and incentives to innovate and engage their audience.
      Sustainable Ecosystem: A balanced revenue model ensures developers, players, and the platform thrive.`
    },
    // For Gamers section
    "unlocking": {
      title: "Unlocking Premium Experiences",
      content: `Players buy a game's token to access its premium content. These tokens act as the gateway to exclusive gameplay features, creating a direct and simple connection between players and the game.`
    },
    "supporting": {
      title: "Supporting Developers",
      content: `When players purchase tokens, they directly fund the game's development. This creates a transparent and meaningful way to support indie developers while enjoying the game.`
    },
    "gaming": {
      title: "Gaming on Any Device",
      content: `Future.fun's streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient.`
    },
    "rewards": {
      title: "Rewards and Token Benefits",
      content: `Future.fun's streaming technology ensures players can enjoy high-quality, compute-intensive games on any device, including smartphones. The token system keeps access seamless and efficient.`
    },
    // For Developers section
    "who-should": {
      title: "Who Should Use Future.fun?",
      content: `Future.fun is ideal for developers creating high-quality, compute-intensive games using engines like Unreal Engine, Unity or compute-intensive diffusion pipelines. Whether you're an indie studio or an established creator, the platform simplifies funding and engagement for visually rich, immersive gaming experiences.`
    },
    "token-creation": {
      title: "Token Creation Made Simple",
      content: `Developers can easily mint tokens tied to their games through an intuitive interface. Each token is unique to the game, offering branding, ticker customization, and immediate utility as a gateway to premium features.`
    },
    "distributing": {
      title: "Distributing Game Prototypes",
      content: `Future.fun allows developers to release early prototypes or pilot versions of their games, token-gated to attract early adopters. This enables developers to gather community feedback, refine gameplay, and build momentum before a full release.`
    },
    "earning": {
      title: "Earning and Sustaining",
      content: `Every token purchase directly funds your game, providing immediate revenue to support development. As your game attracts more players, the demand for its tokens increases, ensuring sustained growth and financial viability. This dynamic rewards developers who focus on quality and engagement.`
    },
    // Tokenomics section
    "how-tokens": {
      title: "How Tokens Work",
      content: `Tokens are minted for each game and act as access keys to unlock premium content. Players buy these tokens to experience advanced game features, directly funding the game's development. The token price follows a bonding curve—a dynamic pricing model where the price increases as more tokens are purchased. This rewards early supporters and ties token value to the game's popularity and demand.`
    },
    "fair-launch": {
      title: "Fair Launch Model",
      content: `Each game token follows a fair launch principle, ensuring equal access to everyone:
      No Pre-Sales or Reserves: All tokens are available publicly from the start, without allocations for developers or insiders.
      Bonding Curve Dynamics: Prices start low and rise as demand grows, similar to the models seen in Pump.fun and Indie.fun.
      Immediate Gameplay Utility: Tokens grant instant access to premium game features, aligning their value with real usage and player engagement.
      This approach creates a level playing field, rewards quality, and builds trust within the community.`
    },
    "fee-structure": {
      title: "Fee Structure",
      content: `A transaction fee (4.5%) is applied to all token transactions, distributed as follows:
      30% to Compute Costs: Covers the infrastructure needed for streaming and high-quality rendering.
      30% to Developers: Supports ongoing game development and content updates.
      20% to Platform Operations: Ensures the platform remains robust and user-friendly.
      20% to Community Engagement: Supports initiatives that enhance player and developer experiences.`
    },
    "incentives": {
      title: "Incentives",
      content: `For Gamers: Tokens unlock premium experiences, offering direct value for their support.
      For Developers: Developers earn revenue with every token transaction tied to their game, enabling sustainable development.`
    },
    "solana": {
      title: "Solana Integration",
      content: `Future.fun leverages the Solana blockchain for its token infrastructure, ensuring:
      Fast Transactions: Near-instant token transfers, providing a seamless gaming experience.
      Low Fees: Affordable costs make it accessible for both gamers and developers, enhancing scalability and adoption.`
    },
    // Technology section
    "streaming": {
      title: "Advanced Streaming",
      content: `Future.fun utilizes state-of-the-art streaming technology combined with AI-driven pipelines to deliver high-quality, immersive gaming experiences. This ensures smooth gameplay, advanced visuals, and real-time rendering, powered entirely in the cloud.`
    },
    "compute": {
      title: "Compute-Intensive Features",
      content: `Players can enjoy visually rich, compute-intensive games without needing high-end hardware. The platform processes and streams gameplay from its robust cloud infrastructure, making premium gaming accessible on smartphones, tablets, and other devices.`
    },
    "quality": {
      title: "High-Quality Gaming",
      content: `Future.fun's technology offloads demanding compute tasks to the cloud, reducing the burden on players' devices. By combining efficient streaming with Unreal Engine and Unity support, the platform delivers a seamless, high-quality experience regardless of device capabilities.`
    },
    // Community section
    "token-holders": {
      title: "Role of Token Holders",
      content: `Token holders play a vital role in the Future.fun ecosystem. By purchasing and holding game tokens, they:
      Gain access to premium content and advanced features.
      Directly support game development and reward developers for their efforts.
      Contribute to a game's growth by creating demand for its tokens.`
    },
    "governance": {
      title: "Governance",
      content: `Future.fun fosters a collaborative environment where the community can shape the platform's future:
      Game-Specific Input: Developers and token holders interact directly, enabling community-driven decisions like feature priorities or updates.
      Platform Feedback: Token holders can voice their opinions on platform-wide improvements, ensuring the system reflects user needs.`
    },
    "ecosystem": {
      title: "Developer-Gamer Ecosystem",
      content: `Future.fun bridges the gap between developers and gamers, creating a mutually beneficial ecosystem:
      For Developers: Token purchases provide funding and community engagement.
      For Gamers: Players access premium features while directly influencing the success of games they support.
      Shared Growth: As a game gains popularity, token value increases, benefiting both developers and early supporters.`
    },
    // Getting Started section
    "for-gamers": {
      title: "For Gamers",
      content: `Choose a Game: Explore the platform to find a game you want to play.
      Buy Tokens: Purchase the game's tokens through an easy checkout process—no prior blockchain experience required.
      Start Playing: Use your tokens to unlock premium content and enjoy the game immediately.`
    },
    "for-devs": {
      title: "For Developers",
      content: `Create an Account: Sign up on Future.fun and access the developer dashboard.
      Submit Game and Token Info: Provide details about your game, including its description, visuals, and token branding.
      Wait for Approval: The Future.fun team reviews submissions to ensure quality and alignment with the platform's standards.
      Launch Your Game: Once approved, your game and tokens go live, allowing players to support your project and access your content.`
    },
    "faqs": {
      title: "FAQs and Troubleshooting",
      content: `How long does approval take for developers? Approvals typically take a few days, depending on the volume of submissions and the complexity of your game.
      Can players buy tokens without a blockchain wallet? Yes! Future.fun integrates user-friendly tools for seamless purchases.
      What happens if my game is not approved? You'll receive feedback to help you refine your submission and reapply.
      Where can I find support? Access the help center for step-by-step guides, FAQs, and assistance from the Future.fun team.`
    },
    // Future Roadmap section
    "planned": {
      title: "Planned Features",
      content: `Enhanced Developer Tools: Simplified interfaces for token creation and game submission, along with analytics dashboards to track player engagement and token performance.
      Improved Player Experience: Features like personalized game recommendations, smoother onboarding, and expanded payment options for token purchases.
      Streaming Optimization: Further improvements to cloud rendering and AI pipelines for even faster, more reliable gameplay across devices.`
    },
    "expanding": {
      title: "Expanding Ecosystem",
      content: `More Game Integrations: Support for additional game engines, ensuring compatibility with a wider range of developers.
      Broader Platform Access: Partnerships with content creators and gaming communities to bring more players and developers into the Future.fun ecosystem.
      Cross-Game Token Utility: Exploring ways to allow tokens from one game to unlock perks or features in others, fostering collaboration and interconnected gameplay experiences.`
    },
    "vision": {
      title: "Long-Term Vision",
      content: `Future.fun aims to redefine how games and experiences are funded, played, and sustained:
      Empowering Indie Developers: Providing the tools and resources to create groundbreaking games without relying on traditional publishers.
      Global Accessibility: Ensuring players worldwide can access premium gaming experiences, regardless of hardware or technical expertise.
      Community-Driven Growth: Evolving the platform through feedback and contributions from gamers and developers alike, creating a truly collaborative ecosystem.`
    },
    // Legal and Compliance section
    "transparency": {
      title: "Transparency",
      content: `Fair Token Launches: All tokens are launched without pre-sales or reserved allocations, ensuring equal access for all participants.
      Clear Fee Structure: Every transaction fee is transparently allocated to compute costs, developers, and platform operations, reinforcing trust within the ecosystem.
      Open Reporting: Future.fun provides clear documentation on token usage, distribution, and revenue sharing to maintain accountability.`
    },
    "regional": {
      title: "Regional Compliance",
      content: `Regulatory Adherence: The platform actively complies with regional and international laws to ensure smooth operations and user safety.
      KYC/AML Compliance: Developers and certain user accounts may undergo identity verification to meet anti-money laundering (AML) and know-your-customer (KYC) requirements.
      Global Accessibility: Legal frameworks are continually reviewed to ensure the platform remains accessible across different jurisdictions.`
    },
    "security": {
      title: "Security Measures",
      content: `Blockchain Security: Tokens and transactions leverage Solana's robust and secure blockchain infrastructure to protect against fraud and tampering.
      Data Protection: Player and developer data are securely stored and managed in line with global privacy standards, such as GDPR and CCPA.
      Continuous Audits: Regular system audits and smart contract evaluations are conducted to ensure platform integrity and security.`
    }
  };

  const FileTree = () => (
    <Tree
      className="p-4"
      initialExpandedItems={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
    >
      <Folder element="Overview" value="1">
        <File value="what-is">What is Future.fun?</File>
        <File value="how-it-works">How It Works</File>
        <File value="why-choose">Why Choose Future.fun?</File>
      </Folder>
      <Folder element="For Gamers" value="2">
        <File value="unlocking">Unlocking Premium Experiences</File>
        <File value="supporting">Supporting Developers</File>
        <File value="gaming">Gaming on Any Device</File>
        <File value="rewards">Rewards and Token Benefits</File>
      </Folder>
      <Folder element="For Developers" value="3">
        <File value="who-should">Who Should Use Future.fun?</File>
        <File value="token-creation">Token Creation Made Simple</File>
        <File value="distributing">Distributing Game Prototypes</File>
        <File value="earning">Earning and Sustaining</File>
      </Folder>
      <Folder element="Tokenomics" value="4">
        <File value="how-tokens">How Tokens Work</File>
        <File value="fair-launch">Fair Launch Model</File>
        <File value="fee-structure">Fee Structure</File>
        <File value="incentives">Incentives</File>
        <File value="solana">Solana Integration</File>
      </Folder>
      <Folder element="Technology" value="5">
        <File value="streaming">Advanced Streaming</File>
        <File value="compute">Compute-Intensive Features</File>
        <File value="quality">High-Quality Gaming</File>
      </Folder>
      <Folder element="Community" value="6">
        <File value="token-holders">Role of Token Holders</File>
        <File value="governance">Governance</File>
        <File value="ecosystem">Developer-Gamer Ecosystem</File>
      </Folder>
      <Folder element="Getting Started" value="7">
        <File value="for-gamers">For Gamers</File>
        <File value="for-devs">For Developers</File>
        <File value="faqs">FAQs and Troubleshooting</File>
      </Folder>
      <Folder element="Future Roadmap" value="8">
        <File value="planned">Planned Features</File>
        <File value="expanding">Expanding Ecosystem</File>
        <File value="vision">Long-Term Vision</File>
      </Folder>
      <Folder element="Legal and Compliance" value="9">
        <File value="transparency">Transparency</File>
        <File value="regional">Regional Compliance</File>
        <File value="security">Security Measures</File>
      </Folder>
    </Tree>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Mobile Menu - Now outside the card */}
          <div className="md:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mb-4">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <FileTree />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full glass rounded-lg p-6">
            <div className="flex gap-6">
              {/* Desktop File Tree */}
              <div className="hidden md:block w-1/3">
                <FileTree />
              </div>

              {/* Vertical Separator - Desktop Only */}
              <div className="hidden md:block">
                <Separator orientation="vertical" className="h-auto" />
              </div>

              {/* Content Area */}
              <div className="flex-1">
                <ScrollArea className="h-[calc(100vh-theme(spacing.64))]">
                  <div className="max-w-3xl mx-auto prose prose-invert">
                    <div className="space-y-6">
                      {contentMap[selectedContent] ? (
                        <>
                          <h1 className="text-4xl font-bold mb-6">
                            {contentMap[selectedContent].title}
                          </h1>
                          <p className="whitespace-pre-line">
                            {contentMap[selectedContent].content}
                          </p>
                        </>
                      ) : (
                        <p>Select a topic from the documentation tree to view its content.</p>
                      )}
                    </div>
                  </div>
                </ScrollArea>
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
