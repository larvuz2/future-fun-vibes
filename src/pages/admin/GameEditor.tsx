
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { WYSIWYGEditor } from "@/components/WYSIWYGEditor";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProfilePicture } from "@/components/ui/profile-picture";
import { Progress } from "@/components/ui/progress";

interface GameData {
  id?: string;
  game_name: string;
  studio_name: string;
  profile_picture_url: string;
  video_url: string;
  image_1_url?: string;
  image_2_url?: string;
  image_3_url?: string;
  image_4_url?: string;
}

interface GameFunding {
  funding_goal: number;
  current_funding: number;
  funding_end_date: string;
  website_url?: string;
  twitter_url?: string;
}

interface Milestone {
  id?: string;
  title: string;
  date: string;
  completed: boolean;
}

interface PollOption {
  id?: string;
  option_text: string;
  votes: number;
}

interface Poll {
  id?: string;
  question: string;
  options: PollOption[];
  active: boolean;
}

interface Update {
  id?: string;
  title: string;
  content: string;
  category: string;
}

export default function GameEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [gameData, setGameData] = useState<GameData>({
    game_name: "",
    studio_name: "",
    profile_picture_url: "",
    video_url: "",
  });

  const [funding, setFunding] = useState<GameFunding>({
    funding_goal: 0,
    current_funding: 0,
    funding_end_date: new Date().toISOString().split('T')[0],
  });

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    if (id) {
      loadGameData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadGameData = async () => {
    try {
      const { data: gameData, error: gameError } = await supabase
        .from("game_media")
        .select("*")
        .eq("id", id)
        .single();

      if (gameError) throw gameError;

      const { data: fundingData } = await supabase
        .from("game_funding")
        .select("*")
        .eq("game_id", id)
        .single();

      const { data: milestonesData } = await supabase
        .from("game_milestones")
        .select("*")
        .eq("game_id", id)
        .order("date", { ascending: true });

      const { data: pollsData } = await supabase
        .from("game_polls")
        .select(`
          *,
          poll_options(*)
        `)
        .eq("game_id", id);

      const { data: updatesData } = await supabase
        .from("game_updates")
        .select("*")
        .eq("game_id", id)
        .order("created_at", { ascending: false });

      setGameData(gameData);
      if (fundingData) setFunding(fundingData);
      if (milestonesData) setMilestones(milestonesData);
      if (pollsData) {
        setPolls(pollsData.map(poll => ({
          ...poll,
          options: poll.poll_options
        })));
      }
      if (updatesData) setUpdates(updatesData);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load game data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let gameId = id;

      // Create or update game media
      if (!gameId) {
        const { data: newGameData, error: gameError } = await supabase
          .from("game_media")
          .insert(gameData)
          .select()
          .single();

        if (gameError) throw gameError;
        gameId = newGameData.id;
      } else {
        const { error: gameError } = await supabase
          .from("game_media")
          .update(gameData)
          .eq("id", gameId);

        if (gameError) throw gameError;
      }

      // Update funding
      await supabase
        .from("game_funding")
        .upsert({
          ...funding,
          game_id: gameId
        });

      // Update milestones
      await supabase
        .from("game_milestones")
        .upsert(
          milestones.map(m => ({ ...m, game_id: gameId }))
        );

      // Update polls and options
      for (const poll of polls) {
        const { data: pollData, error: pollError } = await supabase
          .from("game_polls")
          .upsert({
            id: poll.id,
            game_id: gameId,
            question: poll.question,
            active: poll.active
          })
          .select()
          .single();

        if (pollError) throw pollError;

        await supabase
          .from("poll_options")
          .upsert(
            poll.options.map(opt => ({
              ...opt,
              poll_id: pollData.id
            }))
          );
      }

      // Update game updates
      await supabase
        .from("game_updates")
        .upsert(
          updates.map(u => ({ ...u, game_id: gameId }))
        );

      toast({
        title: "Success",
        description: "Game data saved successfully",
      });

      if (!id) {
        navigate(`/admin/games/${gameId}`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save game data",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, type: keyof GameData) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('game-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('game-media')
        .getPublicUrl(fileName);

      setGameData(prev => ({
        ...prev,
        [type]: publicUrl
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: "Failed to upload file",
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Basic Information */}
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="game_name">Game Name</Label>
            <Input
              id="game_name"
              value={gameData.game_name}
              onChange={(e) => setGameData(prev => ({ ...prev, game_name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studio_name">Studio Name</Label>
            <Input
              id="studio_name"
              value={gameData.studio_name}
              onChange={(e) => setGameData(prev => ({ ...prev, studio_name: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Media Uploads */}
          <div className="space-y-4">
            <div>
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <ProfilePicture
                  src={gameData.profile_picture_url}
                  alt={gameData.game_name}
                  size="lg"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'profile_picture_url');
                  }}
                />
              </div>
            </div>

            <div>
              <Label>Video URL</Label>
              <Input
                value={gameData.video_url}
                onChange={(e) => setGameData(prev => ({ ...prev, video_url: e.target.value }))}
                placeholder="Enter video URL"
              />
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-2">
                  <Label>Image {num}</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, `image_${num}_url` as keyof GameData);
                    }}
                  />
                  {gameData[`image_${num}_url` as keyof GameData] && (
                    <img
                      src={gameData[`image_${num}_url` as keyof GameData] as string}
                      alt={`Game image ${num}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Funding Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Funding Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="funding_goal">Funding Goal ($)</Label>
              <Input
                id="funding_goal"
                type="number"
                value={funding.funding_goal}
                onChange={(e) => setFunding(prev => ({ ...prev, funding_goal: Number(e.target.value) }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_funding">Current Funding ($)</Label>
              <Input
                id="current_funding"
                type="number"
                value={funding.current_funding}
                onChange={(e) => setFunding(prev => ({ ...prev, current_funding: Number(e.target.value) }))}
              />
              <Progress value={(funding.current_funding / funding.funding_goal) * 100} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_end_date">Funding End Date</Label>
              <Input
                id="funding_end_date"
                type="date"
                value={funding.funding_end_date}
                onChange={(e) => setFunding(prev => ({ ...prev, funding_end_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                value={funding.website_url || ''}
                onChange={(e) => setFunding(prev => ({ ...prev, website_url: e.target.value }))}
                placeholder="Enter website URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={funding.twitter_url || ''}
                onChange={(e) => setFunding(prev => ({ ...prev, twitter_url: e.target.value }))}
                placeholder="Enter Twitter URL"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Milestones */}
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Milestones</h2>
          <Button onClick={() => setMilestones([...milestones, { title: '', date: '', completed: false }])}>
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4 items-start">
              <Input
                value={milestone.title}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[index].title = e.target.value;
                  setMilestones(newMilestones);
                }}
                placeholder="Milestone title"
              />
              <Input
                type="date"
                value={milestone.date}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[index].date = e.target.value;
                  setMilestones(newMilestones);
                }}
              />
              <Input
                type="checkbox"
                checked={milestone.completed}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[index].completed = e.target.checked;
                  setMilestones(newMilestones);
                }}
                className="w-6 h-6"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newMilestones = [...milestones];
                  newMilestones.splice(index, 1);
                  setMilestones(newMilestones);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Feature Polls */}
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Feature Polls</h2>
          <Button onClick={() => setPolls([...polls, { question: '', options: [], active: true }])}>
            <Plus className="mr-2 h-4 w-4" />
            Add Poll
          </Button>
        </div>

        <div className="space-y-6">
          {polls.map((poll, pollIndex) => (
            <div key={pollIndex} className="space-y-4 border p-4 rounded-lg">
              <div className="flex gap-4 items-start">
                <Input
                  value={poll.question}
                  onChange={(e) => {
                    const newPolls = [...polls];
                    newPolls[pollIndex].question = e.target.value;
                    setPolls(newPolls);
                  }}
                  placeholder="Poll question"
                  className="flex-1"
                />
                <Input
                  type="checkbox"
                  checked={poll.active}
                  onChange={(e) => {
                    const newPolls = [...polls];
                    newPolls[pollIndex].active = e.target.checked;
                    setPolls(newPolls);
                  }}
                  className="w-6 h-6"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newPolls = [...polls];
                    newPolls.splice(pollIndex, 1);
                    setPolls(newPolls);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {poll.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-4 items-center">
                    <Input
                      value={option.option_text}
                      onChange={(e) => {
                        const newPolls = [...polls];
                        newPolls[pollIndex].options[optionIndex].option_text = e.target.value;
                        setPolls(newPolls);
                      }}
                      placeholder="Option text"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={option.votes}
                      onChange={(e) => {
                        const newPolls = [...polls];
                        newPolls[pollIndex].options[optionIndex].votes = Number(e.target.value);
                        setPolls(newPolls);
                      }}
                      className="w-24"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newPolls = [...polls];
                        newPolls[pollIndex].options.splice(optionIndex, 1);
                        setPolls(newPolls);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newPolls = [...polls];
                    newPolls[pollIndex].options.push({ option_text: '', votes: 0 });
                    setPolls(newPolls);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Updates */}
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Updates</h2>
          <Button onClick={() => setUpdates([...updates, { title: '', content: '', category: 'Development' }])}>
            <Plus className="mr-2 h-4 w-4" />
            Add Update
          </Button>
        </div>

        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-lg">
              <div className="flex gap-4">
                <Input
                  value={update.title}
                  onChange={(e) => {
                    const newUpdates = [...updates];
                    newUpdates[index].title = e.target.value;
                    setUpdates(newUpdates);
                  }}
                  placeholder="Update title"
                  className="flex-1"
                />
                <Input
                  value={update.category}
                  onChange={(e) => {
                    const newUpdates = [...updates];
                    newUpdates[index].category = e.target.value;
                    setUpdates(newUpdates);
                  }}
                  placeholder="Category"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newUpdates = [...updates];
                    newUpdates.splice(index, 1);
                    setUpdates(newUpdates);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <WYSIWYGEditor
                value={update.content}
                onChange={(content) => {
                  const newUpdates = [...updates];
                  newUpdates[index].content = content;
                  setUpdates(newUpdates);
                }}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
