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

  function 

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

    render () {
        return (
           <div>
               <button onclick = "">
                   PayBuddy
               </button>
            // You add the PayPal Smart Payment Buttons to your web page.
                Your buyer clicks the button.
                The button calls PayPal Orders API to set up a transaction.
                The button launches the PayPal Checkout experience.
                The buyer approves the payment.
                The button calls PayPal Orders API to finalize the transaction.
                You show a confirmation to your buyer.
        </div>
                
        )
    }
})

