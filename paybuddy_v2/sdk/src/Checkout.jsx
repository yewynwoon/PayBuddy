import React from 'react'

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: props.user.email,
            userBalance: '',
            merchName: '',
            merchID: 1,
            amount: 5//'',
        }
    }

    componentDidMount() {
        this.getUserBalance()
        this.getMerchantName()
    }

    getMerchantName() {
        let url = "http://localhost:9000/sdk/merchantName/" + this.state.merchID
        fetch(url)
        .then(res => {
            if (res.status ===200) {
                return res.json()
            }
        })
        .then(res => {
            this.setState({
                merchName: res.name[0].cname
            })
        });
    }

    getUserBalance() {
        let url = "http://localhost:9000/sdk/accBalance/email/" + this.state.userEmail
        fetch(url)
        .then(res => {
            if (res.status ===200) {
                return res.json()
            }
        })
        .then(res => {
            this.setState({
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
                return res.json()
            }
        }).then(res => {
            console.log(res);
           /*  if(res.status === 200) {
                console.log('responseFromServer');

                //Page re-route
                window.location.href = "/Dashboard?user_id=1";
            } else {
                console.log('API error');
            } */
        });
    }

    render () {
        return (
            <div className="row">
                <div className="form-group row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Merchant: {this.state.merchName}</label>
                </div>

                <div className="form-group row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Amount: {this.state.amount}</label>
                </div>

                <div className="form-group row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Account Balance: {this.state.userBalance}</label>     
                </div>

                <div className="form-group row mb-0">
                    <div className="col-md-8 offset-md-4">
                        {/* <Link to={`/project/${this.props.match.params.id}`}>
                            <button className="btn btn-danger">Cancel</button>
                        </Link> */}
                        <button type="submit" className="btn btn-primary" onClick={this.submitPayment}>
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout