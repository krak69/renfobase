export type ExerciseType = 'reps' | 'time' | 'rest_seconds';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  media_url: string | null;
  type: ExerciseType;
  created_at: string;
}

export interface Session {
  id: string;
  scheduled_date: string; // ISO date
  include_warmup: boolean;
  realised: boolean;
  created_at: string;
}
