import React from 'react';
import history from '../../history';
import http from '../../http';
import { Button } from 'react-bootstrap';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            message: '',
            user_role: 'manager',
            manager_id: null,
            managers: [],
        }
    }

    componentDidMount() {
        http.get('/users/managers').then(managers => {
            console.log(managers);
            this.setState({ managers });
        })
            .catch(error => {
                console.log(error);
                this.props.toastRef.show(error.data.message, '', 3000);
            })
    }

    handlePropChanged(event, prop) {
        this.setState({ [prop]: event.target.value });
    }

    register() {
        const { name, email, password, confirm_password, user_role, manager_id } = this.state;
        if (!email || !password || !confirm_password) {
            this.setState({ message: 'Please fill in all fields!' })
        } else if (password !== confirm_password) {
            this.setState({ message: 'Passwords does not match!' })
        } else {
            http.post('/users/register', { name, email, password, user_role, manager_id }).then(() => {
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
                    <div><input value={this.state.name} placeholder="name" onChange={e => this.handlePropChanged(e, 'name')}></input></div>
                    <div><input value={this.state.email} placeholder="email" onChange={e => this.handlePropChanged(e, 'email')}></input></div>
                    <div><input value={this.state.password} placeholder="password" type="password" onChange={e => this.handlePropChanged(e, 'password')}></input></div>
                    <div><input value={this.state.confirm_password} placeholder="confirm password" type="password" onChange={e => this.handlePropChanged(e, 'confirm_password')}></input></div>
                    <div>
                        <label>Role:</label>
                        <select value={this.state.user_role} onChange={e => this.handlePropChanged(e, 'user_role')}>
                            <option value="manager">manager</option>
                            <option value="resource">resource</option>
                        </select>
                    </div>
                    <div>
                        <label>Manager:</label>
                        <select value={this.state.userRole} onChange={e => this.handlePropChanged(e, 'manager_id')}>
                            {this.state.managers.map(manager => <option key={manager.id} value={manager.id}>{manager.name}</option>)}
                            <option value={null}>none</option>
                        </select>
                    </div>
                    <Button type="button" color="primary" onClick={this.register.bind(this)}>REGISTER</Button>&nbsp;
                    <p>Already have an account? <Button onClick={() => history.push('/login')}>Sign In!</Button></p>
                    <p>{this.state.message}</p>
                </form>
            </>
        )
    }
}