import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NewProjectForm extends Component {
    handleSubmit = (event) => {
        var name = event.target.name.value
        var return_url = event.target.return_url.value

        console.log(localStorage.getItem('id_token'), name, return_url)


        fetch('http://localhost:9000/merchant/new', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                merchant_id: localStorage.getItem('id_token'),
                name: name,
                return_url: return_url
            })
        }).then((res) => {
            window.location.href = "/";
        })
        
        event.preventDefault()
    }

    renderProject() {
        return (
            <div className="container px-4 py-2">
                <div className="row">
                    <h3>
                        New App
                    </h3>
                </div>
                <div className="row">
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">App Name: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="name" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Return URL: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="return_url" />
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <Link to={`/`}>
                                    <button className="btn btn-danger">Cancel</button>
                                </Link>
                                <button type="submit" className="btn btn-success">
                                    Create
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
                <div className="col-md-8 p-2">
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default NewProjectForm
