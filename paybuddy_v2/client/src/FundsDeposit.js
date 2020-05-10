import React, { useState, useRef, useEffect } from 'react';
import './FundsDeposit.css';
import Logo from './img/icon.png';

function Product({ product }) {
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          label: 'checkout',
          color: 'white',
          shape: 'pill',
          tagline: 'false',
          height: 48
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price
                },
              },
            ],
          });
        },
        onApprove: async function (data, actions) {
          return actions.order.capture().then(function (details) {
            fetch('http://localhost:9000/depositFundsPost', {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                custID: 1,
                value: product.price,
                description: product.description + ': AU$' + product.price
              })
            }).then(function (responseFromServer) {
              console.log(responseFromServer.status);
              if(responseFromServer.status === 200) {
                console.log('responseFromServer');

                //Page re-route
                window.location.href = '/Dashboard?user_id=1';
              } else {
                console.log('API error');
              }})
          })
        }
      }).render(paypalRef.current);
  }, [product.description, product.price]);

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <div ref={paypalRef} />
    </div>
  );
}

const ProductSelection = props => {
  return (
    <div class='fade-in-fast'>
        <h2 class='header-text'>Select Deposit Amount</h2>
      <div>
        <ul class='box-containers'>
          <li class='single-box-container'>
            <div class='box-design'>
              <div class='box-text'>
                <img class='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 class='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div class='deposit-amount-text'>AU$5.00</div>
                <button class='orange-button' onClick={props.addToCart1}>
                  <span class='button-text'>CONTINUE</span>
                </button>
              </div>
            </div>
          </li>
          <li class='single-box-container'>
            <div class='box-design'>
              <div class='box-text'>
                <img class='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 class='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div class='deposit-amount-text'>AU$10.00</div>
                  <button class='orange-button' onClick={props.addToCart2}>
                    <span class='button-text'>CONTINUE</span>
                  </button>
                </div>
            </div>
          </li>
          <li class='single-box-container'>
            <div class='box-design'>
              <div class='box-text'> 
                <img class='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 class='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div class='deposit-amount-text'>AU$25.00</div>
                <button class='orange-button' onClick={props.addToCart3}>
                    <span class='button-text'>CONTINUE</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

const PayPalCheckout = props => {

  const product = {
    price: props.cartValue,
    name: 'PayBuddy deposit',
    description: 'PayBuddy funds deposit'
  };

  return (
    <div className='App'>
      <div class='fade-in-fast'>
        <h2 class='header-text'>Confirm order and pay</h2>
        <div class='confirm-container'>
          <div class='thick-underline'>
            <div class='confirm-text left-text'>Your order</div>
          </div>
          <div class='medium-underline'>
            <div class='left-text'>PayBuddy Deposit</div>
            <div class='right-text' data-basket-field='totalPrice'>AU${props.cartValue}.00</div>
          </div>
          <div class='thick-underline'>
            <div class='confirm-text left-text'>Total</div>
            <div class='right-text' data-basket-field='totalPrice'>AU${props.cartValue}.00</div>
          </div>
          <div class='terms-text'>
            <span>
              In some cases, your default currency will not be supported by a payment method directly. To solve this we convert the cost of your order automatically at prevailing European Central Bank rates.
            </span>
          </div>
        </div>
        <div class='confirm-container' aria-live='assertive'>
          By clicking 'Pay now', you agree to the <a class='text-link' role='link' target='_blank'>PayPuddy Services Agreement</a> and <a class='text-link' role='link' target='_blank'>Privacy and Cookies policy</a>, and you authorize PayBuddy to store your payment details.
        </div>
        <div class='centre-button'>
          <div class='paypal-button space-button'>
            <Product product={product} />
          </div>
          <button class='orange-button' onClick={props.cancelCart}>
            <span class='button-text'>Cancel</span>
          </button>             
        </div>
      </div>
    </div>
  );
}

class FundsDeposit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showCheckout: false, cartValue: 10, apiResponse: ''}
    this.addToCart = this.addToCart.bind(this);
    this.cancelCart = this.cancelCart.bind(this);
  }

  addToCart1 = () => {
    this.addToCart(5)
  }

  addToCart2 = () => {
    this.addToCart(10)
  }

  addToCart3 = () => {
    this.addToCart(25)
  }

  addToCart = (e) => {
    this.setState({
      ...this.state,
      showCheckout: true,
      cartValue: e
    })
  }

  cancelCart = () => {
    this.setState({
      ...this.state,
      showCheckout: false
    })
  }

  render() {
    return (
      <div>
       {!this.state.showCheckout ? <ProductSelection addToCart1={this.addToCart1} addToCart2={this.addToCart2} addToCart3={this.addToCart3} />
                                 : <PayPalCheckout cartValue={this.state.cartValue} cancelCart={this.cancelCart} />}
      
      { this.state.apiResponse }
      </div>
    );
  }
}

export default FundsDeposit;