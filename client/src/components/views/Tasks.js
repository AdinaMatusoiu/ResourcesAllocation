import React from 'react';
import TasksManager from './TasksManager';
import TasksResource from './TasksResource';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (localStorage.getItem('user_role') === 'manager' && !this.props.viewer_id) {
            return <TasksManager toastRef={this.props.toastRef} viewer_id={this.props.viewer_id} onEnterViewerMode={this.props.onEnterViewerMode} />
        }
        return <TasksResource viewer_id={this.props.viewer_id} onEnterViewerMode={this.props.onEnterViewerMode} toastRef={this.props.toastRef} />
    }
}