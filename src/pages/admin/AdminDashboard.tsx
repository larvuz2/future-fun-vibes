
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

const ADMIN_USER_ID = "b1101d11-a765-4706-84f0-683cf045f956";

interface GameFunding {
  funding_goal: number;
  current_funding: number;
  funding_end_date: string;
  website_url: string;
  twitter_url: string;
}

interface GameListItem {
  id: string;
  game_name: string;
  studio_name: string;
  game_funding?: GameFunding[];
}

export default function AdminDashboard() {
  const [games, setGames] = useState<GameListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchGames = async () => {
    try {
      // First check if user is admin
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user || user.id !== ADMIN_USER_ID) {
        navigate("/admin", { replace: true });
        return;
      }

      const { data: gameData, error: gameError } = await supabase
        .from("game_media")
        .select(`
          id,
          game_name,
          studio_name,
          game_funding (
            funding_goal,
            current_funding,
            funding_end_date,
            website_url,
            twitter_url
          )
        `)
        .order('game_name');

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

  const handleEdit = (gameId: string) => {
    navigate(`/admin/games/${gameId}`);
  };

  const handleAdd = () => {
    navigate("/admin/games/new");
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
          <Button onClick={handleAdd}>Add New Game</Button>
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
                  <TableCell className="font-medium">{game.game_name}</TableCell>
                  <TableCell>{game.studio_name}</TableCell>
                  <TableCell>
                    ${game.game_funding?.[0]?.funding_goal?.toLocaleString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    ${game.game_funding?.[0]?.current_funding?.toLocaleString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {game.game_funding?.[0]?.funding_end_date 
                      ? new Date(game.game_funding[0].funding_end_date).toLocaleDateString() 
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
