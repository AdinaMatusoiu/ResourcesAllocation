import React from 'react';
import { Toast } from 'react-bootstrap';

export default class ToastWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            toastMessage: '',
            toastErrorMessage: '',
            timeout: null,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeout);
    }

    show(toastMessage, toastErrorMessage, time) {
        this.setState({ toastMessage, toastErrorMessage, showToast: true });
        clearTimeout(this.state.timeout);
        const timeout = setTimeout(() => {
            this.setState({ showToast: false, toastMessage: '', toastErrorMessage: '' });
        }, time ? time : 3000);
        this.setState({ timeout })
    }

    render() {
        return this.state.showToast ? (
            <Toast style={{
                position: 'absolute',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: 0,
                right: 0,
                bottom: '1em',
                textAlign: 'center',
                border: this.state.toastErrorMessage ? '2px solid red' : '2px solid green',
            }} show={this.state.showToast} onClose={() => this.setState({ showToast: false })}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">{this.state.toastErrorMessage ? 'Error' : 'Message'}</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body>
                    <p>{this.state.toastErrorMessage}</p>
                    <p>{this.state.toastMessage}</p>
                </Toast.Body>
            </Toast>
        ) : <></>
    }
}