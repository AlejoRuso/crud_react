import React, { useState } from 'react';

interface NotesFormProps {
  onAdd: (content: string) => void;
}

const NotesForm: React.FC<NotesFormProps> = ({ onAdd }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Пожалуйста, введите текст заметки');
      return;
    }

    onAdd(content);
    setContent('');
    setError('');
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          placeholder="Введите текст заметки..."
          rows={4}
          className="note-input"
        />
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}
      </div>
      <button 
        type="submit" 
        className="add-btn"
        disabled={!content.trim()}
      >
        Добавить заметку
      </button>
    </form>
  );
};

export default NotesForm;