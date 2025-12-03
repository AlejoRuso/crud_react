import React from 'react';
import { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className="note-card">
      {/* Контент заметки */}
      <div className="note-content">
        {note.content}
      </div>

      {/* Кнопка удаления в верхнем правом углу */}
      <button 
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Удалить заметку"
        title="Удалить заметку"
      >
        ×
      </button>
    </div>
  );
};

export default NoteCard;