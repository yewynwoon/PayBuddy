import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
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
            <div className='row'>
                <Sidebar id={this.props.match.params.id}/>
                <div className="col-md-8 p-2">
                    <div className="page-header">
                        <div className="row justify-content-center">
                            <span className="col text-left">
                                <h1 className='left'>Merchant Dashboard</h1>
                            </span>
                            <span className="col text-right">
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
