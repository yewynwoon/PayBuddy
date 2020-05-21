import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../css/AppDashboard.css';

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
                                <button class='white-button-small'>Edit</button>
                            </Link>
                        </p>
                    </td>
                </tr>
            )
        })
    }
      
    render() {
        return (
            <div>
                <Navbar id={this.props.match.params.id}/>
                <div class='content-container'>
                    <div class='app-heading-container'>
                            <h1 class='apps-heading'>APPS</h1>
                            <div class='new-app-btn'>
                                <Link to={`/newProject/`}>
                                    <button class='white-button'>New App</button>
                                </Link>
                            </div>
                    </div>
                    <div class='main-content-container'>
                        <table class='table'>
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
