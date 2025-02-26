export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_videos: {
        Row: {
          active: boolean | null
          created_at: string | null
          duration: number
          filename: string
          id: string
          updated_at: string | null
          url: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          duration: number
          filename: string
          id?: string
          updated_at?: string | null
          url: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          duration?: number
          filename?: string
          id?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audio_generations: {
        Row: {
          created_at: string
          id: string
          input_tracks: string[]
          output_url: string | null
          prompt: string | null
          replicate_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_tracks: string[]
          output_url?: string | null
          prompt?: string | null
          replicate_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          input_tracks?: string[]
          output_url?: string | null
          prompt?: string | null
          replicate_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          author: string
          created_at: string | null
          date: string | null
          id: string
          image_url: string | null
          text: string
          tweet_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          author: string
          created_at?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          text: string
          tweet_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          author?: string
          created_at?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          text?: string
          tweet_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      bulk_image_processing: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          original_path: string
          processed_path: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          original_path: string
          processed_path?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          original_path?: string
          processed_path?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          game_project_id: string
          id: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string
          game_project_id: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string
          game_project_id?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_game_project_id_fkey"
            columns: ["game_project_id"]
            isOneToOne: false
            referencedRelation: "game_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_tasks: {
        Row: {
          category: string
          created_at: string
          frequency: string
          id: string
          task: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          frequency: string
          id?: string
          task: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          frequency?: string
          id?: string
          task?: string
          updated_at?: string
        }
        Relationships: []
      }
      futurefundocs_folders: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean | null
          name: string
          order_index: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          name: string
          order_index?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          name?: string
          order_index?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      futurefundocs_pages: {
        Row: {
          content: string
          created_at: string
          folder_id: string
          id: string
          is_deleted: boolean | null
          order_index: number | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          folder_id: string
          id?: string
          is_deleted?: boolean | null
          order_index?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          folder_id?: string
          id?: string
          is_deleted?: boolean | null
          order_index?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "futurefundocs_pages_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "futurefundocs_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      game_funding: {
        Row: {
          created_at: string | null
          current_funding: number | null
          funding_end_date: string
          funding_goal: number
          game_id: string | null
          id: string
          twitter_url: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          current_funding?: number | null
          funding_end_date: string
          funding_goal: number
          game_id?: string | null
          id?: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          current_funding?: number | null
          funding_end_date?: string
          funding_goal?: number
          game_id?: string | null
          id?: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_funding_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_media"
            referencedColumns: ["id"]
          },
        ]
      }
      game_media: {
        Row: {
          cached_profile_picture_url: string | null
          created_at: string | null
          game_name: string
          id: string
          image_1_url: string | null
          image_2_url: string | null
          image_3_url: string | null
          image_4_url: string | null
          profile_picture_metadata: Json | null
          profile_picture_url: string
          studio_name: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          cached_profile_picture_url?: string | null
          created_at?: string | null
          game_name: string
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          image_3_url?: string | null
          image_4_url?: string | null
          profile_picture_metadata?: Json | null
          profile_picture_url: string
          studio_name: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          cached_profile_picture_url?: string | null
          created_at?: string | null
          game_name?: string
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          image_3_url?: string | null
          image_4_url?: string | null
          profile_picture_metadata?: Json | null
          profile_picture_url?: string
          studio_name?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: []
      }
      game_milestones: {
        Row: {
          completed: boolean | null
          created_at: string | null
          date: string
          game_id: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          date: string
          game_id?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          date?: string
          game_id?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_milestones_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_media"
            referencedColumns: ["id"]
          },
        ]
      }
      game_polls: {
        Row: {
          active: boolean | null
          created_at: string | null
          game_id: string | null
          id: string
          question: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          game_id?: string | null
          id?: string
          question: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          game_id?: string | null
          id?: string
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_polls_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_media"
            referencedColumns: ["id"]
          },
        ]
      }
      game_projects: {
        Row: {
          code: string | null
          created_at: string
          description: string
          id: string
          published_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description: string
          id?: string
          published_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string
          id?: string
          published_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      game_updates: {
        Row: {
          category: string
          content: string
          created_at: string | null
          game_id: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          game_id?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          game_id?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_updates_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_media"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_images: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          image_data: string
          model: string
          output_urls: string[] | null
          parameters: Json | null
          prompt: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_data: string
          model: string
          output_urls?: string[] | null
          parameters?: Json | null
          prompt?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_data?: string
          model?: string
          output_urls?: string[] | null
          parameters?: Json | null
          prompt?: string | null
          status?: string | null
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string
          created_at: string | null
          id: string
          is_active: boolean | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background_image_url: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background_image_url?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          age: number
          avatar_url: string | null
          conversations: string[] | null
          created_at: string | null
          cycle_data: Json | null
          dislikes: string[] | null
          id: string
          interests: string[] | null
          last_contact: string | null
          likes: string[] | null
          location: string
          name: string
          recommendations: string[] | null
          status: string | null
          updated_at: string | null
          zodiac_sign: string | null
        }
        Insert: {
          age: number
          avatar_url?: string | null
          conversations?: string[] | null
          created_at?: string | null
          cycle_data?: Json | null
          dislikes?: string[] | null
          id?: string
          interests?: string[] | null
          last_contact?: string | null
          likes?: string[] | null
          location: string
          name: string
          recommendations?: string[] | null
          status?: string | null
          updated_at?: string | null
          zodiac_sign?: string | null
        }
        Update: {
          age?: number
          avatar_url?: string | null
          conversations?: string[] | null
          created_at?: string | null
          cycle_data?: Json | null
          dislikes?: string[] | null
          id?: string
          interests?: string[] | null
          last_contact?: string | null
          likes?: string[] | null
          location?: string
          name?: string
          recommendations?: string[] | null
          status?: string | null
          updated_at?: string | null
          zodiac_sign?: string | null
        }
        Relationships: []
      }
      poll_options: {
        Row: {
          created_at: string | null
          id: string
          option_text: string
          poll_id: string | null
          updated_at: string | null
          votes: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_text: string
          poll_id?: string | null
          updated_at?: string | null
          votes?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          option_text?: string
          poll_id?: string | null
          updated_at?: string | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "game_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      quarterly_goals: {
        Row: {
          category: string
          created_at: string
          frequency: string
          id: string
          task: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          frequency: string
          id?: string
          task: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          frequency?: string
          id?: string
          task?: string
          updated_at?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          order_index: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      story_scene_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          parameters: Json | null
          prompt: string
          scene_id: string
          story_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          parameters?: Json | null
          prompt: string
          scene_id: string
          story_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          parameters?: Json | null
          prompt?: string
          scene_id?: string
          story_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      "Swipe Stories Display": {
        Row: {
          created_at: string
          id: number
          image_url: string
          is_active: boolean | null
          order_index: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_url: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      task_progress: {
        Row: {
          category: string
          created_at: string | null
          frequency: string
          id: string
          progress: Json
          task_id: string
          task_name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          frequency: string
          id?: string
          progress?: Json
          task_id: string
          task_name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          frequency?: string
          id?: string
          progress?: Json
          task_id?: string
          task_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tracks: {
        Row: {
          audio_url: string | null
          created_at: string | null
          id: string
          name: string
          prompt: string | null
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          id?: string
          name: string
          prompt?: string | null
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          prompt?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      yearly_goals: {
        Row: {
          category: string
          created_at: string
          frequency: string
          id: string
          task: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          frequency: string
          id?: string
          task: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          frequency?: string
          id?: string
          task?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
