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
      comment_interaction_counts: {
        Row: {
          comment_id: string
          down_votes: number
          up_votes: number
        }
        Insert: {
          comment_id: string
          down_votes?: number
          up_votes?: number
        }
        Update: {
          comment_id?: string
          down_votes?: number
          up_votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "comment_interaction_counts_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_interactions: {
        Row: {
          comment_id: string
          created_at: string
          direction: Database["public"]["Enums"]["interaction_type_enum"]
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          direction: Database["public"]["Enums"]["interaction_type_enum"]
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          direction?: Database["public"]["Enums"]["interaction_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_interactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comment_interactions_comment"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comment_interactions_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string
          created_at: string
          deleted: boolean | null
          edited: boolean | null
          id: string
          original_comment: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          deleted?: boolean | null
          edited?: boolean | null
          id?: string
          original_comment?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          deleted?: boolean | null
          edited?: boolean | null
          id?: string
          original_comment?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          id: string
          image_url: string
          post_id: string
        }
        Insert: {
          id?: string
          image_url: string
          post_id: string
        }
        Update: {
          id?: string
          image_url?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_post_images_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_interaction_counts: {
        Row: {
          comment_count: number
          down_votes: number
          post_id: string
          up_votes: number
        }
        Insert: {
          comment_count?: number
          down_votes?: number
          post_id: string
          up_votes?: number
        }
        Update: {
          comment_count?: number
          down_votes?: number
          post_id?: string
          up_votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_interaction_counts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_interactions: {
        Row: {
          created_at: string
          direction: Database["public"]["Enums"]["interaction_type_enum"]
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          direction: Database["public"]["Enums"]["interaction_type_enum"]
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          direction?: Database["public"]["Enums"]["interaction_type_enum"]
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_post_interactions_post"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_post_interactions_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_interactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          deleted: boolean | null
          id: string
          title: string
          type: Database["public"]["Enums"]["post_type_enum"]
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted?: boolean | null
          id?: string
          title: string
          type?: Database["public"]["Enums"]["post_type_enum"]
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted?: boolean | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["post_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_posts_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
        ]
      }
      rantr_users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in: string | null
          profile_photo: string | null
          status: Database["public"]["Enums"]["user_status"]
          terms_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in?: string | null
          profile_photo?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          terms_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_sign_in?: string | null
          profile_photo?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          terms_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rantr_users_terms_id_fkey"
            columns: ["terms_id"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["id"]
          },
        ]
      }
      terms: {
        Row: {
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "terms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "rantr_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      interaction_type_enum: "up" | "down"
      post_type_enum: "RANT" | "ADVICE" | "OTHER"
      user_status: "SETUP_REQUIRED" | "COMPLETE" | "DELETED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      interaction_type_enum: ["up", "down"],
      post_type_enum: ["RANT", "ADVICE", "OTHER"],
      user_status: ["SETUP_REQUIRED", "COMPLETE", "DELETED"],
    },
  },
} as const

