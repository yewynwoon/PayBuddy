import React from 'react';
import './client.css';
import DP from './img/profilepic.png';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cust_acct_value: "",
            pastPayments: "",
            cust_transacts: ""
        }
    }

    callAPI() {
        fetch('http://localhost:9000/dashboard/1')
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            //console.log(data.pastTransactions);

            this.setState({
                ...this.state,
                cust_acct_value: data.acctValue[0].account_value,
                cust_transacts: data.pastPayments.concat(data.pastDeposits)
            })

            /* console.log(this.state.cust_deposits);
            console.log(this.state.cust_payments);
            console.log(this.state.cust_deposits.concat(this.state.cust_payments)); */

            //console.log(this.state.cust_deposits[0].deposit_id);
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    renderTableData() {
        return Object.keys(this.state.cust_transacts).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.cust_transacts[key].deposit_id}</td>
                    <td>{this.state.cust_transacts[key].bpay_payment_id}</td>
                    <td>{this.state.cust_transacts[key].amount}</td>
                    <td>{this.state.cust_transacts[key].date_stamp}</td>
                </tr>
            )
        })
    }

    render () {
        return (
            <main id='dashboardHome'>
                <div id='detailscontainer'>
                    <div id='customerbox'>
                        <span id='heading'>WELCOME BACK, </span>
                        <span id='customercontents'>
                            <img id='profilepic' src={DP}></img>
                            <span id='name'>THOMAS</span>
                        </span>
                        <a href="a" id='editacc'>EDIT ACCOUNT</a>
                    </div>
                    <div id='moneybox'>
                        <span id='heading'>CURRENT BALANCE</span>
                        <hr></hr>
                        <span id='moneycontents'>
                            <span id="currency">AUD</span>
                            <span id='accbalance'>${parseFloat(this.state.cust_acct_value).toFixed(2)}</span>
                        </span>
                        <a href="a" id='editfunds'>ADD FUNDS</a>
                    </div>
                </div>
                <b></b>
                <div id='tablecontainer'>
                    <div id='tableheading'>RECENT ACTIVITY</div>
                    <hr></hr>
                    <table id='table'>
                        { 
                            <thead>
                                <tr>
                                    <th>DEPOSIT ID</th>
                                    <th>PAYMENT ID</th>
                                    <th>AMOUNT</th>
                                    <th>TRANSACTION DATE</th>
                                </tr>
                            </thead>
                        }
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                {this.state.apiResponse}
            </main>
        )
    }
}



export default Dashboard;