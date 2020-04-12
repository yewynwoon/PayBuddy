import React from 'react';
import './course.css';
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
                    <div class='upper-inner-box'>
                        <div class="bpay bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                        <div class='bpay'>
                            <div class='bpay-payment-details'>
                                <div class='text-line'><input type="text" size='32' placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} /></div>
                                <div class='text-line'><input type="text" size='32' placeholder=' Ref Number *' onBlur={props.setCRN.bind(this)} /></div>
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
                            <input class='payment-amount-text-box' type="text" size='6' placeholder=' Amount *' onBlur={props.setAmount.bind(this)} />
                            <input class='payment-dexcription-text-box' type="text" size='6' placeholder=' Description' onBlur={props.setDescrip.bind(this)} />
                        </div>
                    </div>
                    <div class='lower-inner-box'>
                        <button class="IzjkL _2Y_WL FiOTW continue-button" onClick={props.onClick} id="submit-button">
                            <span class="_2pjgR">Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

const PayBillConfirm = props => {
    return (
        <main id='cous'>
            <div class="_3mYpM" id="header-id">
                <h2 class="_00004">Confirm your payment</h2>
            </div>
            <div class="box">
                <div class="inner-box" id="box-body-id">
                    <div class='upper-inner-box'>
                        <div class='biller-details'>
                            <div class='biller-name'>{props.crn}</div>
                            <div class='biller-name'>{props.amount}</div>
                            <div class='biller-name'>{props.billerCode}</div>
                        </div>
                    </div>
                    {/* <form  onSubmit={props.validatePayment}>
                        <div class='upper-inner-box'>
                            <div class="bpay bpay-logo"> <img class="bpay-logo-img" src={BPayLogo} alt="paybuddy-logo"/></div>
                            <div class='bpay'>
                                <div class='bpay-payment-details'>
                                    <div class='text-line'><input type="text" size='32' placeholder=' Biller Code *' onBlur={props.verifyBillerCode.bind(this)} /></div>
                                    <div class='text-line'><input type="text" size='32' placeholder=' Ref Number *' onBlur={props.setCRN.bind(this)} /></div>
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
                                <input class='payment-amount-text-box' type="text" size='6' placeholder=' Amount *' onBlur={props.setAmount.bind(this)} />
                                <input class='payment-dexcription-text-box' type="text" size='6' placeholder=' Description' onBlur={props.setDescrip.bind(this)} />
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

class PayBill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiResponse: '',
            billerCode: '',
            billerName: '',
            crn: '',
            amount: '',
            descrip: '',
            showConfirm: false,
            paymentDetials: ''
        }
    }

    verifyBillerCode = (event) => {
        if(event.target.value === '') {
            this.setState({
                billerCode: ''
            });
            return;
        } else {
            fetch(`http://localhost:9000/bpay/biller/${event.target.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.billerCode = data;
                this.state.billerName = data.longName;
                console.log(this.state.billerCode);
                console.log(this.state.billerName);
                return;
            });
        }
    }

    setCRN = (event) => {

        if(event.target.value === '') {
            this.setState({
                crn: ''
            });
            return;
        }
        
        this.setState({crn: event.target.value});
        console.log(this.state.crn);
    }

    setAmount = (event) => {

        if(event.target.value === '') {
            this.setState({
                amount: ''
            });
            return;
        }

        this.setState({amount: event.target.value});
        console.log(this.state.amount);
    }

    setDescrip = (event) => {

        if(event.target.value === '') {
            this.setState({
                descrip: ''
            });
            return;
        }
        
        this.setState({descrip: event.target.value});
        console.log(this.state.descrip);
    }

    validatePayment = (e) => {
        fetch(`http://localhost:9000/bpay/validatePayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                payment: {
                    billerCode: this.state.billerCode.billerCode,
                    crn: this.state.crn,
                    amount: parseFloat(this.state.amount),
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
            });

            console.log(this.state.apiResponse);
        });
    }

    showConfirm = () => {
        this.state.showConfirm = false;
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
        }; 

        //console.log(this.state.paymentDetials);
    } */

    render() {

        return (
            <div>
                {
                    !this.state.showConfirm ? <PayBillForm verifyBillerCode={this.verifyBillerCode}
                                                           setCRN={this.setCRN}
                                                           setAmount={this.setAmount}
                                                           setDescrip={this.verifyBillerCode}
                                                           onClick={this.showConfirm}
                                                           billerName={this.state.billerName}/>
                                            : <PayBillConfirm billerName={this.state.billerName}
                                                              crn={this.state.crn}
                                                              amount={this.state.amount}/>
                }
            </div>);
      }
}

export default PayBill;