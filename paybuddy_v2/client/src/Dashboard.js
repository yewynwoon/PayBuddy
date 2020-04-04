import React from 'react';
import './course.css';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cust_acct_value: "", cust_transactions: ""};
    }

    callAPI() {
        fetch('http://localhost:9000/dashboard?user_id=1')
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

            console.log(this.state.cust_transactions[0].deposit_id);
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    renderTableData() {
        return Object.keys(this.state.cust_transactions).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.cust_transactions[key].deposit_id}</td>
                    <td>{this.state.cust_transactions[key].amount}</td>
                    <td>{this.state.cust_transactions[key].date_stamp}</td>
                </tr>
            )
        })
    }

    render () {
        return (
            <main id='cous'>
                <table>
                    <tr>
                        <h1 class='welcomeText'>
                            Current Customer {this.state.cust_acct_value}
                        </h1>
                    </tr>
                    <tc>
                        <h1 class='welcomeText'>
                            Account Balance Placeholder
                        </h1>
                    </tc>
                </table>
                <b></b>
                <table id='tab'>
                    { <thead>
                        <tr>
                            <th>Deposit ID</th>
                            <th>Amount</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                
                {this.state.apiResponse}
            </main>
        )
    }
}



export default Dashboard;