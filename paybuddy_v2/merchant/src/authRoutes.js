import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AppDashboard from './views/AppDashboard.jsx'
import App from './views/App'
import NewProject from './views/NewProjectForm'
import AcctDashboard from './views/AcctDashboard'

const authRoutes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={(props) => <AppDashboard {...props} />} />
        <Route path="/app/:id" component={(props) => <App {...props}/>} />
        <Route path="/newProject/" component={(props) => <NewProject {...props}/>} />
        <Route path="/dash/" component={(props) => <AcctDashboard {...props}/>} />
      </Switch>
    </Router>
);

export default authRoutes;