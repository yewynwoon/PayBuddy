import { withOktaAuth } from '@okta/okta-react';
import React from 'react';
import './client.css';
import './fade-in-fast.css';
import DP from './img/profilepic.png';

async function checkUser() {
    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
      const userInfo = await this.props.authService.getUser();
      this.setState({ userInfo });
    }
  }

  export default withOktaAuth (class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cust_acct_value: "",
            pastPayments: "",
            cust_transacts: "",
            userInfo: null
        }
        this.checkUser = checkUser.bind(this);
    }

    callAPI() {
        fetch('http://localhost:9000/dashboard/1')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                ...this.state,
                cust_acct_value: data.acctValue[0].account_value,
                cust_transacts: data.transactions
            })
        });
    }
    
    componentWillMount() {
        this.callAPI();
        this.checkUser();
    }

     componentDidUpdate() {
        this.checkUser();
      }

    renderTableData() {
        return Object.keys(this.state.cust_transacts).map((key) => {

            var data = this.state.cust_transacts[key].date_stamp.substring(5, 10).split('-');
            var date = data[1] + '-' + data[0];

            var descrip = this.state.cust_transacts[key].description;

            var amount;
            var type;

            if (this.state.cust_transacts[key].type == 'credit') {
                amount = '+$' + this.state.cust_transacts[key].amount;
                type = 'credit';
            } else {
                amount = '-$' + this.state.cust_transacts[key].amount;
                type = 'debit';
            }

            return (
                <tr key={key}>
                    <td>{date}</td>
                    <td>{descrip}</td>
                    <td>{type}</td>
                    <td>{amount}</td>
                </tr>
            )
        })
    }

    render () {
        return (
            <main class='fade-in-fast' id='dashboardHome'>
                <div id='main-container'>
                    <div id='left-container'>
                        <div id='customerbox'>
                            <span>WELCOME BACK,</span>
                            <span id='customercontents'>
                                <img id='profilepic' src={DP}></img>
                                <span id='name'>
                                    {this.state.userInfo &&<div>{this.state.userInfo.name}</div>}
                            </span>
                            </span>
                            <a href="https://dev-203865.okta.com/enduser/settings" id='editacc'>EDIT ACCOUNT</a>
                        </div>
                        <div id='moneybox'>
                            <span id='heading'>CURRENT BALANCE</span>
                            <hr></hr>
                            <span id='moneycontents'>
                                <div id="currency">AUD</div>
                                <div id='accbalance'>${parseFloat(this.state.cust_acct_value).toFixed(2)}</div>
                                <a href="/FundsDeposit" id='editfunds'>ADD FUNDS</a>
                            </span>
                        </div>
                    </div>
                    <b></b>
                    <div id='right-container'>
                        <div id='tableheading'>RECENT ACTIVITY</div>
                        <hr></hr>
                        <table id='table'>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>DESCRIPTION</th>
                                    <th>TYPE</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    {this.state.apiResponse}
                </div>
            </main>
        )
    }
})

