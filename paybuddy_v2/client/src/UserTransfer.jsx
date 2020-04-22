import React, { useState } from 'react';
import './client.css';
import './paybill.css';
import { getAccBalance } from './util/api-calls';

const TransferForm = props => {
    return (
        <main id='cous'>
            <div class='header-id'>
                <h2 class='header-text'>Enter transfer details</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <form /* onSubmit={props.onSubmit} */>
                        <div class="bpay-logo">Funds Tranfer</div>
                        <hr></hr>
                        <div class='upper-inner-box'>
                            <div class='text-line'>
                                Username:
                                <input id='username' type="text" placeholder=' Username *' /* onBlur={props.verifyBillerCode.bind(this)} */ required/>
                            </div>
                            <div class='text-line'>
                                Account Number:
                                <input id='accnumber' type="text" placeholder=' Acc Number *' required/>
                            </div>
                        </div>
                        <hr></hr>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <div class='payment-line'>
                                    Amount:
                                    <input id='amount' type="text" placeholder=' Amount *' required/>
                                </div>
                                <div class='payment-line'>
                                    Description:
                                    <input id='description' type="text" placeholder=' Description'/>
                                </div>
                            </div>
                        </div>
                        <div class='lower-inner-box'>
                            <button class="IzjkL _2Y_WL FiOTW continue-button"id="submit-button">
                                Confirm
                            </button>
                        </div>
                  </form>
                </div>
            </div>
        </main>
    );
}

const TransferConfirm = props => {
    return (
        <main id='cous'>
            <div id='header-id'>
                <h2 class='header-text'>Confirm your transfer</h2>
            </div>
            <div class='box'>
                <div class='inner-box' id='box-body-id'>
                <hr></hr>
                    <div class='upper-inner-box'>
                        <div class='biller-details'>
                            User Name:
                            {/* {props.bill.billerName} */}
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Account Number:
                            <div class='payment-dexcription-text-box'>{/* {props.bill.billerCode.value} */}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Amount:
                            <div class='payment-dexcription-text-box'>${/* {props.bill.amount.value} */}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Description:
                            <div class='payment-dexcription-text-box'>${/* {props.bill.amount.value} */}</div>
                        </div>
                    </div>
                    <div class='button-container'>
                        <button id="submit-button" /* onClick={props.onSubmit} */ class="_16apt _2Y_Wp">
                            <span>Make Payment</span>
                        </button>
                        <button id="cancel-button" /* onClick={props.cancelPayment} */ class="_16apt _2Y_Wp">
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

function UserTransfer(props) {

    const [show, setShow] = useState(false);
    const [err, setErr] = useState(false);
    const [bill, setBill] = useState('');
    const [api, setApi] = useState('');

    const showConfirm = () => setShow(true);
    const closeConfirm = () => {
        //debugger;
        setBill('');
        setShow(false);
    };

    function handleSubmit(event) {
        //debugger;
        
        event.preventDefault();
        const { username, accnumber, amount, descrip } = event.target.elements;
        
        setBill({
            userID: 1,
            username: username,
            accnumber: accnumber,
            amount: amount,
            descrip: descrip
        }); 
    
        showConfirm();
    }

    function verifyBillerCode(event) {
        if(event.target.value === '') {
            setBill('');
        } else {
            fetch(`http://localhost:9000/payments/biller/${event.target.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBill(data.longName);
                return;
            });
        }
    }
    
    function validatePayment(event) {
        debugger;
        getAccBalance(1, function(response) {
            debugger;
            console.log(response[0].account_value);

            var billValue = bill.amount.value;

            if(parseInt(response[0].account_value) > parseInt(billValue,10)) {

                console.log('Sufficient funds');
                debugger;

                /* checkBPayPayment(bill, function(response) {
                    console.log(response.text);
                    debugger;
                }); */
                
                fetch(`http://localhost:9000/payments/validatePayment`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: '1',
                        payment: {
                            billerCode: bill.billerCode.value,
                            crn: bill.crn.value,
                            amount: parseFloat(bill.amount.value)
                        }
                    })
                })
                .then((response) => {
                    debugger;
                    console.log(response);
                    console.log(response.status);

                    if(response.status === 200) {
                        console.log('responseFromServer');

                        //Page re-route
                        window.location.href = "/Dashboard?user_id=1";
                    } else {
                        console.log('API error');
                        setErr('API error');
                    }
                });
                debugger;
            } else {
                console.log('Not Valid');
                setErr('Insufficient funds');
                return;
            }
        });
    }

    return (
        <div>
            {
                !show ? <TransferForm verifyBillerCode={verifyBillerCode}
                                      onSubmit={handleSubmit}/>
                      : <TransferConfirm bill={bill}
                                         onSubmit={validatePayment}
                                         error={err}
                                         cancelPayment={closeConfirm}/>
            }
        </div>
    );
}

export default UserTransfer;