import React from 'react';

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

        //for accept friend form 
       // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        const v = this.state.newFriend_Request_list.Full_Name;

        alert('confirm');
        event.preventDefault();
        console.log(v);

        fetch('http://localhost:9000/addfriend/respondfriendRequest', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: 1,
                friend_id: 2,                             
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
                    <td><button type="submit" value={this.state.newFriend_Request_list.cust_id1} onClick={this.handleSubmit}>Accept</button> </td>
                </tr>

            )
        })
    }

    render() {
        return (
            <div>

                <div>
                    <form onSubmit={this.handleSubmit1}>
                        <label>
                            Name:
          <input value={this.state.addfriend_id} onChange={this.handleChange1} />        </label>
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