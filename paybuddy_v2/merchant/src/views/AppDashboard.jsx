import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appList: ""
        }
    }
    
    callAPI() {
        let url = 'http://localhost:9000/merchant/apps/' + localStorage.getItem('id_token')
        
        fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
          this.setState({
            appList: data.message
          })
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    renderTableData() {
        return Object.keys(this.state.appList).map((key) => {
            var appID = this.state.appList[key].merchant_app_id;
            var title = this.state.appList[key].name;
            var return_url = this.state.appList[key].return_url;

            return (
                <tr key={key}>
                    <td>{title}</td>
                    <td>{return_url
                    }</td>
                    <td>
                        <p className='control-column'>
                            <Link to={`/app/${appID}/`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                        </p>
                    </td>
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
                                <h1 className='left'>Apps</h1>
                            </span>
                            <span className="col text-right">
                                <Link to={`/newProject/`}>
                                    <button className="btn btn-success">New App</button>
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>RETURN URL</th>
                                    <th>Actions</th>
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
