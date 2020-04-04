import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DashboardComp from './Dashboard';
import FundsDepositComp from './FundsDeposit';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function NavigationBar() {
  return (
    <Router>
      <div>
        <nav class='header'>
          <div class="topnav">
            <Link to="/Dashboard">Home</Link>
            <Link to="/FundsDeposit">Deposit Funds</Link>

            <br/>

            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            
          </div>
          <body>
              <Switch>
                <Route path="/Dashboard"><Index /></Route>
                <Route path="/FundsDeposit"><FundsDeposit /></Route>
              </Switch>
            </body>
        </nav>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Index() {
  return (
    <div>
      <DashboardComp user_id="1"/>
    </div>
  );
}

function FundsDeposit() {
  return (
    <div>
      <FundsDepositComp/>
    </div>
  );
}
