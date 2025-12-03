import React, { useState, useEffect, useCallback } from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import Loader from './components/Loader';
import { Note } from './types/note';
import { notesApi } from './api/notesApi';
import './App.css';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Функция загрузки заметок
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notesApi.getNotes();
      setNotes(data);
    } catch (err) {
      setError('Ошибка при загрузке заметок. Проверьте, запущен ли бэкенд на localhost:7070');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Загрузка заметок при монтировании
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Обработчик добавления заметки
  const handleAddNote = async (content: string) => {
    try {
      await notesApi.addNote(content);
      await fetchNotes();
    } catch (err) {
      setError('Ошибка при добавлении заметки');
      console.error(err);
    }
  };

  // Обработчик удаления заметки
  const handleDeleteNote = async (id: number) => {
    try {
      await notesApi.deleteNote(id);
      await fetchNotes();
    } catch (err) {
      setError('Ошибка при удалении заметки');
      console.error(err);
    }
  };

  // Обработчик обновления списка
  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotes();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>
            <span className="icon">📝</span>
            Заметки
            <span className="notes-count">({notes.length})</span>
          </h1>
          <button 
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={loading || refreshing}
            title="Обновить список"
          >
            <span className="refresh-text">Обновить</span>
          </button>
        </div>
      </header>

      <div className="app-content">
        {/* Секция заметок - 70% высоты */}
        <section className="notes-section">
          {error && (
            <div className="error-alert">
              <div className="error-icon">⚠️</div>
              <div className="error-content">
                <strong>Ошибка:</strong> {error}
              </div>
              <button 
                className="error-close"
                onClick={() => setError(null)}
                title="Закрыть"
              >
                ×
              </button>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <NotesList 
              notes={notes} 
              onDelete={handleDeleteNote} 
              loading={loading}
            />
          )}
        </section>

        {/* Секция формы - 30% высоты */}
        <section className="form-section">
          <div className="form-container">
            <h2 className="form-title">
              <span className="icon">✏️</span>
              Новая заметка
            </h2>
            <NotesForm onAdd={handleAddNote} />
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <span>CRUD React приложение</span>
            <span className="separator">•</span>
            <span>Заметок: {notes.length}</span>
            <span className="separator">•</span>
            <span>Бэкенд: localhost:7070</span>
          </div>
          <div className="footer-status">
            {refreshing ? 'Обновление...' : 'Готово'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;