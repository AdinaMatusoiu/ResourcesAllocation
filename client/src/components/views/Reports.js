import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import http from '../../http';
import DatePicker from 'react-date-picker';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { months, getDaysInMonth } from '../../utils';


// const data = [
//   {
//     name: 'Miki', uv: 4, pv: 2,
//   },
//   {
//     name: 'MAki', uv: 3, pv: 1,
//   },
//   {
//     name: 'Mariko', uv: 2, pv: 9,
//   },

// ];
const days = getDaysInMonth(7, 2020);
const data = days.map(day => { return { name: day.getDate(), uv: 4, pv: 3 } })


export default class Reports extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onStartDateChange(value) {
    this.setState({ startDate: value });
  }

  onEndDateChange(value) {
    this.setState({ endDate: value });
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    if (localStorage.getItem('user_role') === 'manager') {
      return (
        <>
          <div>
            <select>

            </select>
          </div>
          <LineChart
            width={1200}
            height={300}
            data={data}
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
