import React, { useState } from 'react';

function onClick(merchant_id, amount) {
  let url = 'http://localhost:3000/' + merchant_id + '/' + amount

  return window.open(url);
}

function Product({ product }) {
  const [error, setError] = useState(null);
  
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

function Home({product}) {
  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default Home;
