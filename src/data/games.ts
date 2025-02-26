
export interface Game {
  id: string;
  game_name: string;
  studio_name: string;
  video_url: string;
  profile_picture_url: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  image_4_url: string;
  created_at: string;
  updated_at: string;
}

const BASE_URL = "https://vbcltontvlbnaawiqegc.supabase.co/storage/v1/object/public/game_media//";
const UNSPLASH_URL = "https://images.unsplash.com/";

export const GAMES: Game[] = [
  {
    id: "1",
    game_name: "Drillhorn",
    studio_name: "Quantum Forge Interactive",
    video_url: BASE_URL + "BULLDOZER.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drillhorn",
    image_1_url: UNSPLASH_URL + "photo-1579586337278-3befd40fd17a",
    image_2_url: UNSPLASH_URL + "photo-1564449834301-163696e79974",
    image_3_url: UNSPLASH_URL + "photo-1563207153-f403bf289096",
    image_4_url: UNSPLASH_URL + "photo-1583004647982-8d68d4e21c8c",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    game_name: "Skyfang",
    studio_name: "Nebula Pulse Games",
    video_url: BASE_URL + "DRAGON.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=skyfang",
    image_1_url: UNSPLASH_URL + "photo-1577344718665-3e7c0c1ecf6b",
    image_2_url: UNSPLASH_URL + "photo-1533738363-b7f9aef128ce",
    image_3_url: UNSPLASH_URL + "photo-1534447677768-be436bb09401",
    image_4_url: UNSPLASH_URL + "photo-1544367567-0f2fcb009e0b",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    game_name: "Big Hairy Snowman",
    studio_name: "Prismatic Ventures",
    video_url: BASE_URL + "HAIRY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=snowman",
    image_1_url: UNSPLASH_URL + "photo-1551582045-6ec9c11d8697",
    image_2_url: UNSPLASH_URL + "photo-1548034514-89b0c45a8078",
    image_3_url: UNSPLASH_URL + "photo-1549042261-925c80d05566",
    image_4_url: UNSPLASH_URL + "photo-1486078695445-0497c2f58cfe",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    game_name: "Meme Legends",
    studio_name: "Metazooie Studios",
    video_url: BASE_URL + "MEME.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=meme",
    image_1_url: UNSPLASH_URL + "photo-1546776310-eef45dd6d63c",
    image_2_url: UNSPLASH_URL + "photo-1531425300797-d5dc8b021c84",
    image_3_url: UNSPLASH_URL + "photo-1603991488459-73ba3dc70544",
    image_4_url: UNSPLASH_URL + "photo-1517242810446-cc8951b2be40",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    game_name: "Fluid Simulation Puzzles",
    studio_name: "Helios Dynamic",
    video_url: BASE_URL + "FLUID.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fluid",
    image_1_url: UNSPLASH_URL + "photo-1603797448029-9ac09c940fa8",
    image_2_url: UNSPLASH_URL + "photo-1587038782451-40bf52fa87e7",
    image_3_url: UNSPLASH_URL + "photo-1583004647982-8d68d4e21c8c",
    image_4_url: UNSPLASH_URL + "photo-1580407730474-77ac3c74c80b",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "6",
    game_name: "Forest Drone",
    studio_name: "Vertex Horizon",
    video_url: BASE_URL + "DRONE.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=drone",
    image_1_url: UNSPLASH_URL + "photo-1487887235947-a955ef187fcc",
    image_2_url: UNSPLASH_URL + "photo-1472396961693-142e6e269027",
    image_3_url: UNSPLASH_URL + "photo-1509316975850-ff9c5deb0cd9",
    image_4_url: UNSPLASH_URL + "photo-1535268647677-300dbf3d78d1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "7",
    game_name: "Shenlong",
    studio_name: "Eclipse Syndicate",
    video_url: BASE_URL + "DRAGONSTYLE.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=shenlong",
    image_1_url: UNSPLASH_URL + "photo-1577493340887-b7bfff550145",
    image_2_url: UNSPLASH_URL + "photo-1575936123452-b67c3203c357",
    image_3_url: UNSPLASH_URL + "photo-1567304529193-acc92518efcd",
    image_4_url: UNSPLASH_URL + "photo-1559628129-67cf63b72248",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "8",
    game_name: "Subway Chase",
    studio_name: "Apogee Dynamics",
    video_url: BASE_URL + "SUBWAY.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=subway",
    image_1_url: UNSPLASH_URL + "photo-1547623542-de3ff5941ddb",
    image_2_url: UNSPLASH_URL + "photo-1557400431-75d2d19bd29f",
    image_3_url: UNSPLASH_URL + "photo-1544899841-0458954a2155",
    image_4_url: UNSPLASH_URL + "photo-1581262208435-41726951e5c7",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "9",
    game_name: "Galleon Wars",
    studio_name: "Luminary Nexus",
    video_url: BASE_URL + "SHIP.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=galleon",
    image_1_url: UNSPLASH_URL + "photo-1534447677768-be436bb09401",
    image_2_url: UNSPLASH_URL + "photo-1530538095376-a4926e6a99df",
    image_3_url: UNSPLASH_URL + "photo-1566872630252-4706afa5af87",
    image_4_url: UNSPLASH_URL + "photo-1572408341154-3dabd0482271",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "10",
    game_name: "HyperRail",
    studio_name: "Nova Fragment",
    video_url: BASE_URL + "SCIFITRAIN.mp4",
    profile_picture_url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=hyperrail",
    image_1_url: UNSPLASH_URL + "photo-1474487548417-781cb71495f3",
    image_2_url: UNSPLASH_URL + "photo-1541427468627-a89a96e5ca1d",
    image_3_url: UNSPLASH_URL + "photo-1536697246787-1f7ae568d89a",
    image_4_url: UNSPLASH_URL + "photo-1541427468627-a89a96e5ca1d",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
