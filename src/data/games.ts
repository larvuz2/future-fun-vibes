
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

const BASE_URL = "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//";

export const GAMES: Game[] = [
  {
    id: "1",
    game_name: "Drillhorn",
    studio_name: "Quantum Forge Interactive",
    video_url: BASE_URL + "BULLDOZER.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drillhorn",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    game_name: "Skyfang",
    studio_name: "Nebula Pulse Games",
    video_url: BASE_URL + "DRAGON.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=skyfang",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    game_name: "Big Hairy Snowman",
    studio_name: "Prismatic Ventures",
    video_url: BASE_URL + "HAIRY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=snowman",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    game_name: "Meme Legends",
    studio_name: "Metazooie Studios",
    video_url: BASE_URL + "MEME.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=meme",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    game_name: "Fluid Simulation Puzzles",
    studio_name: "Helios Dynamic",
    video_url: BASE_URL + "FLUID.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fluid",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "6",
    game_name: "Forest Drone",
    studio_name: "Vertex Horizon",
    video_url: BASE_URL + "DRONE.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drone",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "7",
    game_name: "Shenlong",
    studio_name: "Eclipse Syndicate",
    video_url: BASE_URL + "DRAGONSTYLE.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=shenlong",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "8",
    game_name: "Subway Chase",
    studio_name: "Apogee Dynamics",
    video_url: BASE_URL + "SUBWAY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=subway",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "9",
    game_name: "Galleon Wars",
    studio_name: "Luminary Nexus",
    video_url: BASE_URL + "SHIP.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=galleon",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "10",
    game_name: "HyperRail",
    studio_name: "Nova Fragment",
    video_url: BASE_URL + "SCIFITRAIN.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=hyperrail",
    image_1_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
