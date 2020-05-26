import './App.css';
import React, { useState } from 'react';
import chair from './chair.jpg';
import gif from './giphy.gif';

function onClick(merchant_id, amount) {
  let url = 'http://localhost:3000/' + merchant_id + '/' + amount

  return window.open(url);
}

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
        <img alt={product.description} src={gif} />
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <img alt={product.description} src={product.image} width="200" />
      <div>
        <button type="button" className="btn btn-primary" onClick={(e) => onClick(product.merchant_id, product.price, e)} >
          <span className="icon">Pay with PayBuddy</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  const product = {
    price: 122.22,
    name: 'comfy chair',
    description: 'fancy chair, like new',
    image: chair,
    merchant_id: '1'
  };

  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default App;
