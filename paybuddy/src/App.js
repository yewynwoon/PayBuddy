import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import chair from './chair.jpg';
import gif from './giphy.gif';
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
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
                description: product.description,
                amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
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
      <div class="_00001" id="block-id">
        <div class="_00002" id="header-id">
          <div class="_00003">
            <h2 class="_00004">Choose deposit amount</h2>
          </div>
        </div>
        <ul class="_00005" id="body-id">
          <li class="_2j5BM">
            <div class="_1fm9z">
              <div class="_25xBd _2jWsC _2LHSO">
                <div class="_1GLWk"></div>
                <div class="rMY2T _3kqWw _2-iar">
                  <div class="_2vRlH">
                    <div class="_3RQLA">
                      <span class="_16YfQ">
                        <span>
                          <img class="logo-image" src={Logo}/>
                        </span>
                      </span>
                      <h3 class="GMZpj">
                        Australia
                        <small>PayBuddy Credit</small>
                      </h3>
                    </div>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$5.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3GfbC _3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW">
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
                    <div class="_3RQLA">
                      <span class="_16YfQ">
                        <span>
                          <img class="logo-image" src={Logo}/>
                        </span>
                      </span>
                      <h3 class="GMZpj">
                        Australia
                        <small>PayBuddy Credit</small>
                      </h3>
                    </div>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$10.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3GfbC _3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW">
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
                    <div class="_3RQLA">
                      <span class="_16YfQ">
                        <span>
                          <img class="logo-image" src={Logo}/>
                        </span>
                      </span>
                      <h3 class="GMZpj">
                        Australia
                        <small>PayBuddy Credit</small>
                      </h3>
                    </div>
                  </div>
                  <div class="WekeV">
                    <div class="_3PiID _2wSlB">
                      <div class="_76Q-5">
                        <div class="_3CENX">AU$15.00</div>
                        <div class="_1euEK"></div>
                      </div>
                      <div class="em8W4">
                        <div class="_3GfbC _3dX_-">
                          <button class="IzjkL _2Y_WL FiOTW">
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


      
      {/* <div ref={paypalRef} /> */}
    </div>
  );
}

function App() {
  const product = {
    price: 787.77,
    name: 'comfy chair',
    description: 'fancy chair, like new',
    image: chair,
  };

  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default App;