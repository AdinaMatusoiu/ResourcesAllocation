import React, { PureComponent } from 'react';
import http from '../../http';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { months } from '../../utils';

export default class Reports extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: null,
      status: '',
      data: [],
      resources: [{ id: 1000 }, { id: 1001 }, { id: 1002 }, { id: 1003 }, { id: 1004 }, { id: 1005 }],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    http.get('/users/manager/resources').then(data => {
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

  handleResourceSelection(index) {
    const copy = [...this.state.resources];
    copy[index].selected = !copy[index].selected;
    this.setState({ resources: copy });
    if (this.state.selectedMonth && this.state.status) {
      this.getData(this.state.selectedMonth, this.state.status, copy.filter(elem => elem.selected).map(elem => elem.id)).then(data => {
        this.setState({ data });
      })
    }
  }

  handleMonthChange(event) {
    this.setState({ selectedMonth: +event.target.value });
    if (this.state.resources.filter(elem => elem.selected).length && this.state.status) {
      this.getData(+event.target.value, this.state.status, this.state.resources.filter(elem => elem.selected).map(elem => elem.id)).then(data => this.setState({ data }));
    }
  }

  handleStatusChange(event) {
    this.setState({ status: event.target.value });
    if (this.state.resources.filter(elem => elem.selected).length && this.state.selectedMonth) {
      this.getData(this.state.selectedMonth, event.target.value, this.state.resources.filter(elem => elem.selected).map(elem => elem.id)).then(data => this.setState({ data }));
    }
  }

  getData(month, status, resource_ids) {
    console.log(month, status, resource_ids);
    // const resource_ids = this.state.resources.filter(elem => elem.selected).map(elem => elem.id);
    return http.get(`/reports/?month=${month}&status=${status}&resource_ids=${resource_ids.join(',')}`).then(data => {
      return data;
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    if (localStorage.getItem('user_role') === 'manager') {
      return (
        <>
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
            {this.state.data.map(resource => (
              <Line stroke={resource.color} dataKey="no_tasks" data={resource.data} name={resource.name} key={resource.id} />
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
