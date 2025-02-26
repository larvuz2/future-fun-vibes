
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WYSIWYGEditor } from "@/components/WYSIWYGEditor";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface GameData {
  game_name: string;
  studio_name: string;
  profile_picture_url: string;
  video_url: string;
  image_1_url: string | null;
  image_2_url: string | null;
  image_3_url: string | null;
  image_4_url: string | null;
}

export default function GameEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const { data, error } = await supabase
          .from('game_media')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setGameData(data);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Game not found"
          });
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching game:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load game data"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id, navigate, toast]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameData) return;

    try {
      const { error } = await supabase
        .from('game_media')
        .update(gameData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Game updated successfully"
      });
    } catch (error) {
      console.error('Error updating game:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update game"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Game not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Game</h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="game_name">Game Name</Label>
              <Input
                id="game_name"
                value={gameData.game_name}
                onChange={(e) => setGameData({ ...gameData, game_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="studio_name">Studio Name</Label>
              <Input
                id="studio_name"
                value={gameData.studio_name}
                onChange={(e) => setGameData({ ...gameData, studio_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="profile_picture_url">Profile Picture URL</Label>
              <Input
                id="profile_picture_url"
                value={gameData.profile_picture_url}
                onChange={(e) => setGameData({ ...gameData, profile_picture_url: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                id="video_url"
                value={gameData.video_url}
                onChange={(e) => setGameData({ ...gameData, video_url: e.target.value })}
                required
              />
            </div>

            {/* Additional Image URLs */}
            {[1, 2, 3, 4].map((num) => (
              <div key={num}>
                <Label htmlFor={`image_${num}_url`}>Image {num} URL</Label>
                <Input
                  id={`image_${num}_url`}
                  value={gameData[`image_${num}_url` as keyof GameData] || ''}
                  onChange={(e) => setGameData({ 
                    ...gameData, 
                    [`image_${num}_url`]: e.target.value 
                  })}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save Changes</Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
