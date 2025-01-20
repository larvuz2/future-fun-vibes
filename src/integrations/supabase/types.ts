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
