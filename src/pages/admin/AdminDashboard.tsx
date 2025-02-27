
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

const ADMIN_USER_ID = "b1101d11-a765-4706-84f0-683cf045f956";

interface Game {
  id: string;
  name: string;
  studio: {
    name: string;
  };
  funding?: {
    funding_goal: number;
    current_funding: number;
    funding_end_date: string;
  };
}

export default function AdminDashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGameName, setNewGameName] = useState("");
  const [newStudioName, setNewStudioName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchGames = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user || user.id !== ADMIN_USER_ID) {
        navigate("/admin", { replace: true });
        return;
      }

      const { data: gameData, error: gameError } = await supabase
        .from("games")
        .select(`
          id,
          name,
          studio:studio_id (
            name
          ),
          funding:game_funding (
            funding_goal,
            current_funding,
            funding_end_date
          )
        `)
        .order('name');

      if (gameError) {
        console.error('Error fetching games:', gameError);
        throw gameError;
      }

      console.log('Fetched games:', gameData);
      setGames(gameData || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch games. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

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

      // Then create the game
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .insert([{
          name: newGameName,
          studio_id: studioData.id
        }])
        .select()
        .single();

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

  const handleEdit = (gameId: string) => {
    navigate(`/admin/games/${gameId}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdminAuthenticated');
    navigate("/admin", { replace: true });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Game Management</h1>
        <div className="space-x-4">
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
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game Name</TableHead>
              <TableHead>Studio</TableHead>
              <TableHead>Funding Goal</TableHead>
              <TableHead>Current Funding</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No games found. Add your first game to get started.
                </TableCell>
              </TableRow>
            ) : (
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">{game.name}</TableCell>
                  <TableCell>{game.studio.name}</TableCell>
                  <TableCell>
                    ${game.funding?.funding_goal?.toLocaleString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    ${game.funding?.current_funding?.toLocaleString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {game.funding?.funding_end_date 
                      ? new Date(game.funding.funding_end_date).toLocaleDateString() 
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(game.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
