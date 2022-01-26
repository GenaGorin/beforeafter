export interface IGoal {
  id: number;
  title: string;
  description: string;
  user_id: number;
  likes: number;
  views: number;
  stages: any[];
  created_at: string;
  last_update: string;
  done: number;
}
