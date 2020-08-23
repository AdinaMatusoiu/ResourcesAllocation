import React, { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import http from '../../http';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { months, getDaysInMonth } from '../../utils';

// const days = getDaysInMonth(7, 2020);
// const data = days.map(day => { return { name: day.getDate(), uv: 4, pv: 3 } })
const data = [
  { date: '1/08/2020', 'no_tasks': 5, 'name': 'Marcel' },
  { date: '2/08/2020', 'no_tasks': 3, 'name': 'Ionel' },
  { date: '3/08/2020', 'no_tasks': 5, name: 'Adina' },
  { date: '4/08/2020', 'no_tasks': 7, 'name': 'Cosmin' },
  // { date: '5/08/2020', 'no_tasks': 1 },
  // { date: '6/08/2020', 'no_tasks': 9 },
]

const series = [
  {
    name: 'Marcel',
    data: [
      { date: '1/01/2020', no_tasks: Math.random() },
      { date: '2/01/2020', no_tasks: Math.random() },
      { date: '3/01/2020', no_tasks: Math.random() },
    ],
  },
  {
    name: 'Ionel',
    data: [
      { date: '1/01/2020', no_tasks: Math.random() },
      { date: '2/01/2020', no_tasks: Math.random() },
      { date: '3/01/2020', no_tasks: Math.random() },
    ],
  },
  {
    name: 'Adina',
    data: [
      { date: '1/01/2020', no_tasks: Math.random() },
      { date: '2/01/2020', no_tasks: Math.random() },
      { date: '3/01/2020', no_tasks: Math.random() },
    ],
  },
];

export default class Reports extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: null,
      status: '',
      data: [],
      resources: [{ id: 1000 }, { id: 1001 }, { id: 1002 }, { id: 1003 }, { id: 1004 }, { id: 1005 }],
    };
    this.getTable = this.getTable.bind(this);
  }

  componentDidMount() {
    http.get('/users/manager/resources').then(data => {
      console.log(data);
      if (data.length >= 6) {
        this.setState({ resources: data });
      } else {
        const current = [...this.state.resources];
        data.forEach((resource, index) => {
          current[index] = resource;
        });
        this.setState({ resources: current });
      }
    })
  }

  componentDidUpdate() {
    if (this.state.status && this.state.selectedMonth && this.state.resources.filter(elem => elem.selected).length) {
      this.getTable();
    }
  }

  handleMonthChange(event) {
    this.setState({ selectedMonth: +event.target.value });
  }

  handleResourceSelection(index) {
    const copy = [...this.state.resources];
    copy[index].selected = !copy[index].selected;
    this.setState({ resources: copy });

  }

  handleStatusChange(event) {
    this.setState({ status: event.target.value });
  }

  getTable() {
    const resource_ids = this.state.resources.filter(elem => elem.selected).map(elem => elem.id);
    http.get(`/reports/?month=${this.state.selectedMonth}&status=${this.state.status}&resource_ids=${resource_ids.join(',')}`).then(data => {
      console.log(data);
      this.setState({ data });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    if (localStorage.getItem('user_role') === 'manager') {
      return (
        <>
          <button onClick={this.getTable.bind(this)}>get table</button>
          <button onClick={() => console.log(this.state)}>check state</button>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '33%', overflowY: 'scroll', overflowX: 'hidden', margin: '0 2em 0 2em', maxHeight: '400px' }}>
              <table className="table table-striped table-dark">
                <tbody>
                  {this.state.resources.map((resource, index) => <tr className="clickable" onClick={this.handleResourceSelection.bind(this, index)} key={resource.id}>
                    <td style={resource.selected ? { backgroundColor: 'green' } : {}}>{resource.name}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div style={{ width: '33%' }}>
              <select onChange={this.handleMonthChange.bind(this)} defaultValue="">
                <option value="" disabled hidden>Choose month</option>
                {months.map(month => <option key={month.id} value={month.id}>{month.name}</option>)}
              </select>
            </div>
            <div>
              <select defaultValue="" onChange={this.handleStatusChange.bind(this)}>
                <option value="" disabled hidden>Choose status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <LineChart width={800} height={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} />
            <YAxis dataKey="no_tasks" />
            <Tooltip />
            <Legend />
            {this.state.data.map(s => (
              <Line dataKey="no_tasks" data={s.data} name={s.name} key={s.name} />
            ))}
          </LineChart>
        </>
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
