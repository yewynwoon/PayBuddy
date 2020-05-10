import React, { useState } from 'react';
import './paybill.css'
import BPayLogo from './img/bpaytransfer.png';
import { getAccBalance, checkBPayPayment } from './util/api-calls';

const PayBillForm = props => {
    return (
        <main class='fade-in-fast' id='cous'>
            <h2 class='header-text'>Pay a bill</h2>
            <div class="box">
                <div class="inner-box">
                    <form onSubmit={props.onSubmit}>
                        <img class="bpay-logo-img bpay-logo" src={BPayLogo} alt="paybuddy-logo"/>
                        <div class='title'>Enter bill details</div>
                        <hr class='centre-hr centre-margin' id='spaceout'></hr>
                        <div class='upper-inner-box'>
                            <div class='text-line' id='spaceout'>
                                Biller Code:
                                <input id='bllerCode' type="text" placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} required/>
                            </div>
                            <div class='text-line' id='spaceout'>
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
                        <hr class='centre-hr centre-margin' id='spaceout'></hr>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <div class='text-line' id='spaceout'>
                                    Amount:
                                    <input id='amount' type="text" placeholder=' Amount *' required/>
                                </div>
                                <div class='text-line' id='spaceout'>
                                    Description:
                                    <input id='description' type="text" placeholder=' Description'/>
                                </div>
                            </div>
                        </div>
                        <div class='lower-inner-box' id='spaceout'>
                            <button class="orange-button">
                                <span class='button-text'>Confirm</span>
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
                <h2 class='header-text'>Pay a bill</h2>
            </div>
            <div class='box'>
                <div class='inner-box'>
                <img class="bpay-logo-img bpay-logo" src={BPayLogo} alt="paybuddy-logo"/>
                <div class='title'>confirm payment details</div>
                <hr class='centre-hr centre-margin' id='spaceout'></hr>
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
                    <hr class='centre-hr centre-margin' id='spaceout'></hr>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            Amount:
                            <div class='payment-dexcription-text-box'>${props.bill.amount.value}</div>
                        </div>
                        <div class='payment-details'>
                            Description:
                            <div class='payment-dexcription-text-box'>{props.bill.description.value}</div>
                        </div>
                    </div>
                    <div class='button-container'>
                        <button class="orange-button space-width" onClick={props.onSubmit}>
                            <span class='button-text'>Make Payment</span>
                        </button>
                        <button class="white-button space-width" onClick={props.cancelPayment}>
                            <span class='white-button-text'>Cancel</span>
                        </button>
                        {props.err}
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
        const { bllerCode, crn, amount, description } = event.target.elements;

        setBill({
            userID: 1,
            billerName: bill,
            billerCode: bllerCode,
            crn: crn,
            amount: amount,
            description: description
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
                },
                description: bill.description.value
            })
        }).then((response) => {
            debugger;
            setApi(response);
            console.log(response);

            if (response.status === 200) {
                window.location.href = "/Dashboard?user_id=1";
            }
            else {
                setErr('Error!');
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