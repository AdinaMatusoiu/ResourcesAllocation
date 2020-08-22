import React from 'react';

export default class TasksList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log(this.props);
    }

    render() {
        return (<div style={{ width: '50%', overflowY: 'scroll', overflowX: 'hidden', margin: '0 2em 0 2em', maxHeight: '400px' }} >
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tasks.map((task, index) => {
                        if (task) {
                            return (<tr key={task.id} className="clickable" onClick={() => this.props.onTaskClicked(index)}>
                                <td>{index + 1}</td>
                                <td>{task.name}</td>
                                <td>{task.priority}</td>
                            </tr>)
                        } else {
                            return <tr key={index}><td></td><td></td><td></td></tr>
                        }
                    }
                    )}
                </tbody>
            </table>
        </div >)
    }
}