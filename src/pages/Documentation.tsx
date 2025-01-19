import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const Documentation = () => {
  const [selectedContent, setSelectedContent] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border">
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

        {/* Content Area */}
        <div className="flex-1 p-8">
          <ScrollArea className="h-[calc(100vh-theme(spacing.32))]">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <h1 className="text-4xl font-bold mb-8">Documentation</h1>
              {/* Content will be dynamically loaded based on selection */}
              <div className="space-y-6">
                <p>Select a topic from the sidebar to view its content.</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;