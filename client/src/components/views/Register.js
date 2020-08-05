import React from 'react';
import history from '../../history';
import http from '../../http';
import { Button } from 'react-bootstrap';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            message: '',
        }
    }

    handlePropChanged(event, prop) {
        this.setState({ [prop]: event.target.value });
    }

    register() {
        const { email, password, confirmPassword } = this.state;
        if (!email || !password || !confirmPassword) {
            this.setState({ message: 'Please fill in all fields!' })
        } else if (password !== confirmPassword) {
            this.setState({ message: 'Passwords does not match!' })
        } else {
            http.post('/users/register', { email, password }).then(() => {
                this.props.toastRef.current.show('Your account has been created!', '', 3000);
                history.push('/login');
            }).catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            });
        }
    }

    render() {
        return (
            <>
                <form>
                    <div><input value={this.state.email} placeholder="email" onChange={e => this.handlePropChanged(e, 'email')}></input></div>
                    <div><input value={this.state.password} placeholder="password" type="password" onChange={e => this.handlePropChanged(e, 'password')}></input></div>
                    <div><input value={this.state.confirmPassword} placeholder="confirm password" type="password" onChange={e => this.handlePropChanged(e, 'confirmPassword')}></input></div>
                    <Button type="button" color="primary" onClick={this.register.bind(this)}>REGISTER</Button>&nbsp;
                    <p>Already have an account? <Button onClick={() => history.push('/login')}>Sign In!</Button></p>
                    <p>{this.state.message}</p>
                </form>
            </>
        )
    }
}