import './Dashboard.css';
import React, { useState, useRef, useEffect } from 'react';
import Logo from './Icon.png';

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
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
        onApprove: async (data, actions) => {

          {/* PAYPAL DEPOSIT SUCCEFUL - REROUTE TO CONFIRMATION PAGE */}

          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
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
    <div>
      <div class="_3o1Fr" id="block-id">
        <div class="_3mYpM" id="header-id">
          <h2 class="_00004">Select deposit amount</h2>
        </div>
        <ul class="_23RYk" id="body-id">
          <li class="_2j5BM">
            <div class="_1fm9z">
              <div class="_25xBd _2jWsC _2LHSO">
                <div class="_1GLWk" id="box-header-id"></div>
                <div class="rMY2T _3kqWw _2-iar" id="box-body-id">
                  <div class="_2vRlH">
                    <span class="_16YfQ">
                      <img class="logo-image" src={Logo}/>
                    </span>
                    <h3 class="GMZpj">
                      Australia
                      <small>PayBuddy Deposit</small>
                    </h3>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$5.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW" id="selection-1" onClick={props.addToCart1}>
                            <span class="_2pjgR">Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="_2j5BM">
            <div class="_1fm9z">
              <div class="_25xBd _2jWsC _2LHSO">
                <div class="_1GLWk"></div>
                <div class="rMY2T _3kqWw _2-iar">
                  <div class="_2vRlH">
                    <span class="_16YfQ">
                      <img class="logo-image" src={Logo}/>
                    </span>
                    <h3 class="GMZpj">
                      Australia
                      <small>PayBuddy Deposit</small>
                    </h3>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$10.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW" id="selection-2" onClick={props.addToCart2}>
                            <span class="_2pjgR">Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="_2j5BM">
            <div class="_1fm9z">
              <div class="_25xBd _2jWsC _2LHSO">
                <div class="_1GLWk"></div>
                <div class="rMY2T _3kqWw _2-iar">
                  <div class="_2vRlH">
                    <span class="_16YfQ">
                      <img class="logo-image" src={Logo}/>
                    </span>
                    <h3 class="GMZpj">
                      Australia
                      <small>PayBuddy Deposit</small>
                    </h3>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$25.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW" id="selection-3" onClick={props.addToCart3}>
                            <span class="_2pjgR">Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    <div className="App">
      <div class="_3o1Fr" id="block-id">
        <div class="_3mYpM" id="header-id">
          <h2 class="_00004">Confirm order and pay</h2>
        </div>
        <div class="_2xuF0" aria-live="assertive">
          <div class="_3YW0V">
            <div class="_2OPBO">
              <div class="_32Oc5 _2onyo">
                <div class="_1zJje">
                  <span>
                    <span>
                      By clicking "Pay now", you agree to the <a class="_2rLR4" role="link" target="_blank">PayPuddy Services Agreement</a> and <a class="_2rLR4" role="link" target="_blank">Privacy and Cookies policy</a>, and you authorize PayBuddy to store your payment details.
                    </span>
                  </span>
                </div>
                <div class="_1zJje">
                  <span></span>
                </div>
                <div class="_1zJje">
                  <span></span>
                </div>
              </div>
              <div class="_3msgu">
                <div class="_lksW2">
                  <Product product={product} />
                </div>
                <div class="_lksW2">
                  <button id="cancelButton" onClick={props.cancelCart} class="_16apt _2Y_Wp _2sGmV">
                    <span>Cancel</span>
                  </button>
                </div>                
              </div>
            </div>
          </div>
        </div>
        <div class="c1vnA">
          <div class="jvzF1">
            <div class="_1cMq5">
              <div class="_1l2tM _nfdh5">Your order</div>
            </div>
            <div class="_1cMq5">
              <div class="_nfdh4">PayBuddy Deposit</div>
            </div>
            <div class="_1cMq5 _1Fz0I">
              <div class="_6jTY7">
                <span class="_35e-z">Total</span>
              </div>
              <div class="_Drf47" data-basket-field="totalPrice"><b>AU${props.cartValue}.00</b></div>
            </div>
            <div class="TgisE">
              <span>
                In some cases, your default currency will not be supported by a payment method directly. To solve this we convert the cost of your order automatically at prevailing European Central Bank rates.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class FundsDeposit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showCheckout: false, cartValue: 10}
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
      
      {/* recentVotesQuery */}
      </div>
    );
  }
}

export default FundsDeposit;