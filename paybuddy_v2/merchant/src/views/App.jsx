import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

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
            <div class='main-container'>
                <div >
                    <h3 class='title'>
                        {this.state.name}
                    </h3>
                </div>
                <div>
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div>
                            <label class='subtitle' htmlFor="title">App Name: </label>
                            
                            <div>
                                <input class='classic-input' type="text" placeholder={this.state.name} />
                            </div>
                        </div>
                        <div>
                            <label class='subtitle' htmlFor="title">Return URL: </label>
                            
                            <div>
                                <input class='classic-input' type="text" placeholder={this.state.return_url} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <Link to={`/`}>
                                    <button class='grey-button space-right'>Cancel</button>
                                </Link>
                                
                                <button class='red-button red space-right'onClick={(e) => this.deleteApp(this.props.match.params.id, e)}>Delete</button>
                                <button class='orange-button space-right'type="submit">
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
            <div>
                <Navbar id={this.props.match.params.id}/>
                <div>
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default App