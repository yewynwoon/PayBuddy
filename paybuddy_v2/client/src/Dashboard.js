import React from 'react';
import './course.css';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:9000/dashboardGet")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
    }

    render () {
        return (
            <div>
                {/*this.state.apiResponse*/}
                
                <main id='cous'>
                    <table>
                        <tr>
                            <h1 class='welcomeText'>
                                Current Customer Placeholder
                            </h1>
                        </tr>
                        <tc>
                            <h1 class='welcomeText'>
                                Account Balance Placeholder
                            </h1>
                        </tc>
                    </table>
                    <b></b>
                    <table id='tab'>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Transaction Date</th>
                        </tr>
                    </table>
                </main>
            </div>
        )
    }
}

export default Dashboard;