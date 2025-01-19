import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const Documentation = () => {
  const [selectedContent, setSelectedContent] = useState("overview");

  const contentMap: { [key: string]: string } = {
    "what-is": `Future.fun is a community-driven crowdfunding platform that connects gamers and developers through blockchain-based, premium browser gaming. By combining Unreal Engine visuals, real-time diffusion pipelines, and token-gated access, Future.fun provides developers with a seamless way to fund their projects while offering players high-quality gaming experiences.`,
    "how-it-works": `Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content.
    Transparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants.
    Player Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features.`,
    "why-choose": `Simplicity: A straightforward token-gated model that connects developers with their community.
    Transparency: Fair token launches and clear fee structures foster trust and equity.
    High-Quality Gaming: Compute-intensive games with cutting-edge visuals are accessible even on mid-range devices.
    Empowered Development: Indie developers gain funding tools and incentives to innovate and engage their audience.
    Sustainable Ecosystem: A balanced revenue model ensures developers, players, and the platform thrive.`,
    // ... Add all other content mappings here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full glass rounded-lg p-6">
            <div className="flex gap-6">
              {/* Documentation Tree */}
              <div className="w-1/3">
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
              </div>

              {/* Vertical Separator */}
              <Separator orientation="vertical" className="h-auto" />

              {/* Content Area */}
              <div className="flex-1">
                <ScrollArea className="h-[calc(100vh-theme(spacing.64))]">
                  <div className="max-w-3xl mx-auto prose prose-invert">
                    <div className="space-y-6">
                      {contentMap[selectedContent] ? (
                        <p className="whitespace-pre-line">{contentMap[selectedContent]}</p>
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