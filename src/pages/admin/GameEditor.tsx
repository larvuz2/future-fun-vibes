
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface GameData {
  id: string;
  name: string;
  studio: {
    id: string;
    name: string;
    website_url?: string;
    twitter_url?: string;
  };
  media: {
    profile_picture_url: string;
    media_1_url: string;
    media_2_url: string | null;
    media_3_url: string | null;
    media_4_url: string | null;
    media_5_url: string | null;
  };
  funding?: {
    funding_goal: number;
    current_funding: number;
    funding_end_date: string;
  };
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
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select(`
            id,
            name,
            studio:studio_id (
              id,
              name,
              website_url,
              twitter_url
            ),
            media:game_media (
              profile_picture_url,
              media_1_url,
              media_2_url,
              media_3_url,
              media_4_url,
              media_5_url
            ),
            funding:game_funding (
              funding_goal,
              current_funding,
              funding_end_date
            )
          `)
          .eq('id', id)
          .single();

        if (gameError) throw gameError;

        if (gameData) {
          console.log('Fetched game data:', gameData);
          setGameData(gameData);
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
      // Update game name
      const { error: gameError } = await supabase
        .from('games')
        .update({
          name: gameData.name
        })
        .eq('id', id);

      if (gameError) throw gameError;

      // Update studio
      const { error: studioError } = await supabase
        .from('studios')
        .update({
          name: gameData.studio.name,
          website_url: gameData.studio.website_url,
          twitter_url: gameData.studio.twitter_url
        })
        .eq('id', gameData.studio.id);

      if (studioError) throw studioError;

      // Update media
      const { error: mediaError } = await supabase
        .from('game_media')
        .update({
          profile_picture_url: gameData.media.profile_picture_url,
          media_1_url: gameData.media.media_1_url,
          media_2_url: gameData.media.media_2_url,
          media_3_url: gameData.media.media_3_url,
          media_4_url: gameData.media.media_4_url,
          media_5_url: gameData.media.media_5_url
        })
        .eq('game_id', id);

      if (mediaError) throw mediaError;

      // Update or create funding
      if (gameData.funding) {
        const { error: fundingError } = await supabase
          .from('game_funding')
          .upsert({
            game_id: id,
            funding_goal: Number(gameData.funding.funding_goal),
            current_funding: Number(gameData.funding.current_funding),
            funding_end_date: gameData.funding.funding_end_date,
          });

        if (fundingError) throw fundingError;
      }

      toast({
        title: "Success",
        description: "Game updated successfully"
      });

      navigate('/admin/dashboard');
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

  const handleInputChange = (path: string, value: string | number) => {
    if (!gameData) return;
    
    setGameData(prev => {
      if (!prev) return prev;
      
      const newData = { ...prev };
      const parts = path.split('.');
      
      let current: any = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      
      return newData;
    });
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
                value={gameData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studio_name">Studio Name</Label>
              <Input
                id="studio_name"
                value={gameData.studio.name}
                onChange={(e) => handleInputChange('studio.name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_goal">Funding Goal</Label>
              <Input
                id="funding_goal"
                type="number"
                value={gameData.funding?.funding_goal || ''}
                onChange={(e) => handleInputChange('funding.funding_goal', Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_funding">Current Funding</Label>
              <Input
                id="current_funding"
                type="number"
                value={gameData.funding?.current_funding || ''}
                onChange={(e) => handleInputChange('funding.current_funding', Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_picture_url">Profile Picture URL</Label>
              <Input
                id="profile_picture_url"
                value={gameData.media.profile_picture_url}
                onChange={(e) => handleInputChange('media.profile_picture_url', e.target.value)}
                required
              />
            </div>

            {[1, 2, 3, 4, 5].map((num) => {
              const key = `media_${num}_url` as keyof typeof gameData.media;
              return (
                <div key={num} className="space-y-2">
                  <Label htmlFor={key}>
                    Media {num} URL
                    {num === 1 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        (Primary - shown in card)
                      </span>
                    )}
                  </Label>
                  <Input
                    id={key}
                    value={gameData.media[key] || ''}
                    onChange={(e) => handleInputChange(`media.${key}`, e.target.value)}
                    required={num === 1}
                  />
                </div>
              );
            })}

            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                value={gameData.studio.website_url || ''}
                onChange={(e) => handleInputChange('studio.website_url', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={gameData.studio.twitter_url || ''}
                onChange={(e) => handleInputChange('studio.twitter_url', e.target.value)}
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
