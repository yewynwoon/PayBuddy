import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acctValue: "",
            transactList: ""
        }
    }
    
    callAPI() {
        let url = 'http://localhost:9000/merchant/' + localStorage.getItem('id_token')
        
        fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
          this.setState({
            acctValue: data.acctValue[0].account_value,
            transactList: data.transactions
          })
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    renderTableData() {
        console.log(this.state.transactList)

        return Object.keys(this.state.transactList).map((key) => {

            var data = this.state.transactList[key].date_stamp.substring(5, 10).split('-');
            var date = data[1] + '-' + data[0];

            var descrip = this.state.transactList[key].description;

            var amount = this.state.transactList[key].amount;

            return (
                <tr key={key}>
                    <td>{date}</td>
                    <td>{descrip}</td>
                    <td>{amount}</td>
                </tr>
            )
        })
    }
      
    render() {
        return (
            <div>
                <Navbar id={this.props.match.params.id}/>
                <div>
                    <div>
                        <div>
                            <span>
                                <h1 >Merchant Dashboard</h1>
                            </span>
                            <span>
                                Balance: ${this.state.acctValue}
                            </span>
                        </div>
                    </div>
                    <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>DESCRIPTION</th>
                                <th>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
