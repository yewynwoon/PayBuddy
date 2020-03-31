import React from 'react';
import logo from './logo.svg';
import './App.css';
import FundsDeposit from './FundsDeposit';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/server")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  render () {
    return (
      <div className="App">
        <FundsDeposit />
        
        {/* <h4> class="header center") Recent Votes</h4>
        <ul class="container collection center">
          {for(vote : apiResponse)
          li(class="collection-item avatar")
            if vote.candidate.trim() === 'TABS'
              i(class="material-icons circle green") keyboard_tab
            else
              i(class="material-icons circle blue") space_bar
            span(class="title") A vote for <b>#{vote.candidate}</b>
            p was cast at #{vote.time_cast}.
            </ul> */}
        
        
        
        
        
        
        
        
        {this.state.apiResponse}
      </div>
    );
  }
}

export default App;