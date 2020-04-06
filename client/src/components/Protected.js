import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Protected extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { Component, ...rest } = this.props;
        if (localStorage.getItem('access_token')) {
            return <Component {...rest} />
        } else {
            return <Redirect to="/login" />
        }
    }
}
