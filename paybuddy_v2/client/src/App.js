import React from 'react';
import './App.css';
import Header from './Header';
import FundsDeposit from './FundsDeposit';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render () {
    return (
      <div className="App">
        <Header />
        <NavigationBar/>

        {/* <body>
          <FundsDeposit />
        </body> */}
        
        <Footer/>
      </div>
    );
  }
}

export default App;