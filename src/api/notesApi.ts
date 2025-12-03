import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7070';

export interface Note {
  id: number;
  content: string;
}

export const notesApi = {
  async getNotes(): Promise<Note[]> {
    const response = await axios.get<Note[]>(`${API_URL}/notes`);
    return response.data;
  },

  async addNote(content: string): Promise<void> {
    await axios.post(`${API_URL}/notes`, {
      id: 0,
      content
    });
  },

  async deleteNote(id: number): Promise<void> {
    await axios.delete(`${API_URL}/notes/${id}`);
  }
};