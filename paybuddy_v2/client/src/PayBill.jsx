import React, { useState } from 'react';
import './client.css';
import './paybill.css'
import BPayLogo from './img/bpay_logo.jpg';

const PayBillForm = props => {
    return (
        <main id='cous'>
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
                            <input type ='submit' class="IzjkL _2Y_WL FiOTW continue-button"id="submit-button"/>
                        </div>
                  </form>
                </div>
            </div>
        </main>
    );
}

const PayBillConfirm = props => {
    //debugger;
    return (
        <main id='cous'>
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
                            <div class='payment-amount-text-box'>CRN:</div>
                            <div class='payment-dexcription-text-box'>{props.bill.crn.value}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            <div class='payment-amount-text-box'>Amount:</div>
                            <div class='payment-dexcription-text-box'>${props.bill.amount.value}</div>
                        </div>
                    </div>
                    <div class='middle-inner-box'>
                        <div class='payment-details'>
                            <div class='payment-amount-text-box'>Biller Code:</div>
                            <div class='payment-dexcription-text-box'>{props.bill.billerCode.value}</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class='button-container'>
                        <button id="submit-button" onClick={props.onSubmit} class="_16apt _2Y_Wp">
                            <span>Submit</span>
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
    //const [err, setErr] = useState(false);
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
            fetch(`http://localhost:9000/bpay/biller/${event.target.value}`)
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
        
        fetch(`http://localhost:9000/bpay/validatePayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
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
            return response.json();
        })
        .then((data) => {
            debugger;
            setApi(data);
            console.log(api);
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
                                        cancelPayment={closeConfirm}/>
            }
        </div>
    );
}

export default PayBill;