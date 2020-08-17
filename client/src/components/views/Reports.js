import React from 'react';
import { Button } from 'react-bootstrap';
import http from '../../http';



export default class Reports extends React.Component {
                    
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
