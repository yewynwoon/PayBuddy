import React from 'react';
import Router from './authRoutes'
import chair from './chair.jpg';
import './App.css';

function App() {
  const product = {
    price: 122.22,
    name: 'comfy chair',
    description: 'fancy chair, like new',
    image: chair,
    merchant_id: '1'
  };

  return (
    <div>
      <Router product={product} />
    </div>
  );
}

export default App;