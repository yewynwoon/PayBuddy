import { withOktaAuth } from '@okta/okta-react';
import React from 'react';
import './Dashboard.css';
import './fade-in-fast.css';
import DP from './img/profilepictemplate.png';

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
            cust_acct_value: '',
            pastPayments: '',
            cust_transacts: '',
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
            <main class='fade-in-fast'>
                <div id='dashboard-container'>
                    <div id='left-container'>
                        <div class='detailbox' id='customerbox'>
                            <span>WELCOME BACK,</span>
                            <span class='innercontents'>
                                <img id='profilepic' src={DP}></img>
                                <div id='name'>
                                    {this.state.userInfo &&<div>{this.state.userInfo.name}</div>}
                                </div>
                            </span>
                            <a href='https://dev-203865.okta.com/enduser/settings' class ='editdetails'>EDIT ACCOUNT</a>
                        </div>
                        <div class='detailbox' id='moneybox'>
                            <span id='detail-header'>CURRENT BALANCE</span>
                            <hr id='left-hr'></hr>
                            <span class='innercontents'>
                                <div id='currency'>AUD</div>
                                <div id='accbalance'>${parseFloat(this.state.cust_acct_value).toFixed(2)}</div>
                                <a href='/FundsDeposit' class ='editdetails'>ADD FUNDS</a>
                            </span>
                        </div>
                    </div>
                    <b></b>
                    <div id='right-container'>
                        <div id='tableheading'>RECENT ACTIVITY</div>
                        <hr id='left-hr'></hr>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>DESCRIPTION</th>
                                    <th id='align-right'>TYPE</th>
                                    <th id='align-right'>AMOUNT</th>
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

