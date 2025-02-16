
export interface Game {
  id: string;
  game_name: string;
  studio_name: string;
  video_url: string;
  profile_picture_url: string;
  image_1_url: string;
  created_at: string;
  updated_at: string;
}

export const GAMES: Game[] = [
  {
    id: "1",
    game_name: "Drillhorn",
    studio_name: "Future Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Bulldozer.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drillhorn",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    game_name: "Skyfang",
    studio_name: "Dragon Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//DRAGON.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=skyfang",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    game_name: "Big Hairy Snowman",
    studio_name: "Snow Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//HAIRY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=snowman",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    game_name: "Meme Legends",
    studio_name: "Meme Factory",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//MEME.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=meme",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    game_name: "Fluid Simulation Puzzles",
    studio_name: "Physics Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//FLUID.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fluid",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "6",
    game_name: "Forest Drone",
    studio_name: "Drone Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Drone%20and%20Basic%20Controller%20-%20Unreal%20Engine%20(1).mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drone",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "7",
    game_name: "Shenlong",
    studio_name: "Dragon Masters",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Dragon%20Spear%20Attacks%20(online-video-cutter.com).mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=shenlong",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "8",
    game_name: "Subway Chase",
    studio_name: "Urban Games",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Subway%20Surfers%20But%20in%20Unreal%20Engine%205%20(online-video-cutter.com).mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=subway",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "9",
    game_name: "Galleon Wars",
    studio_name: "Ocean Studios",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//Ship.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=galleon",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "10",
    game_name: "HyperRail",
    studio_name: "Future Transport",
    video_url: "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//SciFi%20Train.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=hyperrail",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
