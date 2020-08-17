import React from 'react';
import { Button } from 'react-bootstrap';
import http from '../../http';



export default class Reports extends React.Component {
                    
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            enums: {
                category: [],
            },
        }
    }

    // componentDidMount() {
    //     http.get('/tasks/enums').then(data => {
    //         this.setState({ enums: data });
    //     })
    //     http.get('/users/manager/resources').then(resources => {
    //         this.setState({ resources });
    //         console.log('resources:', resources);
    //     })
    //     http.get('/users/manager/tasks').then(tasks => {
    //         this.setState({ tasks });
    //         console.log('tasks:', tasks);
    //     })
    // }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleSave(data) {
        this.setState({ showModal: false })
        http.post('/tasks', data)
            .then(() => {
                this.props.toastRef.current.show('Task created', '', 3000);
            })
            .catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            })
    }




    render() {
        if (localStorage.getItem('user_role') === 'manager') {
            return (
                <div>
     <table class="table table-dark">
      <thead>
    <tr>
      <th scope="col">Task owner</th>
      <th scope="col">Closed tasks</th>
      <th scope="col">In progress tasks</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  </table>

  
                </div>
            )
        } else {
            return (
                <div>
                       repooo
                </div>
            )
        }
    }

}
