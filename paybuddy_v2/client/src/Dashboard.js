import { withOktaAuth } from '@okta/okta-react';
import React from 'react';
import './Dashboard.css';
import './fade-in-fast.css';
import DP from './img/profilepictemplate.png';

async function checkUser() {
    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
      const userInfo = await this.props.authService.getUser();

      this.setState({
        ...this.state,
        userInfo: userInfo
    })
      
      fetch('https://paybuddy-2020.ts.r.appspot.com/dashboard/' + userInfo.email)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data)
            this.setState({
                ...this.state,
                cust_acct_value: data.acctValue[0].account_value,
                cust_transacts: data.transactions
            })
        });
    }
}

export default withOktaAuth (class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cust_acct_value: '',
            pastPayments: '',
            cust_transacts: '',
            userInfo: ''
        }
        this.checkUser = checkUser.bind(this);
    }
    
    componentWillMount() {
        this.checkUser();
    }

    componentDidUpdate() {
        this.checkUser();
    }

    renderTableData() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>DESCRIPTION</th>
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        Object.keys(this.state.cust_transacts).map((key) => {

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
                    })}
                </tbody>
            </table>
        )
    }

    render () {
        return (
            <main className='fade-in-fast'>
                <div id='dashboard-container'>
                    <div id='left-container'>
                        <div className='detailbox' id='customerbox'>
                            <span>WELCOME BACK,</span>
                            <span className='innercontents'>
                                <img id='profilepic' src={DP}></img>
                                <div id='name'>
                                    {this.state.userInfo &&<div>{this.state.userInfo.name}</div>}
                                </div>
                            </span>
                            <a href='https://dev-203865.okta.com/enduser/settings' className ='editdetails'>EDIT ACCOUNT</a>
                        </div>
                        <div className='detailbox' id='moneybox'>
                            <span id='detail-header'>CURRENT BALANCE</span>
                            <hr id='left-hr'></hr>
                            <span className='innercontents'>
                                <div id='currency'>USD</div>
                                <div id='accbalance'>${parseFloat(this.state.cust_acct_value).toFixed(2)}</div>
                                <a href='/FundsDeposit' className ='editdetails'>ADD FUNDS</a>
                            </span>
                        </div>
                    </div>
                    <b></b>
                    <div id='right-container'>
                        <div id='tableheading'>RECENT ACTIVITY</div>
                        <hr id='left-hr'></hr>
                        {this.renderTableData()}
                    </div>
                </div>
            </main>
        )
    };
})