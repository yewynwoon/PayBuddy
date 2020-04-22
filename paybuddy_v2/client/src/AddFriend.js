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
                console.log(data);

                this.setState({
                    ...this.state,
                    friends_list: data.testQueryResp
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

    renderFriendTable() {
        return Object.keys(this.state.friends_list).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.friends_list[key].cust_id1}</td>
                    <td>{this.state.friends_list[key].cust_id2}</td>
                    <td>{this.state.friends_list[key].cust_1req}</td>
                    <td>{this.state.friends_list[key].cust_2res}</td>
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
                                <th>CUST ID 1</th>
                                <th>CUST ID 2</th>
                                <th>DFGFD</th>
                                <th>TRANSACDFGDFGDFTION DATE</th>
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