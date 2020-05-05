import React from 'react';
import './AddFriend.css';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends_list: "",
            newFriend_Request_list: "",
            addfriend_id: "",
            aa: " ",
          

        };

        // for input form
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);

        //for accept friend button
        this.handleClick = this.handleClick.bind(this);

        //for Decline friend button
        this.handleClick1 = this.handleClick1.bind(this);

    

    }

    //for Decline friend button
    handleClick1(event) {
        const decline_friend_id = event.target.id

        alert('confirm');
        event.preventDefault();
        console.log(decline_friend_id);
        window.location.reload(false);
        fetch('http://localhost:9000/addfriend/declinefriendRequest', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: 1,
                friend_id: decline_friend_id,
            })
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


    handleClick(event) {
        const friend_idq = event.target.id

        alert('confirm');
        event.preventDefault();
        console.log(friend_idq);
        window.location.reload(false);
        fetch('http://localhost:9000/addfriend/respondfriendRequest', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: 1,
                friend_id: friend_idq,                             
              })
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

    // for input form
    handleChange1(event) {
        this.setState({ addfriend_id: event.target.value });
    }
    handleSubmit1(event) {
        alert('A friend was added: ' + this.state.addfriend_id);
        event.preventDefault();

        fetch('http://localhost:9000/addfriend/addfriend-by-id', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: 1,
                friend_id: this.state.addfriend_id,                             
              })
        })
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);       

            });
    }


/*

    handleSubmit1(event) {
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
    */

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
                    <td><button type="submit" id={this.state.newFriend_Request_list[key].cust_id1} onClick={this.handleClick}>Accept</button> </td>
                    <td><button type="submit" id={this.state.newFriend_Request_list[key].cust_id1} onClick={this.handleClick1}>Decline</button> </td>
                </tr>

            )
        })
    }

    render() {
        return (
            <div class='fade-in-fast'>
                <h2 id='title'>Add Friend</h2>
                <div class='main'>
                    <div id='addfriend'>
                        <form onSubmit={this.handleSubmit1}>
                            <label>
                                NAME:
                                <input id='textbox' placeholder=' User-ID' value={this.state.addfriend_id} onChange={this.handleChange1} />
                            </label>
                            <input id='submit' type="submit" value="Submit" />
                        </form>
                    </div>
            
                    <div id='tablecontainer'>
                        <div id='tableheading'>FRIEND LIST</div>
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
                        <div id='tableheading'>NEW FRIEND REQUEST</div>
                        <hr></hr>
                        <table id='table'>
                            {
                                <thead>
                                <tr>
                                    <th>Friend ID</th>
                                    <th>Full Name</th>
                                    <th>Response</th>
                                </tr>
                            </thead>
                            }
                            <tbody>
                                {this.renderNewFriendListTable()}
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div>
        );
    }
}

export default AddFriend;