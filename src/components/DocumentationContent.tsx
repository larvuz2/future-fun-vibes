import { FC } from "react";

interface DocumentationContentProps {
  currentSection: string;
}

const content: Record<string, { title: string; content: string }> = {
  "overview": {
    title: "Overview",
    content: `Future.fun is a community-driven crowdfunding platform that connects gamers and developers through blockchain-based, premium browser gaming. By combining Unreal Engine visuals, real-time diffusion pipelines, and token-gated access, Future.fun provides developers with a seamless way to fund their projects while offering players high-quality gaming experiences.

Token Creation and Launch: Developers mint unique tokens tied to their games. These tokens serve as both funding tools and access keys to premium content.

Transparent Crowdfunding: Tokens are available through fair launches, with no pre-sales or reserved allocations, ensuring equal access for all participants.

Player Access: Players gain immediate access to premium game features by purchasing tokens, which are linked to gameplay utility and advanced features.

Why Choose Future.fun?
- Simplicity: A straightforward token-gated model that connects developers with their community.
- Transparency: Fair token launches and clear fee structures foster trust and equity.
- High-Quality Gaming: Compute-intensive games with cutting-edge visuals are accessible even on mid-range devices.
- Empowered Development: Indie developers gain funding tools and incentives to innovate and engage their audience.
- Sustainable Ecosystem: A balanced revenue model ensures developers, players, and the platform thrive.`
  },
  // ... Add all other sections content here
};

const DocumentationContent: FC<DocumentationContentProps> = ({ currentSection }) => {
  const sectionContent = content[currentSection] || content["overview"];

  return (
    <article className="prose prose-gray max-w-none dark:prose-invert">
      <h1 className="mb-4">{sectionContent.title}</h1>
      <div className="whitespace-pre-wrap">{sectionContent.content}</div>
    </article>
  );
};

export default DocumentationContent;