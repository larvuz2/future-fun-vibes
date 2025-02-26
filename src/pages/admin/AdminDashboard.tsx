
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

interface GameListItem {
  id: string;
  game_name: string;
  studio_name: string;
  funding_goal?: number;
  current_funding?: number;
  funding_end_date?: string;
}

export default function AdminDashboard() {
  const [games, setGames] = useState<GameListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuth = async () => {
    try {
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
      if (!isAuthenticated || isAuthenticated !== 'true') {
        navigate("/admin", { replace: true });
        return false;
      }
      
      // Double-check with Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== "gus@metazooie.com") {
        localStorage.removeItem('isAdminAuthenticated');
        navigate("/admin", { replace: true });
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      navigate("/admin", { replace: true });
      return false;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const isAuthed = await checkAuth();
      if (isAuthed) {
        fetchGames();
      }
    };
    init();
  }, []);

  const fetchGames = async () => {
    try {
      const { data: gameData, error: gameError } = await supabase
        .from("game_media")
        .select(`
          id,
          game_name,
          studio_name,
          game_funding (
            funding_goal,
            current_funding,
            funding_end_date
          )
        `);

      if (gameError) throw gameError;

      setGames(gameData || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch games",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (isCheckingAuth) {
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
    <div className="container mx-auto p-8 animate-fade-in">
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-[60px]" /></TableCell>
                </TableRow>
              ))
            ) : (
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.game_name}</TableCell>
                  <TableCell>{game.studio_name}</TableCell>
                  <TableCell>${game.funding_goal?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>${game.current_funding?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>
                    {game.funding_end_date 
                      ? new Date(game.funding_end_date).toLocaleDateString() 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
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
