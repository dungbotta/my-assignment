
import React, { useState, useEffect } from 'react';
import HomePage from './views/HomePage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header/>
        <HomePage/>
    </div>
  );
}

export default App;
