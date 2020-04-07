import React from 'react';
import './course.css';
import './paybill.css'
import BPayLogo from './img/bpay_logo.png';



class PayBill extends React.Component {

    constructor(props) {
        super(props);

        



/* 
        fetch('https://sandbox.api.bpaygroup.com.au/payments/v1/biller/959197')//OPTUS BPAY REFERENCE
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            console.log(data.pastTransactions);

            this.setState({
                ...this.state,
                cust_acct_value: data.acctValue[0].account_value,
                cust_transactions: data.pastTransactions
            })

            console.log(this.state.cust_transactions[0].deposit_id); */
      //  });
    }

    render () {

        fetch('https://api.bpaygroup.com.au/oauth/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic WU1xS0JOSmI3c2dtQXlJcDZjdkdtc0t5UkZObGpBWWo6RkQ5S0JPNWNXZnNBajV1cw=='
            },
            body: {
                'client_id': 'YMqKBNJb7sgmAyIp6cvGmsKyRFNljAYj',
                'grant_type': 'client_credentials'
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            console.log(data.pastTransactions);;
        });

        /* const curl = new (require( 'curl-request' ))();
        curl.setHeaers(['Authorization: Basic WU1xS0JOSmI3c2dtQXlJcDZjdkdtc0t5UkZObGpBWWo6RkQ5S0JPNWNXZnNBajV1cw=='])
            .setBody({
                'client_id': 'YMqKBNJb7sgmAyIp6cvGmsKyRFNljAYj',
                'grant_type': 'client_credentials'
            })
            .post('https://api.bpaygroup.com.au/oauth/token')
            .then(({statusCode, body, headers}) => {
                console.log(statusCode, body, headers)
            }); */

        return (
                <main id='cous'>
                    <div class="_3mYpM" id="header-id">
                        <h2 class="_00004">Enter bill details</h2>
                    </div>
                    <div class="box">
                        <div class="inner-box" id="box-body-id">
                            <form>
                                <div class='upper-inner-box'>
                                    <div class="bpay bpay-logo"><img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                                    <div class='bpay'>
                                        <div class='bpay-payment-details'>
                                            <div class='text-line'><input type="text" size='32' placeholder=' Biller Code *'/></div>
                                            <div class='text-line'><input type="text" size='32' placeholder=' Ref Number *'/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class='middle-inner-box'>
                                    <div class='biller-details'>
                                        <div>Biller Name:</div>
                                        <div class='biller-name'>{"Test"}</div>
                                    </div>
                                </div>
                                <div class='middle-inner-box'>
                                    <div class='payment-details'>
                                        <input class='payment-amount-text-box' type="text" size='6' placeholder=' Amount *'/>
                                        <input class='payment-dexcription-text-box'type="text" size='6' placeholder=' Description'/>
                                    </div>
                                </div>
                                <div class='lower-inner-box'>
                                    <button class="IzjkL _2Y_WL FiOTW continue-button" id="selection-1">
                                        <span class="_2pjgR">Continue</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        );
    }
}

export default PayBill;