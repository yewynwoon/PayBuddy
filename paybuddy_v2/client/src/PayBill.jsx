import React, { useState } from 'react';
import './client.css';
import './paybill.css'
import BPayLogo from './img/bpay_logo.jpg';
import { getAccBalance, checkBPayPayment } from './util/api-calls';

const PayBillForm = props => {
    return (
        <main class='fade-in-fast' id='cous'>
            <div class='header-id'>
                <h2 class='header-text'>Enter bill details</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <form onSubmit={props.onSubmit}>
                        <div class="bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                        <hr></hr>
                        <div class='upper-inner-box'>
                            <div class='text-line'>
                                Biller Code:
                                <input id='bllerCode' type="text" placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} required/>
                            </div>
                            <div class='text-line'>
                                Reference Number:
                                <input id='crn' type="text" placeholder=' Ref Number *' required/>
                            </div>
                        </div>
                        <div class='middle-inner-box'>
                            <div class='biller-details'>
                                Biller Name:
                                <div class='biller-name'>{props.billerName}</div>
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

const PayBillConfirm = props => {
    return (
        <main class='fade-in-fast' id='cous'>
            <div id='header-id'>
                <h2 class='header-text'>Confirm your payment</h2>
            </div>
            <div class='box'>
                <div class='inner-box' id='box-body-id'>
                <div class="bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                <hr></hr>
                    <div class='upper-inner-box'>
                        <div class='biller-details'>
                            Biller Name:
                            {props.bill.billerName}
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Biller Code:
                            <div class='payment-dexcription-text-box'>{props.bill.billerCode.value}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Reference Number:
                            <div class='payment-dexcription-text-box'>{props.bill.crn.value}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Amount:
                            <div class='payment-dexcription-text-box'>${props.bill.amount.value}</div>
                        </div>
                    </div>
                    <div class='button-container'>
                        <button id="submit-button" onClick={props.onSubmit} class="_16apt _2Y_Wp">
                            <span>Make Payment</span>
                        </button>
                        <button id="cancel-button" onClick={props.cancelPayment} class="_16apt _2Y_Wp">
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

function PayBill(props) {

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
        const { bllerCode, crn, amount, descrip } = event.target.elements;

        if (bllerCode === '' || crn === '' || amount === '')
        {
            return;
        }
        else {
            setBill({
                userID: 1,
                billerName: bill,
                billerCode: bllerCode,
                crn: crn,
                amount: amount,
                descrip: descrip
            }); 
    
            showConfirm();
        }
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
                            amount: parseFloat(bill.amount.value),
                            settlementDate: "2017-10-23",
                            paymentMethod: "001",
                            paymentDate: "2019-01-10"
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
                !show ? <PayBillForm verifyBillerCode={verifyBillerCode}
                                     onSubmit={handleSubmit}
                                     billerName={bill}/>
                      : <PayBillConfirm bill={bill}
                                        onSubmit={validatePayment}
                                        error={err}
                                        cancelPayment={closeConfirm}/>
            }
        </div>
    );
}

export default PayBill;