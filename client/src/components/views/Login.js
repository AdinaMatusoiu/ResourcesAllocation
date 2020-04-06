import React from 'react';
import history from '../../history';
import http from '../../http';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    login() {
        http.post('/users/login', this.state).then(data => {
            localStorage.setItem('access_token', data.access_token);
            history.push('/home');
        }).catch(error => console.log('error:', error));
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <div><input placeholder="email" onChange={this.handleEmailChange.bind(this)}></input></div>
                <div><input placeholder="password" type="password" onChange={this.handlePasswordChange.bind(this)}></input></div>
                <button onClick={this.login.bind(this)}>SIGN IN</button>
                <button onClick={() => {
                    http.get('/users/test').then(response => console.log(response))
                        .catch(error => console.log(error));
                }}>test</button>
            </div>
        )
    }
}