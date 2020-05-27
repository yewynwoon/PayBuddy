import React from 'react'
import gif from '../giphy.gif'

function Success({product}) {
    return (
        <div>
            <h1>Congrats, you just bought {product.name}!</h1>
            <img alt={product.description} src={gif} />
        </div>
    );
}

export default Success;
