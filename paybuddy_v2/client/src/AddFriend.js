import React from 'react';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = { friends_list: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    callAPI() {
        fetch('http://localhost:9000/addfriend/1/3')
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data.friendsList);

                this.setState({
                    ...this.state,
                    friends_list: data.friendsList
                })

            });
    }

    componentWillMount() {
        this.callAPI();
    }



    handleSubmit(event) {
        event.preventDefault();

        alert('You Have Added a : ' + event);

        fetch('http://localhost:9000/addfriend/friendRequest/1/3', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: {
                custID: 1
                
                
            }
        })
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);

                this.setState({
                    ...this.state,
                    friends_list: data.testQueryResp
                })

            });
            console.log(event);
        
    }

    renderFriendTable() {
        return Object.keys(this.state.friends_list).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.friends_list[key].cust_id1}</td>
                    <td>{this.state.friends_list[key].Full_Name}</td>
                </tr>

            )
        })
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                        <input type="text" />        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div id='tablecontainer'>
                    <div id='tableheading'>Friend List</div>
                    <hr></hr>
                    <table id='table'>
                        {
                            <thead>
                            <tr>
                                <th>Friend ID</th>
                                <th>Friend Full Name</th>
                            </tr>
                        </thead>
                        }
                        <tbody>
                            {this.renderFriendTable()}
                        </tbody>
                    </table>
                </div>


            </div>
        );


    }




}

export default AddFriend;