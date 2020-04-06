import React from 'react';
import history from '../../history';
import http from '../../http';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        localStorage.clear();
        history.push('/login');
    }

    render() {
        return (
            <div>
                home
                <button onClick={this.logout.bind(this)}>SIGN OUT</button>
                <button onClick={() => {
                    http.get('/users/test').then(response => console.log(response))
                        .catch(error => console.log(error));
                }}>test</button>
            </div>
        )
    }
}