import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import http from '../../http';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { months, getDaysInMonth } from '../../utils';

// const days = getDaysInMonth(7, 2020);
// const data = days.map(day => { return { name: day.getDate(), uv: 4, pv: 3 } })


export default class Reports extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: -1,
      days: [],
      data: null,
    }
  }

  onStartDateChange(value) {
    this.setState({ startDate: value });
  }

  onEndDateChange(value) {
    this.setState({ endDate: value });
  }

  handleMonthChange(event) {
    const days = getDaysInMonth(+event.target.value, 2020);

    this.setState({ data: days.map(day => { return { name: day.getDate(), uv: 4, pv: 3 } }) });
  }

  render() {
    if (localStorage.getItem('user_role') === 'manager') {
      return (
        <>
          <div>
            <select onChange={this.handleMonthChange.bind(this)} defaultValue="">
              <option value="" disabled hidden>Choose here</option>
              {months.map(month => <option key={month.id} value={month.id}>{month.name}</option>)}
            </select>
          </div>
          <LineChart
            width={1200}
            height={300}
            data={this.state.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
