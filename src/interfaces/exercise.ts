export interface Exercise {
  id?: number;
  title: string;
  description?: string;
  automatas?: number[];
  privacy?: string;
  classroomPrivate?: number;
}

export interface ExerciseSubmission {
  id: number;
  grade: number;
  createdAt: string;
  updatedAt: string;
  authorReviewed: boolean;
  taker: {
    name: string;
    email: string;
  };
}
