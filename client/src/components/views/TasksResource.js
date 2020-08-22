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
        http.get('/users/resources/tasks').then(tasks => {
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

    handleTaskClicked(index) {
        this.setState({ currentTask: this.state.tasks[index] })
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TasksList tasks={this.state.tasks} onTaskClicked={this.handleTaskClicked.bind(this)} />
                <Task {...this.state.currentTask} />
            </div>
        )
    }
}