import React from 'react';
import NoteCard from './NoteCard';
import { Note } from '../types/note';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  loading: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p>Загрузка заметок...</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="empty-message">
        <h3>Пока нет заметок</h3>
        <p>Добавьте первую заметку, используя форму ниже</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotesList;