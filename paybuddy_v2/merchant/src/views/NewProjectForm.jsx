import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/NewProjectForm.css'


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
            <div class='main-container'>
                <div>
                    <h3 class='title'>
                        New App
                    </h3>
                </div>
                <div>
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div>
                            <label class='subtitle' htmlFor="title">App Name: </label>
                            
                            <div>
                                <input class='classic-input' type="text" id="name" required/>
                            </div>
                        </div>

                        <div>
                            <label class='subtitle' htmlFor="title" >Return URL: </label>
                            
                            <div>
                                <input class='classic-input' type="text"/>
                            </div>
                        </div>

                        <div class='button-container'>
                            <div>
                                <Link to={`/`}>
                                    <button class='grey-button space-right'>Cancel</button>
                                </Link>
                                <button class='orange-button' type="submit">
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
            <div>
                {this.renderProject()}
            </div>
        )
    }
}

export default NewProjectForm
