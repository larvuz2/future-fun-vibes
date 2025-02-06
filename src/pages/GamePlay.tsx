import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function GamePlay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Game iframe */}
      <iframe
        src="https://share.arcware.cloud/share-f8fae897-f79a-43be-b1b5-bbc3e5542e81"
        className="w-full h-screen"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}