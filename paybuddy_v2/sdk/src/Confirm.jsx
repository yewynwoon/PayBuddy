import React, { useState, useRef, useEffect } from 'react';

const Checkout = props => {
    return (
        <div className="row">
            <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Merchant: {props.merchName}</label>
            </div>

            <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Amount: {props.amount}</label>
            </div>

            <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Account Balance: {props.userBalance}</label>     
            </div>

            <div className="form-group row mb-0">
                <div className="col-md-8 offset-md-4">
                    {/* <Link to={`/project/${this.props.match.params.id}`}>
                        <button className="btn btn-danger">Cancel</button>
                    </Link> */}
                    <button type="submit" className="btn btn-primary" onClick={props.submitPayment}>
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

const Confirm = props => {
    return (
        <div className="App">
            <div class="_3o1Fr fade-in-fast" id="block-id">
                <div>
                    Payment Complete!    
                </div>
                <div>
                    You can now close this window.    
                </div>                
            </div>
        </div>
    );
}

class FundsDeposit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: props.user.email,
            userBalance: '',
            merchName: '',
            merchID: 1,
            amount: 5,//'',
            showConfirm: false
        }
        this.submitPayment = this.submitPayment.bind(this)
    }

    componentDidMount() {
        this.paymentDetails()
    }

    paymentDetails() {
        fetch('http://localhost:9000/sdk/paymentDetails', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_email: this.state.userEmail,
                merch_id: this.state.merchID
            })
        }).then(res => {
            if (res.status ===200) {
                return res.json()
            }
        }).then(res => {
            this.setState({
                merchName: res.name[0].cname,
                userBalance: res.acctValue[0].account_value
            })
        });
    }

    submitPayment() {
        fetch('http://localhost:9000/sdk/verifyPayment', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_email: this.state.userEmail,
                merch_id: this.state.merchID,
                amount: this.state.amount,
                descrip: "Payment of " +  this.state.amount
            })
        }).then(res => {
            if (res.status ===200) {
                this.showConfirm();
            }
        })
    }

    showConfirm = () => {
        this.setState({
        ...this.state,
        showConfirm: true
        })
    }

    render() {
        return (
            <div>
                {!this.state.showConfirm ? <Checkout submitPayment={this.submitPayment} merchName={this.state.merchName} amount={this.state.amount} userBalance={this.state.userBalance} />
                                         : <Confirm />}
            </div>
        );
    }
}

export default FundsDeposit;