import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class WorkLogTable extends React.Component {
    constructor(props) {
        super(props);
    }

    handleHide() {
        this.props.onClose();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Worklog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '500px' }}>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Worked*(minutes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.worklogs.map((item, index) => {
                                    if (item) {
                                        return <tr key={item.id}>
                                            <td>{item.description}</td>
                                            <td>{item.from}</td>
                                            <td>{item.to}</td>
                                            <td>{item.worked}</td>
                                        </tr>
                                    } else {
                                        return <tr key={index}>
                                            <td></td><td></td><td></td><td></td>
                                        </tr>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}