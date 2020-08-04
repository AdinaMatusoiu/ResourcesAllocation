import React from 'react';
import history from '../../history';

export default class Home extends React.Component {

    logout() {
        localStorage.clear();
        history.push('/login');
    }

    render() {
        return (
            <div>
                HOME
            </div>
        )
    }
}