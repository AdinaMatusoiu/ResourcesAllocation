import React from 'react';
import TasksList from '../TasksList';
import Task from '../Task';
import http from '../../http';


export default class TaskResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }],
            currentTask: null,
        }
    }

    componentDidMount() {
        console.log(`/users/resources/${this.props.viewer_id || localStorage.getItem('user_id')}/tasks`);
        http.get(`/users/resources/${this.props.viewer_id || localStorage.getItem('user_id')}/tasks`).then(tasks => {
            const stateTasks = this.state.tasks;
            if (tasks.length >= 10) {
                this.setState({ tasks })
            } else {
                tasks.forEach((task, index) => {
                    stateTasks[index] = task;
                })
                this.setState({ tasks: stateTasks });
            }
        });
    }

    componentDidUpdate() {
        console.log('viewer_id: ', this.props.viewer_id);
    }

    handleTaskClicked(index) {


        http.get(`/tasks/${this.state.tasks[index].id}/worklogs`).then(worklogs => {
            let { currentTask } = this.state;
            currentTask = this.state.tasks[index];
            currentTask.worklogs = [null, null, null, null, null];
            if (worklogs.length >= 5) {
                currentTask.worklogs = worklogs;
            } else {
                worklogs.forEach((worklog, index) => {
                    currentTask.worklogs[index] = worklog;
                })
            }
            this.setState({ currentTask });
        })
    }

    handleWorklogCreated(created) {
        const { currentTask } = this.state;
        const index = currentTask.worklogs.indexOf(null);
        if (index !== -1) {
            currentTask.worklogs[index] = created;
        } else {
            currentTask.worklogs.push(created);
        }
        this.setState({ currentTask });
    }


    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TasksList tasks={this.state.tasks} onTaskClicked={this.handleTaskClicked.bind(this)} />
                <Task viewer_id={this.props.viewer_id} {...this.state.currentTask} toastRef={this.props.toastRef} onWorklogCreated={this.handleWorklogCreated.bind(this)} />
            </div>
        )
    }
}