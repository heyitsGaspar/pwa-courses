// src/App.tsx

import React from 'react';
import Home from './pages/Home.tsx';
import Header from '../src/components/Header.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
};

export default App;
