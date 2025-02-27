
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Minus, Check, X, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Poll {
  id: string;
  question: string;
  closes_at: string;
  active: boolean;
  options: PollOption[];
}

interface PollOption {
  id: string;
  option_text: string;
  votes: number;
}

// Define the shape of the raw poll data we get from Supabase
interface RawPollData {
  id: string;
  question: string;
  closes_at: string | null; // This might be null in the database
  active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  game_id: string | null;
}

interface PollsTabProps {
  gameId: string;
  gameName: string;
}

export default function PollsTab({ gameId, gameName }: PollsTabProps) {
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNewPollForm, setShowNewPollForm] = useState(false);
  
  // New poll form state
  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [newPollOptions, setNewPollOptions] = useState<string[]>(["", ""]);
  const [newPollClosingDate, setNewPollClosingDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 7 days from now
  );
  
  const fetchPolls = async () => {
    try {
      setLoading(true);
      
      // First fetch the polls
      const { data: pollsData, error: pollsError } = await supabase
        .from('game_polls')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });
      
      if (pollsError) throw pollsError;
      
      if (!pollsData || pollsData.length === 0) {
        setPolls([]);
        return;
      }
      
      // Then fetch options for each poll
      const pollsWithOptions = await Promise.all(
        pollsData.map(async (poll: RawPollData) => {
          const { data: optionsData, error: optionsError } = await supabase
            .from('poll_options')
            .select('*')
            .eq('poll_id', poll.id)
            .order('created_at', { ascending: true });
          
          if (optionsError) throw optionsError;
          
          // Transform the raw poll data to match our Poll interface
          const transformedPoll: Poll = {
            id: poll.id,
            question: poll.question,
            closes_at: poll.closes_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default if not set
            active: poll.active || false,
            options: optionsData?.map(option => ({
              id: option.id,
              option_text: option.option_text,
              votes: option.votes || 0
            })) || []
          };
          
          return transformedPoll;
        })
      );
      
      setPolls(pollsWithOptions);
    } catch (error: any) {
      console.error('Error fetching polls:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load polls. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (gameId) {
      fetchPolls();
    }
    
    // Subscribe to real-time updates
    const pollsChannel = supabase
      .channel('game-polls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_polls',
          filter: `game_id=eq.${gameId}`
        },
        () => fetchPolls()
      )
      .subscribe();
      
    const optionsChannel = supabase
      .channel('poll-options-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'poll_options'
        },
        () => fetchPolls()
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(pollsChannel);
      supabase.removeChannel(optionsChannel);
    };
  }, [gameId]);
  
  const handleAddOption = () => {
    setNewPollOptions([...newPollOptions, ""]);
  };
  
  const handleRemoveOption = (index: number) => {
    if (newPollOptions.length <= 2) {
      toast({
        title: "Error",
        description: "Polls must have at least two options",
        variant: "destructive"
      });
      return;
    }
    
    setNewPollOptions(newPollOptions.filter((_, i) => i !== index));
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newPollOptions];
    updatedOptions[index] = value;
    setNewPollOptions(updatedOptions);
  };
  
  const handleCreatePoll = async () => {
    // Validate inputs
    if (!newPollQuestion.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question for the poll",
        variant: "destructive"
      });
      return;
    }
    
    if (!newPollClosingDate) {
      toast({
        title: "Error",
        description: "Please select a closing date for the poll",
        variant: "destructive"
      });
      return;
    }
    
    // Make sure all options have text
    const validOptions = newPollOptions.filter(option => option.trim() !== "");
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Please enter at least two options for the poll",
        variant: "destructive"
      });
      return;
    }
    
    setCreating(true);
    try {
      // Insert the poll
      const { data: pollData, error: pollError } = await supabase
        .from('game_polls')
        .insert([{
          game_id: gameId,
          question: newPollQuestion,
          closes_at: newPollClosingDate.toISOString(),
          active: true
        }])
        .select()
        .single();
        
      if (pollError) throw pollError;
      
      // Insert the options
      const optionsToInsert = validOptions.map(option => ({
        poll_id: pollData.id,
        option_text: option,
        votes: 0
      }));
      
      const { error: optionsError } = await supabase
        .from('poll_options')
        .insert(optionsToInsert);
        
      if (optionsError) throw optionsError;
      
      toast({
        title: "Success",
        description: "Poll created successfully"
      });
      
      // Reset form
      setNewPollQuestion("");
      setNewPollOptions(["", ""]);
      setNewPollClosingDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      setShowNewPollForm(false);
      
      // Refresh polls
      fetchPolls();
    } catch (error: any) {
      console.error('Error creating poll:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create poll. Please try again."
      });
    } finally {
      setCreating(false);
    }
  };
  
  const handleTogglePollStatus = async (pollId: string, currentlyActive: boolean) => {
    try {
      const { error } = await supabase
        .from('game_polls')
        .update({ active: !currentlyActive })
        .eq('id', pollId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Poll ${currentlyActive ? 'deactivated' : 'activated'} successfully`
      });
      
      fetchPolls();
    } catch (error: any) {
      console.error('Error toggling poll status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update poll status"
      });
    }
  };
  
  const handleDeletePoll = async (pollId: string) => {
    if (!confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      return;
    }
    
    try {
      // Delete poll (cascade will remove options)
      const { error } = await supabase
        .from('game_polls')
        .delete()
        .eq('id', pollId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Poll deleted successfully"
      });
      
      fetchPolls();
    } catch (error: any) {
      console.error('Error deleting poll:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete poll"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Polls for {gameName}</CardTitle>
              <CardDescription>
                Create and manage polls for your community
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowNewPollForm(!showNewPollForm)}
              variant="outline"
            >
              {showNewPollForm ? "Cancel" : "Create New Poll"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showNewPollForm && (
            <Card className="mb-6 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">New Poll</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="poll_question">Poll Question</Label>
                  <Input
                    id="poll_question"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="What would you like to ask your community?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Closing Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newPollClosingDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newPollClosingDate ? (
                          format(newPollClosingDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newPollClosingDate}
                        onSelect={setNewPollClosingDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Poll Options</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={handleAddOption}>
                      <Plus className="h-4 w-4 mr-1" /> Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {newPollOptions.map((option, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleCreatePoll} disabled={creating}>
                  {creating ? "Creating..." : "Create Poll"}
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          ) : polls.length === 0 ? (
            <div className="text-center py-8">
              <List className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No polls yet</h3>
              <p className="text-muted-foreground">
                Create your first poll to engage with your community
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {polls.map((poll) => (
                <Card key={poll.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{poll.question}</CardTitle>
                        <CardDescription>
                          Closing: {format(new Date(poll.closes_at), "PPP")}
                          {new Date(poll.closes_at) < new Date() && " (Closed)"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePollStatus(poll.id, poll.active)}
                          title={poll.active ? "Deactivate poll" : "Activate poll"}
                        >
                          {poll.active ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePoll(poll.id)}
                          title="Delete poll"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${poll.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {poll.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {poll.options.map((option) => (
                        <div key={option.id} className="flex justify-between items-center">
                          <span>{option.option_text}</span>
                          <span className="text-sm font-medium">{option.votes} votes</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
