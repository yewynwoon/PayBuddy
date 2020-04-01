import React from 'react';
import './App.css';
import FundsDeposit from './FundsDeposit';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }/* 

  callAPI() {
      fetch("http://localhost:9000/server")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  } */

  render () {
    return (
      <div className="App">
        <FundsDeposit />
        {/* {this.state.apiResponse} */}
      </div>
    );
  }
}

export default App;