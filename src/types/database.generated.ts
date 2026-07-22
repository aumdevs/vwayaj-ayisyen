export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      admin_invitations: {
        Row: {
          accepted_at: string | null;
          accepted_by: string | null;
          created_at: string;
          email_ciphertext: string;
          email_iv: string;
          email_lookup_hash: string;
          email_tag: string;
          encryption_key_version: number;
          expires_at: string;
          id: string;
          invited_by: string;
          revoked_at: string | null;
          roles: Database["public"]["Enums"]["app_role"][];
          token_hash: string;
        };
        Insert: {
          accepted_at?: string | null;
          accepted_by?: string | null;
          created_at?: string;
          email_ciphertext: string;
          email_iv: string;
          email_lookup_hash: string;
          email_tag: string;
          encryption_key_version?: number;
          expires_at: string;
          id?: string;
          invited_by: string;
          revoked_at?: string | null;
          roles: Database["public"]["Enums"]["app_role"][];
          token_hash: string;
        };
        Update: {
          accepted_at?: string | null;
          accepted_by?: string | null;
          created_at?: string;
          email_ciphertext?: string;
          email_iv?: string;
          email_lookup_hash?: string;
          email_tag?: string;
          encryption_key_version?: number;
          expires_at?: string;
          id?: string;
          invited_by?: string;
          revoked_at?: string | null;
          roles?: Database["public"]["Enums"]["app_role"][];
          token_hash?: string;
        };
        Relationships: [];
      };
      advisor_availability_exceptions: {
        Row: {
          advisor_id: string;
          available: boolean;
          created_at: string;
          ends_at: string;
          id: string;
          reason: string | null;
          starts_at: string;
        };
        Insert: {
          advisor_id: string;
          available?: boolean;
          created_at?: string;
          ends_at: string;
          id?: string;
          reason?: string | null;
          starts_at: string;
        };
        Update: {
          advisor_id?: string;
          available?: boolean;
          created_at?: string;
          ends_at?: string;
          id?: string;
          reason?: string | null;
          starts_at?: string;
        };
        Relationships: [];
      };
      advisor_availability_rules: {
        Row: {
          active: boolean;
          advisor_id: string;
          created_at: string;
          effective_from: string | null;
          effective_until: string | null;
          id: string;
          local_end: string;
          local_start: string;
          timezone: string;
          weekday: number;
        };
        Insert: {
          active?: boolean;
          advisor_id: string;
          created_at?: string;
          effective_from?: string | null;
          effective_until?: string | null;
          id?: string;
          local_end: string;
          local_start: string;
          timezone: string;
          weekday: number;
        };
        Update: {
          active?: boolean;
          advisor_id?: string;
          created_at?: string;
          effective_from?: string | null;
          effective_until?: string | null;
          id?: string;
          local_end?: string;
          local_start?: string;
          timezone?: string;
          weekday?: number;
        };
        Relationships: [];
      };
      ai_conversations: {
        Row: {
          anonymous_token_hash: string | null;
          country_context: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          deleted_at: string | null;
          id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          retention_until: string;
          title: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          anonymous_token_hash?: string | null;
          country_context?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          retention_until: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          anonymous_token_hash?: string | null;
          country_context?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          retention_until?: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ai_feedback: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          message_id: string;
          rating: number | null;
          reason_code: string | null;
          user_id: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          message_id: string;
          rating?: number | null;
          reason_code?: string | null;
          user_id?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          message_id?: string;
          rating?: number | null;
          reason_code?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_feedback_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "ai_messages";
            referencedColumns: ["id"];
          }
        ];
      };
      ai_message_citations: {
        Row: {
          content_chunk_id: string;
          message_id: string;
          ordinal: number;
          quoted_excerpt: string | null;
        };
        Insert: {
          content_chunk_id: string;
          message_id: string;
          ordinal: number;
          quoted_excerpt?: string | null;
        };
        Update: {
          content_chunk_id?: string;
          message_id?: string;
          ordinal?: number;
          quoted_excerpt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_message_citations_content_chunk_id_fkey";
            columns: ["content_chunk_id"];
            isOneToOne: false;
            referencedRelation: "content_chunks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_message_citations_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "ai_messages";
            referencedColumns: ["id"];
          }
        ];
      };
      ai_messages: {
        Row: {
          confidence: string | null;
          content_hash: string | null;
          content_redacted: string;
          conversation_id: string;
          created_at: string;
          id: string;
          input_tokens: number | null;
          latency_ms: number | null;
          model_name: string | null;
          output_tokens: number | null;
          provider_request_id: string | null;
          risk_flags: string[];
          role: Database["public"]["Enums"]["ai_message_role"];
        };
        Insert: {
          confidence?: string | null;
          content_hash?: string | null;
          content_redacted: string;
          conversation_id: string;
          created_at?: string;
          id?: string;
          input_tokens?: number | null;
          latency_ms?: number | null;
          model_name?: string | null;
          output_tokens?: number | null;
          provider_request_id?: string | null;
          risk_flags?: string[];
          role: Database["public"]["Enums"]["ai_message_role"];
        };
        Update: {
          confidence?: string | null;
          content_hash?: string | null;
          content_redacted?: string;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          input_tokens?: number | null;
          latency_ms?: number | null;
          model_name?: string | null;
          output_tokens?: number | null;
          provider_request_id?: string | null;
          risk_flags?: string[];
          role?: Database["public"]["Enums"]["ai_message_role"];
        };
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "ai_conversations";
            referencedColumns: ["id"];
          }
        ];
      };
      appointment_participants: {
        Row: {
          appointment_id: string;
          joined_at: string | null;
          participant_role: string;
          user_id: string;
        };
        Insert: {
          appointment_id: string;
          joined_at?: string | null;
          participant_role: string;
          user_id: string;
        };
        Update: {
          appointment_id?: string;
          joined_at?: string | null;
          participant_role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_participants_appointment_id_fkey";
            columns: ["appointment_id"];
            isOneToOne: false;
            referencedRelation: "appointments";
            referencedColumns: ["id"];
          }
        ];
      };
      appointment_type_translations: {
        Row: {
          appointment_type_id: string;
          cancellation_summary: string | null;
          description: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
        };
        Insert: {
          appointment_type_id: string;
          cancellation_summary?: string | null;
          description?: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
        };
        Update: {
          appointment_type_id?: string;
          cancellation_summary?: string | null;
          description?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_type_translations_appointment_type_id_fkey";
            columns: ["appointment_type_id"];
            isOneToOne: false;
            referencedRelation: "appointment_types";
            referencedColumns: ["id"];
          }
        ];
      };
      appointment_types: {
        Row: {
          active: boolean;
          buffer_after_minutes: number;
          buffer_before_minutes: number;
          cancellation_notice_hours: number;
          code: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          duration_minutes: number;
          id: string;
          minimum_notice_hours: number;
          package_id: string | null;
          requires_payment: boolean;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          buffer_after_minutes?: number;
          buffer_before_minutes?: number;
          cancellation_notice_hours?: number;
          code: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          duration_minutes: number;
          id?: string;
          minimum_notice_hours?: number;
          package_id?: string | null;
          requires_payment?: boolean;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          buffer_after_minutes?: number;
          buffer_before_minutes?: number;
          cancellation_notice_hours?: number;
          code?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          duration_minutes?: number;
          id?: string;
          minimum_notice_hours?: number;
          package_id?: string | null;
          requires_payment?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_types_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "appointment_types_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_types_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
      appointments: {
        Row: {
          advisor_id: string;
          advisor_timezone: string;
          appointment_type_id: string;
          booked_by: string;
          cancellation_reason: string | null;
          cancelled_at: string | null;
          cancelled_by: string | null;
          case_id: string | null;
          completed_at: string | null;
          created_at: string;
          encryption_key_version: number | null;
          ends_at: string;
          hold_expires_at: string | null;
          id: string;
          meeting_external_id: string | null;
          meeting_provider: string | null;
          meeting_url_ciphertext: string | null;
          meeting_url_iv: string | null;
          meeting_url_tag: string | null;
          order_id: string | null;
          starts_at: string;
          status: Database["public"]["Enums"]["appointment_status"];
          updated_at: string;
          user_timezone: string;
        };
        Insert: {
          advisor_id: string;
          advisor_timezone: string;
          appointment_type_id: string;
          booked_by: string;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          cancelled_by?: string | null;
          case_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          encryption_key_version?: number | null;
          ends_at: string;
          hold_expires_at?: string | null;
          id?: string;
          meeting_external_id?: string | null;
          meeting_provider?: string | null;
          meeting_url_ciphertext?: string | null;
          meeting_url_iv?: string | null;
          meeting_url_tag?: string | null;
          order_id?: string | null;
          starts_at: string;
          status?: Database["public"]["Enums"]["appointment_status"];
          updated_at?: string;
          user_timezone: string;
        };
        Update: {
          advisor_id?: string;
          advisor_timezone?: string;
          appointment_type_id?: string;
          booked_by?: string;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          cancelled_by?: string | null;
          case_id?: string | null;
          completed_at?: string | null;
          created_at?: string;
          encryption_key_version?: number | null;
          ends_at?: string;
          hold_expires_at?: string | null;
          id?: string;
          meeting_external_id?: string | null;
          meeting_provider?: string | null;
          meeting_url_ciphertext?: string | null;
          meeting_url_iv?: string | null;
          meeting_url_tag?: string | null;
          order_id?: string | null;
          starts_at?: string;
          status?: Database["public"]["Enums"]["appointment_status"];
          updated_at?: string;
          user_timezone?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_appointment_type_id_fkey";
            columns: ["appointment_type_id"];
            isOneToOne: false;
            referencedRelation: "appointment_types";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_answers: {
        Row: {
          answer: Json;
          answered_at: string;
          question_id: string;
          session_id: string;
        };
        Insert: {
          answer: Json;
          answered_at?: string;
          question_id: string;
          session_id: string;
        };
        Update: {
          answer?: Json;
          answered_at?: string;
          question_id?: string;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "assessment_questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assessment_answers_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "assessment_sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_option_translations: {
        Row: {
          explanation: string | null;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
          option_id: string;
        };
        Insert: {
          explanation?: string | null;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
          option_id: string;
        };
        Update: {
          explanation?: string | null;
          label?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          option_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_option_translations_option_id_fkey";
            columns: ["option_id"];
            isOneToOne: false;
            referencedRelation: "assessment_options";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_option_weights: {
        Row: {
          country_code: Database["public"]["Enums"]["country_code"];
          option_id: string;
          rationale: string | null;
          weight: number;
        };
        Insert: {
          country_code: Database["public"]["Enums"]["country_code"];
          option_id: string;
          rationale?: string | null;
          weight: number;
        };
        Update: {
          country_code?: Database["public"]["Enums"]["country_code"];
          option_id?: string;
          rationale?: string | null;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_option_weights_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "assessment_option_weights_option_id_fkey";
            columns: ["option_id"];
            isOneToOne: false;
            referencedRelation: "assessment_options";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_options: {
        Row: {
          code: string;
          config: Json;
          display_order: number;
          id: string;
          question_id: string;
        };
        Insert: {
          code: string;
          config?: Json;
          display_order?: number;
          id?: string;
          question_id: string;
        };
        Update: {
          code?: string;
          config?: Json;
          display_order?: number;
          id?: string;
          question_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_options_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "assessment_questions";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_question_translations: {
        Row: {
          help_text: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          prompt: string;
          question_id: string;
          status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          help_text?: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          prompt: string;
          question_id: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          help_text?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          prompt?: string;
          question_id?: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "assessment_question_translations_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "assessment_questions";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_questions: {
        Row: {
          code: string;
          config: Json;
          created_at: string;
          display_order: number;
          id: string;
          question_type: string;
          required: boolean;
          status: Database["public"]["Enums"]["content_status"];
          version: number;
        };
        Insert: {
          code: string;
          config?: Json;
          created_at?: string;
          display_order?: number;
          id?: string;
          question_type: string;
          required?: boolean;
          status?: Database["public"]["Enums"]["content_status"];
          version?: number;
        };
        Update: {
          code?: string;
          config?: Json;
          created_at?: string;
          display_order?: number;
          id?: string;
          question_type?: string;
          required?: boolean;
          status?: Database["public"]["Enums"]["content_status"];
          version?: number;
        };
        Relationships: [];
      };
      assessment_results: {
        Row: {
          country_code: Database["public"]["Enums"]["country_code"];
          created_at: string;
          explanation_keys: Json;
          id: string;
          rank: number;
          rules_version: string;
          score: number;
          session_id: string;
        };
        Insert: {
          country_code: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          explanation_keys?: Json;
          id?: string;
          rank: number;
          rules_version: string;
          score: number;
          session_id: string;
        };
        Update: {
          country_code?: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          explanation_keys?: Json;
          id?: string;
          rank?: number;
          rules_version?: string;
          score?: number;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_results_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "assessment_results_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "assessment_sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      assessment_sessions: {
        Row: {
          anonymous_token_hash: string | null;
          completed_at: string | null;
          consent_version: string;
          consented_at: string;
          created_at: string;
          expires_at: string;
          id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          rules_version: string;
          user_id: string | null;
        };
        Insert: {
          anonymous_token_hash?: string | null;
          completed_at?: string | null;
          consent_version: string;
          consented_at?: string;
          created_at?: string;
          expires_at: string;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          rules_version: string;
          user_id?: string | null;
        };
        Update: {
          anonymous_token_hash?: string | null;
          completed_at?: string | null;
          consent_version?: string;
          consented_at?: string;
          created_at?: string;
          expires_at?: string;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          rules_version?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          action: string;
          actor_id: string | null;
          actor_role: Database["public"]["Enums"]["app_role"] | null;
          after_data: Json | null;
          before_data: Json | null;
          created_at: string;
          id: number;
          metadata: Json;
          reason: string | null;
          request_id: string | null;
          risk_level: Database["public"]["Enums"]["risk_level"];
          target_id: string | null;
          target_table: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          actor_role?: Database["public"]["Enums"]["app_role"] | null;
          after_data?: Json | null;
          before_data?: Json | null;
          created_at?: string;
          id?: never;
          metadata?: Json;
          reason?: string | null;
          request_id?: string | null;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          target_id?: string | null;
          target_table?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          actor_role?: Database["public"]["Enums"]["app_role"] | null;
          after_data?: Json | null;
          before_data?: Json | null;
          created_at?: string;
          id?: never;
          metadata?: Json;
          reason?: string | null;
          request_id?: string | null;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          target_id?: string | null;
          target_table?: string | null;
        };
        Relationships: [];
      };
      case_documents: {
        Row: {
          byte_size: number | null;
          case_id: string;
          classification: Database["public"]["Enums"]["document_classification"];
          clean_bucket: string | null;
          clean_path: string | null;
          created_at: string;
          declared_mime: string | null;
          deleted_at: string | null;
          detected_mime: string | null;
          document_type_code: string;
          encryption_key_version: number | null;
          id: string;
          original_filename_ciphertext: string | null;
          original_filename_iv: string | null;
          original_filename_tag: string | null;
          quarantine_bucket: string;
          quarantine_path: string | null;
          rejection_reason: string | null;
          requested_by: string | null;
          retention_until: string | null;
          scan_completed_at: string | null;
          scan_details: Json;
          scan_started_at: string | null;
          scan_status: Database["public"]["Enums"]["document_scan_status"];
          scanner_provider: string | null;
          scanner_reference: string | null;
          sha256_hex: string | null;
          supersedes_id: string | null;
          task_id: string | null;
          updated_at: string;
          uploaded_by: string | null;
          verified_at: string | null;
          verified_by: string | null;
          version_no: number;
        };
        Insert: {
          byte_size?: number | null;
          case_id: string;
          classification?: Database["public"]["Enums"]["document_classification"];
          clean_bucket?: string | null;
          clean_path?: string | null;
          created_at?: string;
          declared_mime?: string | null;
          deleted_at?: string | null;
          detected_mime?: string | null;
          document_type_code: string;
          encryption_key_version?: number | null;
          id?: string;
          original_filename_ciphertext?: string | null;
          original_filename_iv?: string | null;
          original_filename_tag?: string | null;
          quarantine_bucket?: string;
          quarantine_path?: string | null;
          rejection_reason?: string | null;
          requested_by?: string | null;
          retention_until?: string | null;
          scan_completed_at?: string | null;
          scan_details?: Json;
          scan_started_at?: string | null;
          scan_status?: Database["public"]["Enums"]["document_scan_status"];
          scanner_provider?: string | null;
          scanner_reference?: string | null;
          sha256_hex?: string | null;
          supersedes_id?: string | null;
          task_id?: string | null;
          updated_at?: string;
          uploaded_by?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
          version_no?: number;
        };
        Update: {
          byte_size?: number | null;
          case_id?: string;
          classification?: Database["public"]["Enums"]["document_classification"];
          clean_bucket?: string | null;
          clean_path?: string | null;
          created_at?: string;
          declared_mime?: string | null;
          deleted_at?: string | null;
          detected_mime?: string | null;
          document_type_code?: string;
          encryption_key_version?: number | null;
          id?: string;
          original_filename_ciphertext?: string | null;
          original_filename_iv?: string | null;
          original_filename_tag?: string | null;
          quarantine_bucket?: string;
          quarantine_path?: string | null;
          rejection_reason?: string | null;
          requested_by?: string | null;
          retention_until?: string | null;
          scan_completed_at?: string | null;
          scan_details?: Json;
          scan_started_at?: string | null;
          scan_status?: Database["public"]["Enums"]["document_scan_status"];
          scanner_provider?: string | null;
          scanner_reference?: string | null;
          sha256_hex?: string | null;
          supersedes_id?: string | null;
          task_id?: string | null;
          updated_at?: string;
          uploaded_by?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
          version_no?: number;
        };
        Relationships: [
          {
            foreignKeyName: "case_documents_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_documents_supersedes_id_fkey";
            columns: ["supersedes_id"];
            isOneToOne: false;
            referencedRelation: "case_documents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_documents_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "case_tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      case_messages: {
        Row: {
          body: string;
          case_id: string;
          created_at: string;
          deleted_at: string | null;
          edited_at: string | null;
          id: string;
          reply_to_id: string | null;
          sender_id: string | null;
        };
        Insert: {
          body: string;
          case_id: string;
          created_at?: string;
          deleted_at?: string | null;
          edited_at?: string | null;
          id?: string;
          reply_to_id?: string | null;
          sender_id?: string | null;
        };
        Update: {
          body?: string;
          case_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          edited_at?: string | null;
          id?: string;
          reply_to_id?: string | null;
          sender_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "case_messages_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_messages_reply_to_id_fkey";
            columns: ["reply_to_id"];
            isOneToOne: false;
            referencedRelation: "case_messages";
            referencedColumns: ["id"];
          }
        ];
      };
      case_notes: {
        Row: {
          author_id: string | null;
          body: string;
          case_id: string;
          created_at: string;
          id: string;
          sensitivity: Database["public"]["Enums"]["risk_level"];
          supersedes_id: string | null;
          visible_to_client: boolean;
        };
        Insert: {
          author_id?: string | null;
          body: string;
          case_id: string;
          created_at?: string;
          id?: string;
          sensitivity?: Database["public"]["Enums"]["risk_level"];
          supersedes_id?: string | null;
          visible_to_client?: boolean;
        };
        Update: {
          author_id?: string | null;
          body?: string;
          case_id?: string;
          created_at?: string;
          id?: string;
          sensitivity?: Database["public"]["Enums"]["risk_level"];
          supersedes_id?: string | null;
          visible_to_client?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "case_notes_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_notes_supersedes_id_fkey";
            columns: ["supersedes_id"];
            isOneToOne: false;
            referencedRelation: "case_notes";
            referencedColumns: ["id"];
          }
        ];
      };
      case_participants: {
        Row: {
          can_manage_tasks: boolean;
          can_message: boolean;
          can_upload_documents: boolean;
          can_view_documents: boolean;
          case_id: string;
          expires_at: string | null;
          granted_by: string | null;
          participant_role: Database["public"]["Enums"]["case_participant_role"];
          revoke_reason: string | null;
          revoked_at: string | null;
          starts_at: string;
          user_id: string;
        };
        Insert: {
          can_manage_tasks?: boolean;
          can_message?: boolean;
          can_upload_documents?: boolean;
          can_view_documents?: boolean;
          case_id: string;
          expires_at?: string | null;
          granted_by?: string | null;
          participant_role: Database["public"]["Enums"]["case_participant_role"];
          revoke_reason?: string | null;
          revoked_at?: string | null;
          starts_at?: string;
          user_id: string;
        };
        Update: {
          can_manage_tasks?: boolean;
          can_message?: boolean;
          can_upload_documents?: boolean;
          can_view_documents?: boolean;
          case_id?: string;
          expires_at?: string | null;
          granted_by?: string | null;
          participant_role?: Database["public"]["Enums"]["case_participant_role"];
          revoke_reason?: string | null;
          revoked_at?: string | null;
          starts_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_participants_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          }
        ];
      };
      case_status_history: {
        Row: {
          case_id: string;
          changed_at: string;
          changed_by: string | null;
          from_status: Database["public"]["Enums"]["case_status"] | null;
          id: number;
          note: string | null;
          to_status: Database["public"]["Enums"]["case_status"];
          visible_to_client: boolean;
        };
        Insert: {
          case_id: string;
          changed_at?: string;
          changed_by?: string | null;
          from_status?: Database["public"]["Enums"]["case_status"] | null;
          id?: never;
          note?: string | null;
          to_status: Database["public"]["Enums"]["case_status"];
          visible_to_client?: boolean;
        };
        Update: {
          case_id?: string;
          changed_at?: string;
          changed_by?: string | null;
          from_status?: Database["public"]["Enums"]["case_status"] | null;
          id?: never;
          note?: string | null;
          to_status?: Database["public"]["Enums"]["case_status"];
          visible_to_client?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "case_status_history_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          }
        ];
      };
      case_tasks: {
        Row: {
          assigned_user_id: string | null;
          case_id: string;
          completed_at: string | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          due_at: string | null;
          evidence_required: boolean;
          id: string;
          parent_task_id: string | null;
          rejected_reason: string | null;
          status: Database["public"]["Enums"]["task_status"];
          submitted_at: string | null;
          template_code: string | null;
          title: string;
          updated_at: string;
          updated_by: string | null;
          visible_to_client: boolean;
        };
        Insert: {
          assigned_user_id?: string | null;
          case_id: string;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          due_at?: string | null;
          evidence_required?: boolean;
          id?: string;
          parent_task_id?: string | null;
          rejected_reason?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          submitted_at?: string | null;
          template_code?: string | null;
          title: string;
          updated_at?: string;
          updated_by?: string | null;
          visible_to_client?: boolean;
        };
        Update: {
          assigned_user_id?: string | null;
          case_id?: string;
          completed_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          due_at?: string | null;
          evidence_required?: boolean;
          id?: string;
          parent_task_id?: string | null;
          rejected_reason?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          submitted_at?: string | null;
          template_code?: string | null;
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
          visible_to_client?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "case_tasks_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_tasks_parent_task_id_fkey";
            columns: ["parent_task_id"];
            isOneToOne: false;
            referencedRelation: "case_tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      cases: {
        Row: {
          archived_at: string | null;
          cancelled_at: string | null;
          client_user_id: string;
          completed_at: string | null;
          country_code: Database["public"]["Enums"]["country_code"];
          created_at: string;
          created_by: string | null;
          current_stage_code: string | null;
          id: string;
          lead_id: string | null;
          opened_at: string | null;
          package_id: string | null;
          reference_code: string;
          retention_until: string | null;
          status: Database["public"]["Enums"]["case_status"];
          title: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          archived_at?: string | null;
          cancelled_at?: string | null;
          client_user_id: string;
          completed_at?: string | null;
          country_code: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          created_by?: string | null;
          current_stage_code?: string | null;
          id?: string;
          lead_id?: string | null;
          opened_at?: string | null;
          package_id?: string | null;
          reference_code?: string;
          retention_until?: string | null;
          status?: Database["public"]["Enums"]["case_status"];
          title?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          archived_at?: string | null;
          cancelled_at?: string | null;
          client_user_id?: string;
          completed_at?: string | null;
          country_code?: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          created_by?: string | null;
          current_stage_code?: string | null;
          id?: string;
          lead_id?: string | null;
          opened_at?: string | null;
          package_id?: string | null;
          reference_code?: string;
          retention_until?: string | null;
          status?: Database["public"]["Enums"]["case_status"];
          title?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cases_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "cases_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cases_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cases_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
      community_bans: {
        Row: {
          created_at: string;
          created_by: string;
          expires_at: string | null;
          id: string;
          permanent: boolean;
          reason_code: string;
          revoked_at: string | null;
          revoked_by: string | null;
          starts_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          expires_at?: string | null;
          id?: string;
          permanent?: boolean;
          reason_code: string;
          revoked_at?: string | null;
          revoked_by?: string | null;
          starts_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          expires_at?: string | null;
          id?: string;
          permanent?: boolean;
          reason_code?: string;
          revoked_at?: string | null;
          revoked_by?: string | null;
          starts_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      community_categories: {
        Row: {
          active: boolean;
          code: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          display_order: number;
          id: string;
        };
        Insert: {
          active?: boolean;
          code: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          display_order?: number;
          id?: string;
        };
        Update: {
          active?: boolean;
          code?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          display_order?: number;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_categories_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      community_category_translations: {
        Row: {
          category_id: string;
          description: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
        };
        Insert: {
          category_id: string;
          description?: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
        };
        Update: {
          category_id?: string;
          description?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_category_translations_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "community_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      community_comments: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          edited_at: string | null;
          hidden_reason: string | null;
          id: string;
          parent_comment_id: string | null;
          post_id: string;
          status: Database["public"]["Enums"]["community_content_status"];
        };
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          parent_comment_id?: string | null;
          post_id: string;
          status?: Database["public"]["Enums"]["community_content_status"];
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          parent_comment_id?: string | null;
          post_id?: string;
          status?: Database["public"]["Enums"]["community_content_status"];
        };
        Relationships: [
          {
            foreignKeyName: "community_comments_parent_comment_id_fkey";
            columns: ["parent_comment_id"];
            isOneToOne: false;
            referencedRelation: "community_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "community_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          }
        ];
      };
      community_posts: {
        Row: {
          author_id: string;
          body: string;
          category_id: string;
          created_at: string;
          edited_at: string | null;
          hidden_reason: string | null;
          id: string;
          last_activity_at: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reply_count: number;
          status: Database["public"]["Enums"]["community_content_status"];
          title: string;
        };
        Insert: {
          author_id: string;
          body: string;
          category_id: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          last_activity_at?: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reply_count?: number;
          status?: Database["public"]["Enums"]["community_content_status"];
          title: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          category_id?: string;
          created_at?: string;
          edited_at?: string | null;
          hidden_reason?: string | null;
          id?: string;
          last_activity_at?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          reply_count?: number;
          status?: Database["public"]["Enums"]["community_content_status"];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "community_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      community_reactions: {
        Row: {
          comment_id: string | null;
          created_at: string;
          post_id: string | null;
          reaction: string;
          user_id: string;
        };
        Insert: {
          comment_id?: string | null;
          created_at?: string;
          post_id?: string | null;
          reaction: string;
          user_id: string;
        };
        Update: {
          comment_id?: string | null;
          created_at?: string;
          post_id?: string | null;
          reaction?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_reactions_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "community_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "community_reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          }
        ];
      };
      community_reports: {
        Row: {
          assigned_to: string | null;
          comment_id: string | null;
          created_at: string;
          details: string | null;
          id: string;
          post_id: string | null;
          reason_code: string;
          reporter_id: string;
          status: Database["public"]["Enums"]["community_report_status"];
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          comment_id?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          post_id?: string | null;
          reason_code: string;
          reporter_id: string;
          status?: Database["public"]["Enums"]["community_report_status"];
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          comment_id?: string | null;
          created_at?: string;
          details?: string | null;
          id?: string;
          post_id?: string | null;
          reason_code?: string;
          reporter_id?: string;
          status?: Database["public"]["Enums"]["community_report_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_reports_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "community_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "community_reports_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          }
        ];
      };
      comparison_criteria: {
        Row: {
          code: string;
          created_at: string;
          default_weight: number;
          display_order: number;
          higher_is_better: boolean;
          id: string;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          default_weight?: number;
          display_order?: number;
          higher_is_better?: boolean;
          id?: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          default_weight?: number;
          display_order?: number;
          higher_is_better?: boolean;
          id?: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      comparison_criterion_translations: {
        Row: {
          criterion_id: string;
          explanation: string;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          scale_high_label: string | null;
          scale_low_label: string | null;
          status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          criterion_id: string;
          explanation: string;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          scale_high_label?: string | null;
          scale_low_label?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          criterion_id?: string;
          explanation?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          name?: string;
          scale_high_label?: string | null;
          scale_low_label?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "comparison_criterion_translations_criterion_id_fkey";
            columns: ["criterion_id"];
            isOneToOne: false;
            referencedRelation: "comparison_criteria";
            referencedColumns: ["id"];
          }
        ];
      };
      consent_records: {
        Row: {
          case_id: string | null;
          consent_type: Database["public"]["Enums"]["consent_type"];
          created_at: string;
          document_id: string | null;
          evidence_hash: string | null;
          granted: boolean;
          granted_at: string;
          id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          policy_version: string;
          scope: Json;
          user_id: string;
          withdrawn_at: string | null;
        };
        Insert: {
          case_id?: string | null;
          consent_type: Database["public"]["Enums"]["consent_type"];
          created_at?: string;
          document_id?: string | null;
          evidence_hash?: string | null;
          granted: boolean;
          granted_at?: string;
          id?: string;
          locale: Database["public"]["Enums"]["app_locale"];
          policy_version: string;
          scope?: Json;
          user_id: string;
          withdrawn_at?: string | null;
        };
        Update: {
          case_id?: string | null;
          consent_type?: Database["public"]["Enums"]["consent_type"];
          created_at?: string;
          document_id?: string | null;
          evidence_hash?: string | null;
          granted?: boolean;
          granted_at?: string;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          policy_version?: string;
          scope?: Json;
          user_id?: string;
          withdrawn_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "consent_records_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "consent_records_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "case_documents";
            referencedColumns: ["id"];
          }
        ];
      };
      content_chunks: {
        Row: {
          chunk_index: number;
          chunk_text: string;
          content_translation_locale: Database["public"]["Enums"]["app_locale"];
          content_version_id: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          embedding: string | null;
          expires_at: string | null;
          id: string;
          indexed_at: string;
          information_type: Database["public"]["Enums"]["information_type"];
          reviewed_at: string | null;
          token_count: number | null;
        };
        Insert: {
          chunk_index: number;
          chunk_text: string;
          content_translation_locale: Database["public"]["Enums"]["app_locale"];
          content_version_id: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          embedding?: string | null;
          expires_at?: string | null;
          id?: string;
          indexed_at?: string;
          information_type: Database["public"]["Enums"]["information_type"];
          reviewed_at?: string | null;
          token_count?: number | null;
        };
        Update: {
          chunk_index?: number;
          chunk_text?: string;
          content_translation_locale?: Database["public"]["Enums"]["app_locale"];
          content_version_id?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          embedding?: string | null;
          expires_at?: string | null;
          id?: string;
          indexed_at?: string;
          information_type?: Database["public"]["Enums"]["information_type"];
          reviewed_at?: string | null;
          token_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "content_chunks_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "content_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_chunks_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_version_id"];
          }
        ];
      };
      content_items: {
        Row: {
          author_id: string | null;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          current_version_no: number;
          deleted_at: string | null;
          id: string;
          information_type: Database["public"]["Enums"]["information_type"];
          next_review_at: string | null;
          published_version_id: string | null;
          risk_level: Database["public"]["Enums"]["risk_level"];
          section_key: string;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          current_version_no?: number;
          deleted_at?: string | null;
          id?: string;
          information_type: Database["public"]["Enums"]["information_type"];
          next_review_at?: string | null;
          published_version_id?: string | null;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          section_key: string;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          current_version_no?: number;
          deleted_at?: string | null;
          id?: string;
          information_type?: Database["public"]["Enums"]["information_type"];
          next_review_at?: string | null;
          published_version_id?: string | null;
          risk_level?: Database["public"]["Enums"]["risk_level"];
          section_key?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_items_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "content_items_published_version_id_fkey";
            columns: ["published_version_id"];
            isOneToOne: false;
            referencedRelation: "content_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_items_published_version_id_fkey";
            columns: ["published_version_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_version_id"];
          }
        ];
      };
      content_review_events: {
        Row: {
          actor_id: string | null;
          content_version_id: string;
          created_at: string;
          from_status: Database["public"]["Enums"]["content_status"] | null;
          id: number;
          reason: string | null;
          to_status: Database["public"]["Enums"]["content_status"];
        };
        Insert: {
          actor_id?: string | null;
          content_version_id: string;
          created_at?: string;
          from_status?: Database["public"]["Enums"]["content_status"] | null;
          id?: never;
          reason?: string | null;
          to_status: Database["public"]["Enums"]["content_status"];
        };
        Update: {
          actor_id?: string | null;
          content_version_id?: string;
          created_at?: string;
          from_status?: Database["public"]["Enums"]["content_status"] | null;
          id?: never;
          reason?: string | null;
          to_status?: Database["public"]["Enums"]["content_status"];
        };
        Relationships: [
          {
            foreignKeyName: "content_review_events_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "content_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_review_events_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_version_id"];
          }
        ];
      };
      content_sources: {
        Row: {
          accessed_at: string;
          archive_url: string | null;
          content_version_id: string;
          display_order: number;
          effective_from: string | null;
          effective_until: string | null;
          id: string;
          is_official: boolean;
          notes: string | null;
          published_at: string | null;
          publisher: string | null;
          source_type: string;
          title: string;
          url: string;
        };
        Insert: {
          accessed_at?: string;
          archive_url?: string | null;
          content_version_id: string;
          display_order?: number;
          effective_from?: string | null;
          effective_until?: string | null;
          id?: string;
          is_official?: boolean;
          notes?: string | null;
          published_at?: string | null;
          publisher?: string | null;
          source_type?: string;
          title: string;
          url: string;
        };
        Update: {
          accessed_at?: string;
          archive_url?: string | null;
          content_version_id?: string;
          display_order?: number;
          effective_from?: string | null;
          effective_until?: string | null;
          id?: string;
          is_official?: boolean;
          notes?: string | null;
          published_at?: string | null;
          publisher?: string | null;
          source_type?: string;
          title?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_sources_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "content_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_sources_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_version_id"];
          }
        ];
      };
      content_translations: {
        Row: {
          body: Json;
          content_version_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reviewed_at: string | null;
          reviewer_id: string | null;
          seo_description: string | null;
          seo_title: string | null;
          status: Database["public"]["Enums"]["translation_status"];
          summary: string | null;
          title: string;
          translator_id: string | null;
        };
        Insert: {
          body?: Json;
          content_version_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reviewed_at?: string | null;
          reviewer_id?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
          summary?: string | null;
          title: string;
          translator_id?: string | null;
        };
        Update: {
          body?: Json;
          content_version_id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          reviewed_at?: string | null;
          reviewer_id?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
          summary?: string | null;
          title?: string;
          translator_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "content_translations_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "content_versions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_translations_content_version_id_fkey";
            columns: ["content_version_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_version_id"];
          }
        ];
      };
      content_versions: {
        Row: {
          approved_at: string | null;
          approved_by: string | null;
          change_summary: string | null;
          content_item_id: string;
          created_at: string;
          created_by: string | null;
          effective_from: string | null;
          effective_until: string | null;
          fact_reviewer_id: string | null;
          id: string;
          last_verified_at: string | null;
          legal_reviewer_id: string | null;
          methodology: string | null;
          next_review_at: string | null;
          published_at: string | null;
          status: Database["public"]["Enums"]["content_status"];
          version_no: number;
        };
        Insert: {
          approved_at?: string | null;
          approved_by?: string | null;
          change_summary?: string | null;
          content_item_id: string;
          created_at?: string;
          created_by?: string | null;
          effective_from?: string | null;
          effective_until?: string | null;
          fact_reviewer_id?: string | null;
          id?: string;
          last_verified_at?: string | null;
          legal_reviewer_id?: string | null;
          methodology?: string | null;
          next_review_at?: string | null;
          published_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          version_no: number;
        };
        Update: {
          approved_at?: string | null;
          approved_by?: string | null;
          change_summary?: string | null;
          content_item_id?: string;
          created_at?: string;
          created_by?: string | null;
          effective_from?: string | null;
          effective_until?: string | null;
          fact_reviewer_id?: string | null;
          id?: string;
          last_verified_at?: string | null;
          legal_reviewer_id?: string | null;
          methodology?: string | null;
          next_review_at?: string | null;
          published_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          version_no?: number;
        };
        Relationships: [
          {
            foreignKeyName: "content_versions_content_item_id_fkey";
            columns: ["content_item_id"];
            isOneToOne: false;
            referencedRelation: "content_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "content_versions_content_item_id_fkey";
            columns: ["content_item_id"];
            isOneToOne: false;
            referencedRelation: "published_country_content";
            referencedColumns: ["content_item_id"];
          }
        ];
      };
      countries: {
        Row: {
          active: boolean;
          code: Database["public"]["Enums"]["country_code"];
          created_at: string;
          display_order: number;
          iso2: string;
        };
        Insert: {
          active?: boolean;
          code: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          display_order: number;
          iso2: string;
        };
        Update: {
          active?: boolean;
          code?: Database["public"]["Enums"]["country_code"];
          created_at?: string;
          display_order?: number;
          iso2?: string;
        };
        Relationships: [];
      };
      country_comparison_score_translations: {
        Row: {
          explanation: string;
          locale: Database["public"]["Enums"]["app_locale"];
          score_id: string;
          status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          explanation: string;
          locale: Database["public"]["Enums"]["app_locale"];
          score_id: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          explanation?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          score_id?: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "country_comparison_score_translations_score_id_fkey";
            columns: ["score_id"];
            isOneToOne: false;
            referencedRelation: "country_comparison_scores";
            referencedColumns: ["id"];
          }
        ];
      };
      country_comparison_scores: {
        Row: {
          confidence: number;
          country_code: Database["public"]["Enums"]["country_code"];
          criterion_id: string;
          effective_at: string | null;
          id: string;
          last_verified_at: string | null;
          methodology: string | null;
          next_review_at: string | null;
          reviewed_by: string | null;
          score: number;
          source_summary: Json;
          status: Database["public"]["Enums"]["content_status"];
        };
        Insert: {
          confidence?: number;
          country_code: Database["public"]["Enums"]["country_code"];
          criterion_id: string;
          effective_at?: string | null;
          id?: string;
          last_verified_at?: string | null;
          methodology?: string | null;
          next_review_at?: string | null;
          reviewed_by?: string | null;
          score: number;
          source_summary?: Json;
          status?: Database["public"]["Enums"]["content_status"];
        };
        Update: {
          confidence?: number;
          country_code?: Database["public"]["Enums"]["country_code"];
          criterion_id?: string;
          effective_at?: string | null;
          id?: string;
          last_verified_at?: string | null;
          methodology?: string | null;
          next_review_at?: string | null;
          reviewed_by?: string | null;
          score?: number;
          source_summary?: Json;
          status?: Database["public"]["Enums"]["content_status"];
        };
        Relationships: [
          {
            foreignKeyName: "country_comparison_scores_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "country_comparison_scores_criterion_id_fkey";
            columns: ["criterion_id"];
            isOneToOne: false;
            referencedRelation: "comparison_criteria";
            referencedColumns: ["id"];
          }
        ];
      };
      country_translations: {
        Row: {
          country_code: Database["public"]["Enums"]["country_code"];
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          seo_description: string | null;
          seo_title: string | null;
          short_summary: string | null;
          translation_status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          country_code: Database["public"]["Enums"]["country_code"];
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_summary?: string | null;
          translation_status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          country_code?: Database["public"]["Enums"]["country_code"];
          locale?: Database["public"]["Enums"]["app_locale"];
          name?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_summary?: string | null;
          translation_status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "country_translations_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      course_enrollments: {
        Row: {
          completed_at: string | null;
          course_id: string;
          enrolled_at: string;
          status: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          course_id: string;
          enrolled_at?: string;
          status?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          course_id?: string;
          enrolled_at?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      course_lesson_translations: {
        Row: {
          body: Json;
          captions_path: string | null;
          lesson_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          status: Database["public"]["Enums"]["translation_status"];
          title: string;
        };
        Insert: {
          body?: Json;
          captions_path?: string | null;
          lesson_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          status?: Database["public"]["Enums"]["translation_status"];
          title: string;
        };
        Update: {
          body?: Json;
          captions_path?: string | null;
          lesson_id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          status?: Database["public"]["Enums"]["translation_status"];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_lesson_translations_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "course_lessons";
            referencedColumns: ["id"];
          }
        ];
      };
      course_lessons: {
        Row: {
          created_at: string;
          display_order: number;
          duration_minutes: number | null;
          id: string;
          lesson_type: string;
          media_path: string | null;
          module_id: string;
          status: Database["public"]["Enums"]["content_status"];
          transcript_path: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_order?: number;
          duration_minutes?: number | null;
          id?: string;
          lesson_type: string;
          media_path?: string | null;
          module_id: string;
          status?: Database["public"]["Enums"]["content_status"];
          transcript_path?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_order?: number;
          duration_minutes?: number | null;
          id?: string;
          lesson_type?: string;
          media_path?: string | null;
          module_id?: string;
          status?: Database["public"]["Enums"]["content_status"];
          transcript_path?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "course_modules";
            referencedColumns: ["id"];
          }
        ];
      };
      course_module_translations: {
        Row: {
          locale: Database["public"]["Enums"]["app_locale"];
          module_id: string;
          summary: string | null;
          title: string;
        };
        Insert: {
          locale: Database["public"]["Enums"]["app_locale"];
          module_id: string;
          summary?: string | null;
          title: string;
        };
        Update: {
          locale?: Database["public"]["Enums"]["app_locale"];
          module_id?: string;
          summary?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_module_translations_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "course_modules";
            referencedColumns: ["id"];
          }
        ];
      };
      course_modules: {
        Row: {
          course_id: string;
          created_at: string;
          display_order: number;
          id: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          display_order?: number;
          id?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          display_order?: number;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      course_translations: {
        Row: {
          course_id: string;
          description: Json;
          locale: Database["public"]["Enums"]["app_locale"];
          status: Database["public"]["Enums"]["translation_status"];
          summary: string | null;
          title: string;
        };
        Insert: {
          course_id: string;
          description?: Json;
          locale: Database["public"]["Enums"]["app_locale"];
          status?: Database["public"]["Enums"]["translation_status"];
          summary?: string | null;
          title: string;
        };
        Update: {
          course_id?: string;
          description?: Json;
          locale?: Database["public"]["Enums"]["app_locale"];
          status?: Database["public"]["Enums"]["translation_status"];
          summary?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_translations_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      courses: {
        Row: {
          code: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          created_by: string | null;
          estimated_minutes: number | null;
          id: string;
          next_review_at: string | null;
          public_access: boolean;
          published_at: string | null;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          next_review_at?: string | null;
          public_access?: boolean;
          published_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          next_review_at?: string | null;
          public_access?: boolean;
          published_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "courses_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      crm_activities: {
        Row: {
          activity_type: string;
          actor_id: string | null;
          contact_id: string;
          created_at: string;
          id: number;
          lead_id: string | null;
          metadata: Json;
        };
        Insert: {
          activity_type: string;
          actor_id?: string | null;
          contact_id: string;
          created_at?: string;
          id?: never;
          lead_id?: string | null;
          metadata?: Json;
        };
        Update: {
          activity_type?: string;
          actor_id?: string | null;
          contact_id?: string;
          created_at?: string;
          id?: never;
          lead_id?: string | null;
          metadata?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_activities_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
      crm_contact_tags: {
        Row: {
          added_at: string;
          added_by: string | null;
          contact_id: string;
          tag_id: string;
        };
        Insert: {
          added_at?: string;
          added_by?: string | null;
          contact_id: string;
          tag_id: string;
        };
        Update: {
          added_at?: string;
          added_by?: string | null;
          contact_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crm_contact_tags_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_contact_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "crm_tags";
            referencedColumns: ["id"];
          }
        ];
      };
      crm_contacts: {
        Row: {
          created_at: string;
          created_by: string | null;
          data_minimization_review_at: string | null;
          display_name_ciphertext: string | null;
          display_name_iv: string | null;
          display_name_tag: string | null;
          do_not_contact: boolean;
          email_ciphertext: string | null;
          email_iv: string | null;
          email_lookup_hash: string | null;
          email_tag: string | null;
          encryption_key_version: number;
          id: string;
          linked_user_id: string | null;
          phone_ciphertext: string | null;
          phone_iv: string | null;
          phone_lookup_hash: string | null;
          phone_tag: string | null;
          preferred_locale: Database["public"]["Enums"]["app_locale"] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          data_minimization_review_at?: string | null;
          display_name_ciphertext?: string | null;
          display_name_iv?: string | null;
          display_name_tag?: string | null;
          do_not_contact?: boolean;
          email_ciphertext?: string | null;
          email_iv?: string | null;
          email_lookup_hash?: string | null;
          email_tag?: string | null;
          encryption_key_version?: number;
          id?: string;
          linked_user_id?: string | null;
          phone_ciphertext?: string | null;
          phone_iv?: string | null;
          phone_lookup_hash?: string | null;
          phone_tag?: string | null;
          preferred_locale?: Database["public"]["Enums"]["app_locale"] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          data_minimization_review_at?: string | null;
          display_name_ciphertext?: string | null;
          display_name_iv?: string | null;
          display_name_tag?: string | null;
          do_not_contact?: boolean;
          email_ciphertext?: string | null;
          email_iv?: string | null;
          email_lookup_hash?: string | null;
          email_tag?: string | null;
          encryption_key_version?: number;
          id?: string;
          linked_user_id?: string | null;
          phone_ciphertext?: string | null;
          phone_iv?: string | null;
          phone_lookup_hash?: string | null;
          phone_tag?: string | null;
          preferred_locale?: Database["public"]["Enums"]["app_locale"] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      crm_notes: {
        Row: {
          author_id: string | null;
          body: string;
          contact_id: string;
          created_at: string;
          id: string;
          lead_id: string | null;
          sensitivity: Database["public"]["Enums"]["risk_level"];
          supersedes_id: string | null;
        };
        Insert: {
          author_id?: string | null;
          body: string;
          contact_id: string;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          sensitivity?: Database["public"]["Enums"]["risk_level"];
          supersedes_id?: string | null;
        };
        Update: {
          author_id?: string | null;
          body?: string;
          contact_id?: string;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          sensitivity?: Database["public"]["Enums"]["risk_level"];
          supersedes_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "crm_notes_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_notes_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_notes_supersedes_id_fkey";
            columns: ["supersedes_id"];
            isOneToOne: false;
            referencedRelation: "crm_notes";
            referencedColumns: ["id"];
          }
        ];
      };
      crm_tags: {
        Row: {
          color_token: string | null;
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          color_token?: string | null;
          created_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          color_token?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      crm_tasks: {
        Row: {
          assigned_to: string | null;
          completed_at: string | null;
          contact_id: string | null;
          created_at: string;
          created_by: string | null;
          due_at: string | null;
          id: string;
          lead_id: string | null;
          status: Database["public"]["Enums"]["task_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          completed_at?: string | null;
          contact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          due_at?: string | null;
          id?: string;
          lead_id?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          completed_at?: string | null;
          contact_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          due_at?: string | null;
          id?: string;
          lead_id?: string | null;
          status?: Database["public"]["Enums"]["task_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crm_tasks_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crm_tasks_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
      data_subject_requests: {
        Row: {
          assigned_to: string | null;
          completed_at: string | null;
          created_at: string;
          description: string | null;
          due_at: string | null;
          id: string;
          identity_verification_method: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          request_type: Database["public"]["Enums"]["data_request_type"];
          resolution_summary: string | null;
          status: Database["public"]["Enums"]["data_request_status"];
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          identity_verification_method?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          request_type: Database["public"]["Enums"]["data_request_type"];
          resolution_summary?: string | null;
          status?: Database["public"]["Enums"]["data_request_status"];
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          identity_verification_method?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          request_type?: Database["public"]["Enums"]["data_request_type"];
          resolution_summary?: string | null;
          status?: Database["public"]["Enums"]["data_request_status"];
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      document_access_events: {
        Row: {
          action: string;
          actor_id: string | null;
          case_id: string;
          created_at: string;
          document_id: string;
          id: number;
          ip_prefix: string | null;
          reason: string | null;
          request_id: string | null;
          user_agent_hash: string | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          case_id: string;
          created_at?: string;
          document_id: string;
          id?: never;
          ip_prefix?: string | null;
          reason?: string | null;
          request_id?: string | null;
          user_agent_hash?: string | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          case_id?: string;
          created_at?: string;
          document_id?: string;
          id?: never;
          ip_prefix?: string | null;
          reason?: string | null;
          request_id?: string | null;
          user_agent_hash?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "document_access_events_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "document_access_events_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "case_documents";
            referencedColumns: ["id"];
          }
        ];
      };
      document_access_grants: {
        Row: {
          case_id: string;
          created_at: string;
          document_id: string | null;
          expires_at: string;
          granted_by: string | null;
          grantee_user_id: string;
          id: string;
          permission: string;
          reason: string;
          revoked_at: string | null;
          revoked_by: string | null;
          starts_at: string;
        };
        Insert: {
          case_id: string;
          created_at?: string;
          document_id?: string | null;
          expires_at: string;
          granted_by?: string | null;
          grantee_user_id: string;
          id?: string;
          permission: string;
          reason: string;
          revoked_at?: string | null;
          revoked_by?: string | null;
          starts_at?: string;
        };
        Update: {
          case_id?: string;
          created_at?: string;
          document_id?: string | null;
          expires_at?: string;
          granted_by?: string | null;
          grantee_user_id?: string;
          id?: string;
          permission?: string;
          reason?: string;
          revoked_at?: string | null;
          revoked_by?: string | null;
          starts_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "document_access_grants_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "document_access_grants_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "case_documents";
            referencedColumns: ["id"];
          }
        ];
      };
      faq_items: {
        Row: {
          category: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          display_order: number;
          id: string;
          next_review_at: string | null;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        Insert: {
          category: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          display_order?: number;
          id?: string;
          next_review_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          category?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          display_order?: number;
          id?: string;
          next_review_at?: string | null;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "faq_items_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      faq_translations: {
        Row: {
          answer: Json;
          faq_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          question: string;
          status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          answer?: Json;
          faq_id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          question: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          answer?: Json;
          faq_id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          question?: string;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "faq_translations_faq_id_fkey";
            columns: ["faq_id"];
            isOneToOne: false;
            referencedRelation: "faq_items";
            referencedColumns: ["id"];
          }
        ];
      };
      feature_flags: {
        Row: {
          conditions: Json;
          enabled: boolean;
          key: string;
          launch_requirements: Json;
          public_readable: boolean;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          conditions?: Json;
          enabled?: boolean;
          key: string;
          launch_requirements?: Json;
          public_readable?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          conditions?: Json;
          enabled?: boolean;
          key?: string;
          launch_requirements?: Json;
          public_readable?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      glossary_terms: {
        Row: {
          canonical_term: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          id: string;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        Insert: {
          canonical_term: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          id?: string;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          canonical_term?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          id?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "glossary_terms_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      glossary_translations: {
        Row: {
          explanation: string;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: Database["public"]["Enums"]["translation_status"];
          term_id: string;
        };
        Insert: {
          explanation: string;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
          term_id: string;
        };
        Update: {
          explanation?: string;
          label?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
          term_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "glossary_translations_term_id_fkey";
            columns: ["term_id"];
            isOneToOne: false;
            referencedRelation: "glossary_terms";
            referencedColumns: ["id"];
          }
        ];
      };
      intake_submissions: {
        Row: {
          consent_version: string;
          consented_at: string;
          contact_id: string;
          country_interest: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          id: string;
          lead_id: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          risk_status: string;
          source_code: string | null;
          structured_answers: Json;
        };
        Insert: {
          consent_version: string;
          consented_at: string;
          contact_id: string;
          country_interest?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          risk_status?: string;
          source_code?: string | null;
          structured_answers?: Json;
        };
        Update: {
          consent_version?: string;
          consented_at?: string;
          contact_id?: string;
          country_interest?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          risk_status?: string;
          source_code?: string | null;
          structured_answers?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "intake_submissions_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "intake_submissions_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
      lead_assignments: {
        Row: {
          advisor_id: string | null;
          assigned_at: string;
          assigned_by: string | null;
          id: number;
          lead_id: string;
          reason: string | null;
          unassigned_at: string | null;
        };
        Insert: {
          advisor_id?: string | null;
          assigned_at?: string;
          assigned_by?: string | null;
          id?: never;
          lead_id: string;
          reason?: string | null;
          unassigned_at?: string | null;
        };
        Update: {
          advisor_id?: string | null;
          assigned_at?: string;
          assigned_by?: string | null;
          id?: never;
          lead_id?: string;
          reason?: string | null;
          unassigned_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lead_assignments_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
      leads: {
        Row: {
          assigned_advisor_id: string | null;
          closed_reason: string | null;
          contact_id: string;
          country_interest: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          goal_code: string | null;
          id: string;
          next_action_at: string | null;
          source_code: string | null;
          status: Database["public"]["Enums"]["lead_status"];
          updated_at: string;
        };
        Insert: {
          assigned_advisor_id?: string | null;
          closed_reason?: string | null;
          contact_id: string;
          country_interest?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          goal_code?: string | null;
          id?: string;
          next_action_at?: string | null;
          source_code?: string | null;
          status?: Database["public"]["Enums"]["lead_status"];
          updated_at?: string;
        };
        Update: {
          assigned_advisor_id?: string | null;
          closed_reason?: string | null;
          contact_id?: string;
          country_interest?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          goal_code?: string | null;
          id?: string;
          next_action_at?: string | null;
          source_code?: string | null;
          status?: Database["public"]["Enums"]["lead_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "crm_contacts";
            referencedColumns: ["id"];
          }
        ];
      };
      lesson_progress: {
        Row: {
          completed_at: string | null;
          last_position: Json;
          lesson_id: string;
          progress_percent: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          last_position?: Json;
          lesson_id: string;
          progress_percent?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          last_position?: Json;
          lesson_id?: string;
          progress_percent?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "course_lessons";
            referencedColumns: ["id"];
          }
        ];
      };
      moderation_actions: {
        Row: {
          action_type: Database["public"]["Enums"]["moderation_action_type"];
          comment_id: string | null;
          created_at: string;
          expires_at: string | null;
          id: number;
          moderator_id: string;
          post_id: string | null;
          reason_code: string;
          reason_detail: string | null;
          report_id: string | null;
          target_user_id: string | null;
        };
        Insert: {
          action_type: Database["public"]["Enums"]["moderation_action_type"];
          comment_id?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: never;
          moderator_id: string;
          post_id?: string | null;
          reason_code: string;
          reason_detail?: string | null;
          report_id?: string | null;
          target_user_id?: string | null;
        };
        Update: {
          action_type?: Database["public"]["Enums"]["moderation_action_type"];
          comment_id?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: never;
          moderator_id?: string;
          post_id?: string | null;
          reason_code?: string;
          reason_detail?: string | null;
          report_id?: string | null;
          target_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "moderation_actions_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "community_comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "moderation_actions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "moderation_actions_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "community_reports";
            referencedColumns: ["id"];
          }
        ];
      };
      notification_deliveries: {
        Row: {
          attempt_count: number;
          channel: Database["public"]["Enums"]["notification_channel"];
          created_at: string;
          delivered_at: string | null;
          id: string;
          last_error_code: string | null;
          notification_id: string;
          provider: string | null;
          provider_message_id: string | null;
          sent_at: string | null;
          status: Database["public"]["Enums"]["delivery_status"];
        };
        Insert: {
          attempt_count?: number;
          channel: Database["public"]["Enums"]["notification_channel"];
          created_at?: string;
          delivered_at?: string | null;
          id?: string;
          last_error_code?: string | null;
          notification_id: string;
          provider?: string | null;
          provider_message_id?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["delivery_status"];
        };
        Update: {
          attempt_count?: number;
          channel?: Database["public"]["Enums"]["notification_channel"];
          created_at?: string;
          delivered_at?: string | null;
          id?: string;
          last_error_code?: string | null;
          notification_id?: string;
          provider?: string | null;
          provider_message_id?: string | null;
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["delivery_status"];
        };
        Relationships: [
          {
            foreignKeyName: "notification_deliveries_notification_id_fkey";
            columns: ["notification_id"];
            isOneToOne: false;
            referencedRelation: "notifications";
            referencedColumns: ["id"];
          }
        ];
      };
      notification_preferences: {
        Row: {
          category: string;
          channel: Database["public"]["Enums"]["notification_channel"];
          enabled: boolean;
          locale: Database["public"]["Enums"]["app_locale"];
          quiet_hours_end: string | null;
          quiet_hours_start: string | null;
          timezone: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category: string;
          channel: Database["public"]["Enums"]["notification_channel"];
          enabled?: boolean;
          locale?: Database["public"]["Enums"]["app_locale"];
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          timezone?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          channel?: Database["public"]["Enums"]["notification_channel"];
          enabled?: boolean;
          locale?: Database["public"]["Enums"]["app_locale"];
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          timezone?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          body_key: string;
          category: string;
          created_at: string;
          expires_at: string | null;
          id: string;
          read_at: string | null;
          safe_variables: Json;
          target_path: string | null;
          title_key: string;
          user_id: string;
        };
        Insert: {
          body_key: string;
          category: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          read_at?: string | null;
          safe_variables?: Json;
          target_path?: string | null;
          title_key: string;
          user_id: string;
        };
        Update: {
          body_key?: string;
          category?: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          read_at?: string | null;
          safe_variables?: Json;
          target_path?: string | null;
          title_key?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          description_snapshot: string;
          id: string;
          order_id: string;
          package_code_snapshot: string;
          package_id: string;
          package_price_id: string;
          quantity: number;
          total_amount: number | null;
          unit_amount: number;
        };
        Insert: {
          created_at?: string;
          description_snapshot: string;
          id?: string;
          order_id: string;
          package_code_snapshot: string;
          package_id: string;
          package_price_id: string;
          quantity?: number;
          total_amount?: number | null;
          unit_amount: number;
        };
        Update: {
          created_at?: string;
          description_snapshot?: string;
          id?: string;
          order_id?: string;
          package_code_snapshot?: string;
          package_id?: string;
          package_price_id?: string;
          quantity?: number;
          total_amount?: number | null;
          unit_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_package_price_id_fkey";
            columns: ["package_price_id"];
            isOneToOne: false;
            referencedRelation: "package_prices";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          accepted_at: string;
          accepted_refund_policy_version: string;
          accepted_terms_version: string;
          created_at: string;
          currency: string;
          discount_amount: number;
          expires_at: string | null;
          fulfilled_at: string | null;
          id: string;
          metadata: Json;
          paid_at: string | null;
          reference_code: string;
          status: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id: string | null;
          stripe_customer_id: string | null;
          subtotal_amount: number;
          tax_amount: number;
          total_amount: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          accepted_at: string;
          accepted_refund_policy_version: string;
          accepted_terms_version: string;
          created_at?: string;
          currency: string;
          discount_amount?: number;
          expires_at?: string | null;
          fulfilled_at?: string | null;
          id?: string;
          metadata?: Json;
          paid_at?: string | null;
          reference_code?: string;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string | null;
          stripe_customer_id?: string | null;
          subtotal_amount?: number;
          tax_amount?: number;
          total_amount?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          accepted_at?: string;
          accepted_refund_policy_version?: string;
          accepted_terms_version?: string;
          created_at?: string;
          currency?: string;
          discount_amount?: number;
          expires_at?: string | null;
          fulfilled_at?: string | null;
          id?: string;
          metadata?: Json;
          paid_at?: string | null;
          reference_code?: string;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string | null;
          stripe_customer_id?: string | null;
          subtotal_amount?: number;
          tax_amount?: number;
          total_amount?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      outbox_events: {
        Row: {
          aggregate_id: string | null;
          aggregate_type: string | null;
          attempts: number;
          available_at: string;
          created_at: string;
          event_type: string;
          id: string;
          last_error: string | null;
          locked_at: string | null;
          locked_by: string | null;
          payload: Json;
          processed_at: string | null;
        };
        Insert: {
          aggregate_id?: string | null;
          aggregate_type?: string | null;
          attempts?: number;
          available_at?: string;
          created_at?: string;
          event_type: string;
          id?: string;
          last_error?: string | null;
          locked_at?: string | null;
          locked_by?: string | null;
          payload?: Json;
          processed_at?: string | null;
        };
        Update: {
          aggregate_id?: string | null;
          aggregate_type?: string | null;
          attempts?: number;
          available_at?: string;
          created_at?: string;
          event_type?: string;
          id?: string;
          last_error?: string | null;
          locked_at?: string | null;
          locked_by?: string | null;
          payload?: Json;
          processed_at?: string | null;
        };
        Relationships: [];
      };
      package_feature_translations: {
        Row: {
          detail: string | null;
          feature_id: string;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
        };
        Insert: {
          detail?: string | null;
          feature_id: string;
          label: string;
          locale: Database["public"]["Enums"]["app_locale"];
        };
        Update: {
          detail?: string | null;
          feature_id?: string;
          label?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
        };
        Relationships: [
          {
            foreignKeyName: "package_feature_translations_feature_id_fkey";
            columns: ["feature_id"];
            isOneToOne: false;
            referencedRelation: "package_features";
            referencedColumns: ["id"];
          }
        ];
      };
      package_features: {
        Row: {
          code: string;
          display_order: number;
          id: string;
          included: boolean;
          package_id: string;
        };
        Insert: {
          code: string;
          display_order?: number;
          id?: string;
          included?: boolean;
          package_id: string;
        };
        Update: {
          code?: string;
          display_order?: number;
          id?: string;
          included?: boolean;
          package_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "package_features_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "package_features_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
      package_prices: {
        Row: {
          active: boolean;
          created_at: string;
          currency: string;
          id: string;
          package_id: string;
          stripe_price_id: string | null;
          unit_amount: number;
          valid_from: string | null;
          valid_until: string | null;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          currency: string;
          id?: string;
          package_id: string;
          stripe_price_id?: string | null;
          unit_amount: number;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          currency?: string;
          id?: string;
          package_id?: string;
          stripe_price_id?: string | null;
          unit_amount?: number;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "package_prices_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "package_prices_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          failure_code: string | null;
          failure_message_safe: string | null;
          id: string;
          last_provider_event_at: string | null;
          order_id: string;
          provider: string;
          provider_charge_id: string | null;
          provider_payment_intent_id: string | null;
          status: Database["public"]["Enums"]["payment_status"];
          succeeded_at: string | null;
          updated_at: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency: string;
          failure_code?: string | null;
          failure_message_safe?: string | null;
          id?: string;
          last_provider_event_at?: string | null;
          order_id: string;
          provider?: string;
          provider_charge_id?: string | null;
          provider_payment_intent_id?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          succeeded_at?: string | null;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          failure_code?: string | null;
          failure_message_safe?: string | null;
          id?: string;
          last_provider_event_at?: string | null;
          order_id?: string;
          provider?: string;
          provider_charge_id?: string | null;
          provider_payment_intent_id?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          succeeded_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_memberships: {
        Row: {
          jurisdictions: string[];
          license_reference: string | null;
          license_type: string | null;
          organization_id: string;
          status: string;
          title: string | null;
          user_id: string;
          valid_from: string | null;
          valid_until: string | null;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          jurisdictions?: string[];
          license_reference?: string | null;
          license_type?: string | null;
          organization_id: string;
          status?: string;
          title?: string | null;
          user_id: string;
          valid_from?: string | null;
          valid_until?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          jurisdictions?: string[];
          license_reference?: string | null;
          license_type?: string | null;
          organization_id?: string;
          status?: string;
          title?: string | null;
          user_id?: string;
          valid_from?: string | null;
          valid_until?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_memberships_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "professional_organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_organizations: {
        Row: {
          country: string | null;
          created_at: string;
          id: string;
          internal_notes: string | null;
          legal_name: string;
          public_name: string;
          updated_at: string;
          verification_expires_at: string | null;
          verification_status: string;
          verified_at: string | null;
          verified_by: string | null;
          website_url: string | null;
        };
        Insert: {
          country?: string | null;
          created_at?: string;
          id?: string;
          internal_notes?: string | null;
          legal_name: string;
          public_name: string;
          updated_at?: string;
          verification_expires_at?: string | null;
          verification_status?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          website_url?: string | null;
        };
        Update: {
          country?: string | null;
          created_at?: string;
          id?: string;
          internal_notes?: string | null;
          legal_name?: string;
          public_name?: string;
          updated_at?: string;
          verification_expires_at?: string | null;
          verification_status?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"];
          avatar_path: string | null;
          country_of_residence: string | null;
          created_at: string;
          display_name: string | null;
          force_password_change: boolean;
          id: string;
          last_seen_at: string | null;
          preferred_locale: Database["public"]["Enums"]["app_locale"];
          privacy_accepted_at: string | null;
          privacy_version: string | null;
          terms_accepted_at: string | null;
          terms_version: string | null;
          timezone: string;
          updated_at: string;
        };
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"];
          avatar_path?: string | null;
          country_of_residence?: string | null;
          created_at?: string;
          display_name?: string | null;
          force_password_change?: boolean;
          id: string;
          last_seen_at?: string | null;
          preferred_locale?: Database["public"]["Enums"]["app_locale"];
          privacy_accepted_at?: string | null;
          privacy_version?: string | null;
          terms_accepted_at?: string | null;
          terms_version?: string | null;
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"];
          avatar_path?: string | null;
          country_of_residence?: string | null;
          created_at?: string;
          display_name?: string | null;
          force_password_change?: boolean;
          id?: string;
          last_seen_at?: string | null;
          preferred_locale?: Database["public"]["Enums"]["app_locale"];
          privacy_accepted_at?: string | null;
          privacy_version?: string | null;
          terms_accepted_at?: string | null;
          terms_version?: string | null;
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      refunds: {
        Row: {
          amount: number;
          approved_by: string | null;
          created_at: string;
          currency: string;
          id: string;
          payment_id: string;
          provider_refund_id: string | null;
          provider_response_safe: Json;
          reason_code: string;
          reason_detail: string | null;
          requested_by: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          amount: number;
          approved_by?: string | null;
          created_at?: string;
          currency: string;
          id?: string;
          payment_id: string;
          provider_refund_id?: string | null;
          provider_response_safe?: Json;
          reason_code: string;
          reason_detail?: string | null;
          requested_by?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          approved_by?: string | null;
          created_at?: string;
          currency?: string;
          id?: string;
          payment_id?: string;
          provider_refund_id?: string | null;
          provider_response_safe?: Json;
          reason_code?: string;
          reason_detail?: string | null;
          requested_by?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "refunds_payment_id_fkey";
            columns: ["payment_id"];
            isOneToOne: false;
            referencedRelation: "payments";
            referencedColumns: ["id"];
          }
        ];
      };
      security_events: {
        Row: {
          created_at: string;
          details: Json;
          event_type: string;
          id: number;
          ip_prefix: string | null;
          request_id: string | null;
          resolved_at: string | null;
          resolved_by: string | null;
          severity: Database["public"]["Enums"]["risk_level"];
          user_agent_hash: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          details?: Json;
          event_type: string;
          id?: never;
          ip_prefix?: string | null;
          request_id?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          severity: Database["public"]["Enums"]["risk_level"];
          user_agent_hash?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          details?: Json;
          event_type?: string;
          id?: never;
          ip_prefix?: string | null;
          request_id?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          severity?: Database["public"]["Enums"]["risk_level"];
          user_agent_hash?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      service_package_translations: {
        Row: {
          excludes_summary: string | null;
          full_description: Json;
          includes_summary: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          package_id: string;
          short_description: string | null;
          status: Database["public"]["Enums"]["translation_status"];
        };
        Insert: {
          excludes_summary?: string | null;
          full_description?: Json;
          includes_summary?: string | null;
          locale: Database["public"]["Enums"]["app_locale"];
          name: string;
          package_id: string;
          short_description?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Update: {
          excludes_summary?: string | null;
          full_description?: Json;
          includes_summary?: string | null;
          locale?: Database["public"]["Enums"]["app_locale"];
          name?: string;
          package_id?: string;
          short_description?: string | null;
          status?: Database["public"]["Enums"]["translation_status"];
        };
        Relationships: [
          {
            foreignKeyName: "service_package_translations_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "service_package_translations_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
      service_packages: {
        Row: {
          code: string;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          created_by: string | null;
          display_order: number;
          duration_days: number | null;
          id: string;
          remote_only: boolean;
          status: Database["public"]["Enums"]["package_status"];
          tier: number;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          code: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          duration_days?: number | null;
          id?: string;
          remote_only?: boolean;
          status?: Database["public"]["Enums"]["package_status"];
          tier: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          code?: string;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          display_order?: number;
          duration_days?: number | null;
          id?: string;
          remote_only?: boolean;
          status?: Database["public"]["Enums"]["package_status"];
          tier?: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "service_packages_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      site_settings: {
        Row: {
          description: string | null;
          is_public: boolean;
          key: string;
          updated_at: string;
          updated_by: string | null;
          value: Json;
        };
        Insert: {
          description?: string | null;
          is_public?: boolean;
          key: string;
          updated_at?: string;
          updated_by?: string | null;
          value?: Json;
        };
        Update: {
          description?: string | null;
          is_public?: boolean;
          key?: string;
          updated_at?: string;
          updated_by?: string | null;
          value?: Json;
        };
        Relationships: [];
      };
      staff_profiles: {
        Row: {
          capacity_per_week: number;
          countries: Database["public"]["Enums"]["country_code"][];
          created_at: string;
          internal_reference: string | null;
          locales: Database["public"]["Enums"]["app_locale"][];
          public_bio: string | null;
          status: Database["public"]["Enums"]["staff_status"];
          timezone: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          capacity_per_week?: number;
          countries?: Database["public"]["Enums"]["country_code"][];
          created_at?: string;
          internal_reference?: string | null;
          locales?: Database["public"]["Enums"]["app_locale"][];
          public_bio?: string | null;
          status?: Database["public"]["Enums"]["staff_status"];
          timezone?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          capacity_per_week?: number;
          countries?: Database["public"]["Enums"]["country_code"][];
          created_at?: string;
          internal_reference?: string | null;
          locales?: Database["public"]["Enums"]["app_locale"][];
          public_bio?: string | null;
          status?: Database["public"]["Enums"]["staff_status"];
          timezone?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      stripe_webhook_events: {
        Row: {
          api_version: string | null;
          attempts: number;
          event_type: string;
          last_error: string | null;
          livemode: boolean;
          object_id: string | null;
          payload_hash: string;
          processed_at: string | null;
          processing_status: string;
          received_at: string;
          stripe_event_id: string;
        };
        Insert: {
          api_version?: string | null;
          attempts?: number;
          event_type: string;
          last_error?: string | null;
          livemode: boolean;
          object_id?: string | null;
          payload_hash: string;
          processed_at?: string | null;
          processing_status?: string;
          received_at?: string;
          stripe_event_id: string;
        };
        Update: {
          api_version?: string | null;
          attempts?: number;
          event_type?: string;
          last_error?: string | null;
          livemode?: boolean;
          object_id?: string | null;
          payload_hash?: string;
          processed_at?: string | null;
          processing_status?: string;
          received_at?: string;
          stripe_event_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          granted_at: string;
          granted_by: string | null;
          reason: string | null;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          granted_at?: string;
          granted_by?: string | null;
          reason?: string | null;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          granted_at?: string;
          granted_by?: string | null;
          reason?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      whatsapp_templates: {
        Row: {
          active: boolean;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          created_at: string;
          created_by: string | null;
          id: string;
          locale: Database["public"]["Enums"]["app_locale"];
          message_template: string;
          package_id: string | null;
          page_code: string | null;
          phone_e164: string | null;
          service_code: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          active?: boolean;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          locale: Database["public"]["Enums"]["app_locale"];
          message_template: string;
          package_id?: string | null;
          page_code?: string | null;
          phone_e164?: string | null;
          service_code?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          active?: boolean;
          country_code?: Database["public"]["Enums"]["country_code"] | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          locale?: Database["public"]["Enums"]["app_locale"];
          message_template?: string;
          package_id?: string | null;
          page_code?: string | null;
          phone_e164?: string | null;
          service_code?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "whatsapp_templates_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "public_package_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "whatsapp_templates_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "service_packages";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      public_package_catalog: {
        Row: {
          code: string | null;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          duration_days: number | null;
          excludes_summary: string | null;
          full_description: Json | null;
          id: string | null;
          includes_summary: string | null;
          locale: Database["public"]["Enums"]["app_locale"] | null;
          name: string | null;
          remote_only: boolean | null;
          short_description: string | null;
          tier: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "service_packages_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
      published_country_content: {
        Row: {
          body: Json | null;
          content_item_id: string | null;
          content_version_id: string | null;
          country_code: Database["public"]["Enums"]["country_code"] | null;
          information_type: Database["public"]["Enums"]["information_type"] | null;
          last_verified_at: string | null;
          locale: Database["public"]["Enums"]["app_locale"] | null;
          next_review_at: string | null;
          risk_level: Database["public"]["Enums"]["risk_level"] | null;
          section_key: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string | null;
          summary: string | null;
          title: string | null;
          version_no: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "content_items_country_code_fkey";
            columns: ["country_code"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["code"];
          }
        ];
      };
    };
    Functions: {
      admin_set_user_role: {
        Args: {
          p_enabled: boolean;
          p_reason: string;
          p_role: Database["public"]["Enums"]["app_role"];
          p_target_user_id: string;
        };
        Returns: undefined;
      };
      bootstrap_initial_admin: {
        Args: { p_expected_email: string; p_user_id: string };
        Returns: undefined;
      };
      complete_privileged_onboarding: { Args: never; Returns: undefined };
      complete_required_password_change: { Args: never; Returns: undefined };
      mark_notification_read: {
        Args: { p_notification_id: string };
        Returns: undefined;
      };
      search_published_content: {
        Args: {
          p_limit?: number;
          p_locale: Database["public"]["Enums"]["app_locale"];
          p_query: string;
        };
        Returns: {
          country_code: Database["public"]["Enums"]["country_code"];
          last_verified_at: string;
          section_key: string;
          slug: string;
          summary: string;
          title: string;
        }[];
      };
      update_my_profile: {
        Args: {
          p_country_of_residence?: string;
          p_display_name: string;
          p_preferred_locale: Database["public"]["Enums"]["app_locale"];
          p_timezone: string;
        };
        Returns: {
          account_status: Database["public"]["Enums"]["account_status"];
          avatar_path: string | null;
          country_of_residence: string | null;
          created_at: string;
          display_name: string | null;
          force_password_change: boolean;
          id: string;
          last_seen_at: string | null;
          preferred_locale: Database["public"]["Enums"]["app_locale"];
          privacy_accepted_at: string | null;
          privacy_version: string | null;
          terms_accepted_at: string | null;
          terms_version: string | null;
          timezone: string;
          updated_at: string;
        };
        SetofOptions: {
          from: "*";
          to: "profiles";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
    };
    Enums: {
      account_status: "active" | "invited" | "suspended" | "closed";
      ai_message_role: "user" | "assistant" | "system";
      app_locale: "ht" | "fr" | "es" | "pt" | "en";
      app_role:
        | "user"
        | "advisor"
        | "professional"
        | "content_editor"
        | "moderator"
        | "admin"
        | "super_admin";
      appointment_status: "hold" | "confirmed" | "completed" | "cancelled" | "no_show" | "expired";
      case_participant_role: "client" | "advisor" | "professional" | "observer";
      case_status:
        | "intake"
        | "awaiting_payment"
        | "active"
        | "waiting_user"
        | "waiting_third_party"
        | "review"
        | "completed"
        | "cancelled"
        | "archived";
      community_content_status: "draft" | "published" | "hidden" | "removed" | "under_review";
      community_report_status:
        "open" | "triaged" | "actioned" | "dismissed" | "appealed" | "closed";
      consent_type:
        | "terms"
        | "privacy"
        | "marketing"
        | "whatsapp"
        | "document_processing"
        | "professional_share"
        | "recording"
        | "ai_processing"
        | "cookies";
      content_status:
        | "draft"
        | "fact_check"
        | "legal_review"
        | "translation_review"
        | "approved"
        | "scheduled"
        | "published"
        | "changes_requested"
        | "expired"
        | "archived";
      country_code: "usa" | "chile" | "brazil" | "mexico";
      data_request_status:
        "received" | "identity_check" | "in_progress" | "fulfilled" | "denied" | "cancelled";
      data_request_type: "access" | "correct" | "delete" | "export" | "restrict" | "object";
      delivery_status: "queued" | "sent" | "delivered" | "failed" | "suppressed";
      document_classification: "standard" | "confidential" | "highly_sensitive";
      document_scan_status:
        | "uploading"
        | "pending_scan"
        | "scanning"
        | "clean"
        | "rejected"
        | "infected"
        | "error"
        | "deleted";
      information_type: "official" | "practical" | "community" | "warning" | "commercial";
      lead_status:
        | "new"
        | "triage"
        | "qualified"
        | "appointment_pending"
        | "proposal_sent"
        | "converted"
        | "not_eligible"
        | "closed"
        | "spam"
        | "do_not_contact";
      moderation_action_type:
        | "warn"
        | "hide_content"
        | "remove_content"
        | "mute"
        | "suspend"
        | "ban"
        | "restore"
        | "dismiss_report";
      notification_channel: "in_app" | "email" | "sms" | "whatsapp";
      order_status:
        | "draft"
        | "pending"
        | "paid"
        | "fulfilled"
        | "expired"
        | "cancelled"
        | "partially_refunded"
        | "refunded"
        | "disputed";
      package_status: "draft" | "active" | "paused" | "archived";
      payment_status:
        | "requires_action"
        | "processing"
        | "succeeded"
        | "failed"
        | "cancelled"
        | "partially_refunded"
        | "refunded"
        | "disputed";
      risk_level: "low" | "medium" | "high" | "critical";
      staff_status: "invited" | "active" | "suspended" | "inactive";
      task_status:
        "todo" | "in_progress" | "blocked" | "submitted" | "approved" | "rejected" | "done";
      translation_status:
        "missing" | "draft" | "machine_draft" | "review" | "approved" | "published";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "invited", "suspended", "closed"],
      ai_message_role: ["user", "assistant", "system"],
      app_locale: ["ht", "fr", "es", "pt", "en"],
      app_role: [
        "user",
        "advisor",
        "professional",
        "content_editor",
        "moderator",
        "admin",
        "super_admin"
      ],
      appointment_status: ["hold", "confirmed", "completed", "cancelled", "no_show", "expired"],
      case_participant_role: ["client", "advisor", "professional", "observer"],
      case_status: [
        "intake",
        "awaiting_payment",
        "active",
        "waiting_user",
        "waiting_third_party",
        "review",
        "completed",
        "cancelled",
        "archived"
      ],
      community_content_status: ["draft", "published", "hidden", "removed", "under_review"],
      community_report_status: ["open", "triaged", "actioned", "dismissed", "appealed", "closed"],
      consent_type: [
        "terms",
        "privacy",
        "marketing",
        "whatsapp",
        "document_processing",
        "professional_share",
        "recording",
        "ai_processing",
        "cookies"
      ],
      content_status: [
        "draft",
        "fact_check",
        "legal_review",
        "translation_review",
        "approved",
        "scheduled",
        "published",
        "changes_requested",
        "expired",
        "archived"
      ],
      country_code: ["usa", "chile", "brazil", "mexico"],
      data_request_status: [
        "received",
        "identity_check",
        "in_progress",
        "fulfilled",
        "denied",
        "cancelled"
      ],
      data_request_type: ["access", "correct", "delete", "export", "restrict", "object"],
      delivery_status: ["queued", "sent", "delivered", "failed", "suppressed"],
      document_classification: ["standard", "confidential", "highly_sensitive"],
      document_scan_status: [
        "uploading",
        "pending_scan",
        "scanning",
        "clean",
        "rejected",
        "infected",
        "error",
        "deleted"
      ],
      information_type: ["official", "practical", "community", "warning", "commercial"],
      lead_status: [
        "new",
        "triage",
        "qualified",
        "appointment_pending",
        "proposal_sent",
        "converted",
        "not_eligible",
        "closed",
        "spam",
        "do_not_contact"
      ],
      moderation_action_type: [
        "warn",
        "hide_content",
        "remove_content",
        "mute",
        "suspend",
        "ban",
        "restore",
        "dismiss_report"
      ],
      notification_channel: ["in_app", "email", "sms", "whatsapp"],
      order_status: [
        "draft",
        "pending",
        "paid",
        "fulfilled",
        "expired",
        "cancelled",
        "partially_refunded",
        "refunded",
        "disputed"
      ],
      package_status: ["draft", "active", "paused", "archived"],
      payment_status: [
        "requires_action",
        "processing",
        "succeeded",
        "failed",
        "cancelled",
        "partially_refunded",
        "refunded",
        "disputed"
      ],
      risk_level: ["low", "medium", "high", "critical"],
      staff_status: ["invited", "active", "suspended", "inactive"],
      task_status: ["todo", "in_progress", "blocked", "submitted", "approved", "rejected", "done"],
      translation_status: ["missing", "draft", "machine_draft", "review", "approved", "published"]
    }
  }
} as const;
