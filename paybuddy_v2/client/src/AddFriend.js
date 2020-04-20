import React from 'react';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = { friends_list: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    callAPI() {
        fetch('http://localhost:9000/dashboard?user_id=1')
            .then((response) => {
                return response.json();
            })

            .then((data) => {

                this.setState({
                    ...this.state,
                    friends_list: data.ReqFriendsList
                })

            });
    }

    componentWillMount() {
        this.callAPI();
    }


    handleChange(event) { this.setState({ value: event.target.value }); }

    handleSubmit(event) {
        alert('You Have Added a : ' + this.state.value);
        event.preventDefault();
    }

    renderFriendTable() {
        return Object.keys(this.state.friends_list).map((key) => {
            return (
                <tr key={key}>
                    <td>{this.state.friends_list[key].user_id}</td>
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
                        <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
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
                                    <th>Friend List</th>
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