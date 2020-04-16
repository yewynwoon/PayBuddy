import React from 'react';
import './App.css';
import Header from './Header';
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
        <Footer/>
      </div>
    );
  }
}

export default App;