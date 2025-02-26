
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface GameData {
  id: string;
  game_name: string;
  studio_name: string;
  profile_picture_url: string;
  video_url: string;
  image_1_url: string | null;
  image_2_url: string | null;
  image_3_url: string | null;
  image_4_url: string | null;
  game_funding?: {
    funding_goal: number;
    current_funding: number;
    funding_end_date: string;
    website_url?: string;
    twitter_url?: string;
  }[];
}

export default function GameEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const { data, error } = await supabase
          .from('game_media')
          .select(`
            *,
            game_funding (*)
          `)
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

    if (id) {
      fetchGameData();
    }
  }, [id, navigate, toast]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameData) return;

    setSaving(true);
    try {
      const { error: gameError } = await supabase
        .from('game_media')
        .update({
          game_name: gameData.game_name,
          studio_name: gameData.studio_name,
          profile_picture_url: gameData.profile_picture_url,
          video_url: gameData.video_url,
          image_1_url: gameData.image_1_url,
          image_2_url: gameData.image_2_url,
          image_3_url: gameData.image_3_url,
          image_4_url: gameData.image_4_url,
        })
        .eq('id', id);

      if (gameError) throw gameError;

      if (gameData.game_funding?.[0]) {
        const { error: fundingError } = await supabase
          .from('game_funding')
          .upsert({
            game_id: id,
            funding_goal: gameData.game_funding[0].funding_goal,
            current_funding: gameData.game_funding[0].current_funding,
            funding_end_date: gameData.game_funding[0].funding_end_date,
            website_url: gameData.game_funding[0].website_url,
            twitter_url: gameData.game_funding[0].twitter_url,
          });

        if (fundingError) throw fundingError;
      }

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
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-[600px] bg-muted rounded"></div>
        </div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Game</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
      
      <Card className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="game_name">Game Name</Label>
              <Input
                id="game_name"
                value={gameData.game_name}
                onChange={(e) => setGameData({ ...gameData, game_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studio_name">Studio Name</Label>
              <Input
                id="studio_name"
                value={gameData.studio_name}
                onChange={(e) => setGameData({ ...gameData, studio_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_goal">Funding Goal</Label>
              <Input
                id="funding_goal"
                type="number"
                value={gameData.game_funding?.[0]?.funding_goal || ''}
                onChange={(e) => setGameData({
                  ...gameData,
                  game_funding: [{
                    ...gameData.game_funding?.[0],
                    funding_goal: Number(e.target.value)
                  }]
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_funding">Current Funding</Label>
              <Input
                id="current_funding"
                type="number"
                value={gameData.game_funding?.[0]?.current_funding || ''}
                onChange={(e) => setGameData({
                  ...gameData,
                  game_funding: [{
                    ...gameData.game_funding?.[0],
                    current_funding: Number(e.target.value)
                  }]
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_picture_url">Profile Picture URL</Label>
              <Input
                id="profile_picture_url"
                value={gameData.profile_picture_url}
                onChange={(e) => setGameData({ ...gameData, profile_picture_url: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                id="video_url"
                value={gameData.video_url}
                onChange={(e) => setGameData({ ...gameData, video_url: e.target.value })}
                required
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                value={gameData.game_funding?.[0]?.website_url || ''}
                onChange={(e) => setGameData({
                  ...gameData,
                  game_funding: [{
                    ...gameData.game_funding?.[0],
                    website_url: e.target.value
                  }]
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={gameData.game_funding?.[0]?.twitter_url || ''}
                onChange={(e) => setGameData({
                  ...gameData,
                  game_funding: [{
                    ...gameData.game_funding?.[0],
                    twitter_url: e.target.value
                  }]
                })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
