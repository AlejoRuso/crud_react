import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p>Загружаем ваши заметки...</p>
    </div>
  );
};

export default Loader;