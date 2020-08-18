import React from 'react';
import TasksManager from './TasksManager';
import TasksResource from './TasksResource';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (localStorage.getItem('user_role') === 'manager') {
            return <TasksManager toastRef={this.props.toastRef} />
        }
        return <TasksResource />
    }

    // render() {
    //     if (localStorage.getItem('user_role') === 'manager') {
    //         return (
    //             <div>
    // <Button variant="primary" onClick={this.handleShow.bind(this)}>
    //     + Create
    // </Button>
    //                 <table id="tasks" class="table table-striped table-dark">
    //                     <thead>
    //                         <tr>
    //                             <th scope="col">ID </th>
    //                             <th scope="col">NAME </th>
    //                             <th scope="col">TYPE</th>
    //                             <th scope="col">STATUS</th>
    //                             <th scope="col">DESCRIPTION</th>
    //                             <th scope="col">PRIORITY</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>

    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.id}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.name}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.type}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.status}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.description}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.priority}</div>)}</td>

    //                     </tbody>
    //                 </table>


    //                 <table id="res" className="table table-sm">
    //                     <thead>
    //                         <tr>
    //                             <th scope="col">ID </th>
    //                             <th scope="col">NAME </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         <td>{this.state.resources.map(resource => <tr> {resource.id}</tr>)}</td>
    //                         <td>{this.state.resources.map(resource => <tr> {resource.name}</tr>)}</td>

    //                     </tbody>
    //                 </table>
    // <TaskModal show={this.state.showModal} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
    //             </div>)
    //     } else {

    //         return (
    //             <div>
    //                 <table className="table table-striped table-dark">
    //                     <thead>
    //                         <tr>
    //                             <th scope="col">ID </th>
    //                             <th scope="col">NAME </th>
    //                             <th scope="col">TYPE</th>
    //                             <th scope="col">STATUS</th>
    //                             <th scope="col">DESCRIPTION</th>
    //                             <th scope="col">PRIORITY</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>

    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.id}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.name}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.type}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.status}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.description}</div>)}</td>
    //                         <td>{this.state.tasks.map(task => <div key={task.id}>{task.priority}</div>)}</td>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         )
    //     }
    // }
}