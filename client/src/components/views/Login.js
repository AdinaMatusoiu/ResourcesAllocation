import React from 'react';
import history from '../../history';
import http from '../../http';
import { Button } from 'react-bootstrap';

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
            <form>
                <div><input placeholder="email" onChange={this.handleEmailChange.bind(this)}></input></div>
                <div><input placeholder="password" type="password" onChange={this.handlePasswordChange.bind(this)}></input></div>
                <Button type="button" color="primary" onClick={this.login.bind(this)}>SIGN IN</Button>&nbsp;
            </form>
        )
    }
}