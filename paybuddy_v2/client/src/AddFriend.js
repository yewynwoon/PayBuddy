import React from 'react';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends_list: "",
            newFriend_Request_list: "",
            addfriend_id: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    callAPI() {
        fetch('http://localhost:9000/addfriend/1')
        //fetch('http://localhost:9000/addfriend/1/3')
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);
                

                this.setState({
                    ...this.state,
                    friends_list: data.friendsList,
                    newFriend_Request_list: data.friendReqList
                })
                //console.log(this.state.newFriend_Request_list);
                

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

            },
            body: {

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
        
    }

    renderFriendListTable() {
        return Object.keys(this.state.friends_list).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.friends_list[key].cust_id1}</td>
                    <td>{this.state.friends_list[key].Full_Name}</td>
                </tr>

            )
        })
    }

    renderNewFriendListTable() {
        return Object.keys(this.state.newFriend_Request_list).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.newFriend_Request_list[key].cust_id1}</td>
                    <td>{this.state.newFriend_Request_list[key].Full_Name}</td>
                </tr>

            )
        })
    }

    render() {
        return (
            <div>
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
                                <th>Full Name</th>
                            </tr>
                        </thead>
                        }
                        <tbody>
                            {this.renderFriendListTable()}
                        </tbody>
                    </table>
                </div>
                
                <div id='tablecontainer'>
                    <div id='tableheading'>New Friend Request</div>
                    <hr></hr>
                    <table id='table'>
                        {
                            <thead>
                            <tr>
                                <th>Friend ID</th>
                                <th>Full Name</th>
                                <th>Respond</th>
                            </tr>
                        </thead>
                        }
                        <tbody>
                            {this.renderNewFriendListTable()}
                        </tbody>
                    </table>
                </div>


            </div>
        );


    }



}

export default AddFriend;