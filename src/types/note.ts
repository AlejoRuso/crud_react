export interface Note {
  id: number;
  content: string;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}