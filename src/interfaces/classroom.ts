export interface Classroom {
  id: number;
  name: string;
  description?: string;
  mentor: { name: string };
  invitationToken: string;
}
