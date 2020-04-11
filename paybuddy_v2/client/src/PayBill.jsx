import React from 'react';
import './course.css';
import './paybill.css'
import BPayLogo from './img/bpay_logo.png';



class PayBill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            billerCode: '',
            apiResponse: ''
        }
    }

    verifyBiilerCode = (event) => {

        if(event.target.value === '') {
            this.setState({
                billerCode: ''
            });
            return;
        }
        else {
            fetch(`http://localhost:9000/bpay/biller/${event.target.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    billerCode: data
                })
                return this.state.billerCode;
            });
        }
    }

    validatePayment = (e) => {

        console.log('hhello');

        fetch(`http://localhost:9000/bpay/validatePayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                payment: {
                    billerCode: "65284",
                    crn: "65112345672",
                    amount: 1045.98,
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
            this.setState({
                apiResponse: data
            })

            console.log(this.state.apiResponse);
        });
    }

    render () {
        return (
            <main id='cous'>
                <div class="_3mYpM" id="header-id">
                    <h2 class="_00004">Enter bill details</h2>
                </div>
                <div class="box">
                    <div class="inner-box" id="box-body-id">
                        <form  onSubmit={this.validatePayment}>
                            <div class='upper-inner-box'>
                                <div class="bpay bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                                <div class='bpay'>
                                    <div class='bpay-payment-details'>
                                        <div class='text-line'><input type="text" size='32' placeholder=' Biller Code *' onBlur={this.verifyBiilerCode.bind(this)}/></div>
                                        <div class='text-line'><input type="text" size='32' placeholder=' Ref Number *'/></div>
                                    </div>
                                </div>
                            </div>
                            <div class='middle-inner-box'>
                                <div class='biller-details'>
                                    <div>Biller Name:</div>
                                    <div class='biller-name'>{this.state.billerCode.longName}</div>
                                </div>
                            </div>
                            <div class='middle-inner-box'>
                                <div class='payment-details'>
                                    <input class='payment-amount-text-box' type="text" size='6' placeholder=' Amount *'/>
                                    <input class='payment-dexcription-text-box' type="text" size='6' placeholder=' Description'/>
                                </div>
                            </div>
                            <div class='lower-inner-box'>
                                <input type='submit' class="IzjkL _2Y_WL FiOTW continue-button _2pjgR" value='Continue'/>
                            </div>
                        </form>
                    </div>
                </div>
            
                { this.state.apiResponse }
            </main>
        );
    }
}

export default PayBill;