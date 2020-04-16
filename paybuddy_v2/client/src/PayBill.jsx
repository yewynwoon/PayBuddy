import React, { useState } from 'react';
import './client.css';
import './paybill.css'
import BPayLogo from './img/bpay_logo.png';

const PayBillForm = props => {
    return (
        <main id='cous'>
            <div class="_3mYpM" id="header-id">
                <h2 class="_00004">Enter bill details</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <form onSubmit={props.onSubmit}>
                        <div class='upper-inner-box'>
                            <div class="bpay bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                            <div class='bpay'>
                                <div class='bpay-payment-details'>
                                    <div class='text-line'><input id='bllerCode' type="text" size='32' placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} /></div>
                                    <div class='text-line'><input id='crn' type="text" size='32' placeholder=' Ref Number *'/*  onBlur={props.setCRN.bind(this)} */ /></div>
                                </div>
                            </div>
                        </div>
                        <div class='middle-inner-box'>
                            <div class='biller-details'>
                                <div>Biller Name:</div>
                                <div class='biller-name'>{props.billerName}</div>
                            </div>
                        </div>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <input id='amount' class='payment-amount-text-box' type="text" size='6' placeholder=' Amount *' /* onBlur={props.setAmount.bind(this)} */ />
                                <input id='descrip' class='payment-dexcription-text-box' type="text" size='6' placeholder=' Description' /* onBlur={props.setDescrip.bind(this)} */ />
                            </div>
                        </div>
                        <div class='lower-inner-box'>
                            <input type ='submit' class="IzjkL _2Y_WL FiOTW continue-button" /* onClick={props.onClick}  */id="submit-button"/>
                               {/*  <span class="_2pjgR">Continue</span> */}
                            {/* </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

const PayBillConfirm = props => {
    debugger;
    return (
        <main id='cous'>
            <div class="_3mYpM" id="header-id">
                <h2 class="_00004">Confirm your payment</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <div class='upper-inner-box'>
                        <div class='biller-details'>
                            <div class='biller-name'>{props.bill.crn.value}</div>
                            <div class='biller-name'>{props.bill.amount.value}</div>
                            <div class='biller-name'>{props.bill.billerCode.value}</div>
                        </div>
                        <input type='submit' onSubmit={props.onSubmit} class="IzjkL _2Y_WL FiOTW continue-button _2pjgR" value='Continue'/>
                    </div>
                    {/* <form  onSubmit={props.validatePayment}>
                        <div class='upper-inner-box'>
                            <div class="bpay bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                            <div class='bpay'>
                                <div class='bpay-payment-details'>
                                    <div class='text-line'><input  type="text" size='32' placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} /></div>
                                    <div class='text-line'><input id='CRN' type="text" size='32' placeholder=' Ref Number *' onBlur={props.setCRN.bind(this)} /></div>
                                </div>
                            </div>
                        </div>
                        <div class='middle-inner-box'>
                            <div class='biller-details'>
                                <div>Biller Name:</div> 
                                <div class='biller-name'>{props.billerName}</div>
                            </div>
                        </div>
                        <div class='middle-inner-box'>
                            <div class='payment-details'>
                                <input class='payment-amount-text-box' id='amount' type="text" size='6' placeholder=' Amount *' onBlur={props.setAmount.bind(this)} />
                                <input class='payment-dexcription-text-box' id='descrip' type="text" size='6' placeholder=' Description' onBlur={props.setDescrip.bind(this)} />
                            </div>
                        </div>
                        <div class='lower-inner-box'>
                            <input type='submit' class="IzjkL _2Y_WL FiOTW continue-button _2pjgR" value='Continue'/>
                        </div>
                    </form> */}
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
    const closeConfirm = () => setShow(false);

    function handleSubmit(event) {
        debugger;
        
        event.preventDefault();
        const { bllerCode, crn, amount, descrip } = event.target.elements;

        if (bllerCode === '' || crn === '' || amount === '')
        {
            return;
        } 

        setBill({
            billerCode: bllerCode,
            crn: crn,
            amount: amount,
            descrip: descrip
        });

        showConfirm();
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
        fetch(`http://localhost:9000/bpay/validatePayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                payment: {
                    billerCode: bill.billerCode,
                    crn: bill.crn,
                    amount: parseFloat(bill.amount),
                    settlementDate: "2017-10-23",
                    paymentMethod: "001",
                    paymentDate: "2019-01-10"
                }
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setApi(data);
            console.log(api);
        });
    }

    /* showConfirm() {
         if (this.state.billerCode === '' ||
            this.state.crn === '' ||
            this.state.amount === '')
            {
                return;
            } 
            console.log("Hello");
         this.state.showConfirm = true;

        this.state.paymentDetials = {
            billerCode: this.state.billerCode,
            crn: this.state.crn,
            amount: this.state.amount
        };  */

        //console.log(this.state.paymentDetials);
    /* } */

    return (
        <div>
            {
                !show ? <PayBillForm verifyBillerCode={verifyBillerCode}
                                     onSubmit={handleSubmit}
                                     billerName={bill}/>
                      : <PayBillConfirm bill={bill}
                                        onSubmit={validatePayment}/>
            }
        </div>
    );
}

export default PayBill;