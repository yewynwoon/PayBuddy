import React, { useState, useRef, useEffect } from 'react'
import { withOktaAuth } from '@okta/okta-react';
import Logo from './img/icon.png'
import './FundsDeposit.css'

function Product({ product, userInfo }) {
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  console.log(userInfo)

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
            fetch('https://paybuddy-2020.ts.r.appspot.com/depositFundsPost', {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                cust_email: userInfo.email,
                value: product.price,
                description: product.description + ': $' + product.price +'USD'
              })
            }).then(function (responseFromServer) {
              console.log(responseFromServer.status);
              if(responseFromServer.status === 200) {
                //Page re-route
                window.location.href = '/Dashboard';
              } else {
                setError('API error');
              }
            })
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
    <div className='fade-in-fast'>
        <span className='header-text'>Select Deposit Amount</span>
      <div>
        <ul className='box-containers'>
          <li className='single-box-container'>
            <div className='box-design'>
              <div className='box-text'>
                <img className='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 className='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div className='deposit-amount-text'>USD$5.00</div>
                <button className='orange-button' onClick={props.addToCart1}>
                  <span className='button-text'>CONTINUE</span>
                </button>
              </div>
            </div>
          </li>
          <li className='single-box-container'>
            <div className='box-design'>
              <div className='box-text'>
                <img className='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 className='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div className='deposit-amount-text'>USD$10.00</div>
                  <button className='orange-button' onClick={props.addToCart2}>
                    <span className='button-text'>CONTINUE</span>
                  </button>
                </div>
            </div>
          </li>
          <li className='single-box-container'>
            <div className='box-design'>
              <div className='box-text'> 
                <img className='logo-image' id='spaceout' src={Logo} alt='paybuddy-logo'/>
                <h3 className='box-inner-text'>
                  Australia
                  <small>PayBuddy Deposit</small>
                </h3>
                <div className='deposit-amount-text'>USD$2500.00</div>
                <button className='orange-button' onClick={props.addToCart3}>
                    <span className='button-text'>CONTINUE</span>
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
      <div className='fade-in-fast'>
        <h2 className='header-text'>Confirm order and pay</h2>
        <div className='confirm-container'>
          <div className='thick-underline'>
            <div className='confirm-text left-text'>Your order</div>
          </div>
          <div className='medium-underline'>
            <div className='left-text'>PayBuddy Deposit</div>
            <div className='right-text' data-basket-field='totalPrice'>USD${props.cartValue}.00</div>
          </div>
          <div className='thick-underline'>
            <div className='confirm-text left-text'>Total</div>
            <div className='right-text' data-basket-field='totalPrice'>USD${props.cartValue}.00</div>
          </div>
          <div className='terms-text'>
            <span>
              In some cases, your default currency will not be supported by a payment method directly. To solve this we convert the cost of your order automatically at prevailing European Central Bank rates.
            </span>
          </div>
        </div>
        <div className='confirm-container' aria-live='assertive'>
          By clicking 'Pay now', you agree to the <a className='text-link' role='link' target='_blank'>PayPuddy Services Agreement</a> and <a className='text-link' role='link' target='_blank'>Privacy and Cookies policy</a>, and you authorize PayBuddy to store your payment details.
        </div>
        <div className='centre-button'>
          <div className='paypal-button space-button'>
            <Product product={product} userInfo={props.userInfo}/>
          </div>
          <button className='orange-button' onClick={props.cancelCart}>
            <span className='button-text'>Cancel</span>
          </button>             
        </div>
      </div>
    </div>
  );
}

async function getUserInfo() {
  if (this.props.authState.isAuthenticated) {
    const userInfo = await this.props.authService.getUser();

    this.setState({
      ...this.state,
      userInfo: userInfo
    })
  }
}


export default withOktaAuth (class FundsDeposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showCheckout: false,
      userInfo: ''
    }
    this.addToCart = this.addToCart.bind(this);
    this.cancelCart = this.cancelCart.bind(this);
    this.getUserInfo = getUserInfo.bind(this);
    
    this.getUserInfo();
  }

  addToCart1 = () => {
    this.addToCart(5)
  }

  addToCart2 = () => {
    this.addToCart(10)
  }

  addToCart3 = () => {
    this.addToCart(2500)
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
                                 : <PayPalCheckout cartValue={this.state.cartValue} cancelCart={this.cancelCart} userInfo={this.state.userInfo}/>}
      
      </div>
    );
  }
})