import React from 'react';
import './App.css';

const Checkout = props => {
    return (
        <div>
            <div class="info-row">
                <div class="title-cont">
                    <label class="info-title" htmlFor="title">Merchant:</label>
                </div>
                <div class="info-data">{props.merchName}</div>
            </div>

            <div class="info-row">
                <div class="title-cont">
                    <label class="info-title" htmlFor="title">Amount:</label>
                </div>
                <div class="info-data">${props.amount}</div>
            </div>

            <div class="info-row">
                <div class="title-cont">
                    <label class="info-title" htmlFor="title">Account Balance:</label>
                </div>
                <div class="info-data">${props.userBalance}</div>
            </div>

            <div class="info-row">
                <div>
                    {/* <Link to={`/project/${this.props.match.params.id}`}>
                        <button className="btn btn-danger">Cancel</button>
                    </Link> */}
                    <button class="orange-button" type="submit" onClick={props.submitPayment}>
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

const Confirm = props => {
    return (
        <div >
            <div class="fade-in-fast">
                <div class="info-row">
                    Payment Complete!    
                </div>
                <div class="info-row">
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