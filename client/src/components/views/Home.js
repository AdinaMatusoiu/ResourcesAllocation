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
                HOME
            </div>
        )
    }
}