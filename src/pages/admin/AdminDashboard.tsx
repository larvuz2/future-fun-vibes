
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Game {
  id: string;
  name: string;
  slug: string;
  studio: {
    name: string;
  };
  is_visible: boolean;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGameName, setNewGameName] = useState("");
  const [newStudioName, setNewStudioName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from('games')
      .select(`
        id,
        name,
        slug,
        is_visible,
        studio:studio_id (
          name
        )
      `);

    if (error) {
      console.error('Error fetching games:', error);
      return;
    }

    setGames(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  const handleCreateGame = async () => {
    if (!newGameName || !newStudioName) {
      toast({
        title: "Error",
        description: "Please fill in both game name and studio name",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      // First create the studio
      const { data: studioData, error: studioError } = await supabase
        .from('studios')
        .insert([{ name: newStudioName }])
        .select()
        .single();

      if (studioError) throw studioError;

      // Then create the game with the studio ID
      const { error: gameError } = await supabase
        .from('games')
        .insert([{
          name: newGameName,
          slug: generateSlug(newGameName),
          studio_id: studioData.id,
          is_visible: true
        }]);

      if (gameError) throw gameError;

      toast({
        title: "Success",
        description: "Game created successfully"
      });

      // Reset form and close dialog
      setNewGameName("");
      setNewStudioName("");
      setDialogOpen(false);
      
      // Refresh the games list
      fetchGames();
    } catch (error: any) {
      console.error('Error creating game:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create game",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Game Management</h1>
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button>Add New Game</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Game</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="gameName">Game Name</Label>
                <Input
                  id="gameName"
                  value={newGameName}
                  onChange={(e) => setNewGameName(e.target.value)}
                  placeholder="Enter game name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studioName">Studio Name</Label>
                <Input
                  id="studioName"
                  value={newStudioName}
                  onChange={(e) => setNewStudioName(e.target.value)}
                  placeholder="Enter studio name"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGame}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Game"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h2 className="font-semibold">{game.name}</h2>
              <p className="text-sm text-muted-foreground">{game.studio?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${game.is_visible ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {game.is_visible ? 'Visible' : 'Hidden'}
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/games/${game.id}`)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
