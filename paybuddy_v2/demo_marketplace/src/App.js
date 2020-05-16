import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import chair from './chair.jpg';
import Home from './Home.js'
import gif from './giphy.gif';


function App() 
{
  const product = 
  {
    price: 777.77,
    name: 'comfy chair',
    description: 'fancy chair, like new',
    image: chair,
  };

  return(
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
