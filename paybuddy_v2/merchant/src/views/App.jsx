import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            project_id: "",
            name: "",
            return_url: ""
        }
    }

    getProjectData(projectID) {
        fetch("http://localhost:9000/merchant/app/"+projectID)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                return_url: res.message[0].return_url,
                name: res.message[0].name
            })
        });
    }

    componentWillMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        fetch('http://localhost:9000/merchant/'+this.props.match.params.id+'/update', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                return_url: this.state.return_url
            })
        }).then((res) => {
            this.componentWillMount()
        })
        event.preventDefault()
    }

    deleteApp(appID, e) {
        fetch('http://localhost:9000/merchant/deleteApp/'+appID)
        .then((response) => {
            if (response.status === 200) {
                window.location.href = "/";
            }
        })
    }

    renderProject() {
        return (
            <div className="container px-4 py-2">
                <div className="row">
                    <h3>
                        {this.state.name}
                    </h3>
                </div>
                <div className="row">
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">App Name: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="title" placeholder={this.state.name} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Return URL: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="title" placeholder={this.state.return_url} />
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <Link to={`/`}>
                                    <button className="btn btn-warning">Cancel</button>
                                </Link>
                                
                                <button className="btn btn-danger" onClick={(e) => this.deleteApp(this.props.match.params.id, e)}>Delete</button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (                
            <div className="row">
                <Sidebar id={this.props.match.params.id}/>
                <div className="col-md-8 p-2">
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default App