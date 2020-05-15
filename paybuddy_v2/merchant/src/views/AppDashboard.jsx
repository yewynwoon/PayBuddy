import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          projectList: ""
        }
    }
    
    callAPI() {
        fetch('http://localhost:9000/dashboard/')
        .then((response) => { return response.json(); })
        .then((data) => {
          this.setState({
            projectList: data.projectList
          })
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    renderTableData() {
        return Object.keys(this.state.projectList).map((key) => {
            var title = this.state.projectList[key].title;
            var projectID = this.state.projectList[key].project_id;
            var type = this.state.projectList[key].type;

            return (
                <tr key={key}>
                    <td>{title}</td>
                    <td>{type}</td>
                    <td>
                        <p className='control-column'>
                            <Link to={`/project/${projectID}/`}>
                                <button className="btn btn-primary">View</button>
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
                                    <th>TYPE</th>
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
