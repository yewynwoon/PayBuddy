import React from 'react';
import './AddFriend.css';
import './fade-in-fast.css';
import addfriend from './img/addfriends.png';

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
                <div class='header-text'>Add Friend</div>
                <div class='inner-box'>
                    <img id='addfriends-img' src={addfriend}></img>
                    <div class='title'>send friend request</div>
                    <div id='spaceout'>
                        <form onSubmit={this.handleSubmit1}>
                            <label class='text-line'>
                                USER-ID:
                                <input id='spaceout' placeholder=' user-id' value={this.state.addfriend_id} onChange={this.handleChange1} />
                            </label>
                            <input class='orange-button button-text' id='spaceout' type="submit" value="SEND REQUEST" />
                        </form>
                    </div>
            
                    <div id='tablecontainer'>
                        <div id='tableheading'>FRIEND LIST</div>
                        <hr id='left-hr'></hr>
                        <table class='table'>
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
                        <div id='tableheading'>PENDING FRIEND REQUESTS</div>
                        <hr id='left-hr'></hr>
                        <table class='table'>
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