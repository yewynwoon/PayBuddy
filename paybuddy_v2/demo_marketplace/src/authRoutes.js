import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './views/Home.jsx'
import Success from './views/Success.jsx'

const authRoutes = ({product}) => (
    <Router>
      <Switch>
        <Route exact path="/" component={(props) => <Home product={product} {...props} />} />
        <Route path="/success/" component={(props) => <Success product={product} {...props}/>} />
      </Switch>
    </Router>
);

export default authRoutes;