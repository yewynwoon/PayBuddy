import { useOktaAuth } from '@okta/okta-react'
import React, { useState, useEffect } from 'react'
import './client.css'
import './fade-in-fast.css'
import DP from './img/profilepictemplate.png'

function Dashboard (props) {

    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [acctValue, setAcctValue] = useState(null);
    const [transactTable, setTransactTable] = useState(null);

    useEffect(() => {
      authService.getUser().then((info) => {
          setUserInfo(info);
          console.log(userInfo)
        });
    }, [authService]); // Update if authState changes

    useEffect(() => {
        let url = 'http://localhost:9000/dashboard/s3539822@stuent.rmit.edu.au' // + user.info
        fetch('http://localhost:9000/dashboard/s3539822@student.rmit.edu.au')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setAcctValue(data.acctValue[0].account_value)
            setTransactTable(Object.keys(data.transactions).map((key) => {

                var date = data.transactions[key].date_stamp.substring(5, 10).split('-');
                date = date[1] + '-' + date[0];
    
                var descrip = data.transactions[key].description;
    
                var amount;
                var type;
    
                if (data.transactions[key].type === 'credit') {
                    amount = '+$' + data.transactions[key].amount;
                    type = 'credit';
                } else {
                    amount = '-$' + data.transactions[key].amount;
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
            }))
        });
    });    
    
    return (
        <main class='fade-in-fast' id='dashboardHome'>
            <div id='main-container'>
                <div id='left-container'>
                    <div id='customerbox'>
                        <span>WELCOME BACK,</span>
                        <span id='customercontents'>
                            <img id='profilepic' src={DP} alt=''></img>
                            <div id='name'>
                                {userInfo &&<div>{userInfo.name}</div>}
                            </div>
                        </span>
                        <a href="https://dev-203865.okta.com/enduser/settings" id='editacc'>EDIT ACCOUNT</a>
                    </div>
                    <div id='moneybox'>
                        <span id='heading'>CURRENT BALANCE</span>
                        <hr></hr>
                        <span id='moneycontents'>
                            <div id="currency">AUD</div>
                            <div id='accbalance'>${parseFloat(acctValue).toFixed(2)}</div>
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
                            {transactTable}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;

