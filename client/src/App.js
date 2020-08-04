import React from 'react';
import './App.css';
import history from './history'
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from './components/views/Register';
import Login from './components/views/Login';
import Home from './components/views/Home';
import Protected from './components/Protected';
import NavigationBar from './components/NavigationBar';
import Tasks from './components/views/Tasks';

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <NavigationBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Protected Component={Home} />
          </Route>
          <Route path="/tasks">
            <Protected Component={Tasks} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
