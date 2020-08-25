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
import Reports from './components/views/Reports';
import Contact from './components/views/Contact';
import ToastWrapper from './components/ToastWrapper';
import Task from './components/Task';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toastRef = React.createRef();
    this.state = {
      viewer_id: null,
    }
  }

  handleEnterViewerMode(viewer_id) {
    this.setState({ viewer_id });
  }

  render() {
    return (
      <>
        <Router history={history}>
          <NavigationBar onEnterViewerMode={this.handleEnterViewerMode.bind(this)} />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register toastRef={this.toastRef} />
            </Route>
            <Route path="/login">
              <Login toastRef={this.toastRef} />
            </Route>
            <Route path="/home">
              <Protected Component={Home} />
            </Route>
            <Route path="/tasks">
              <Protected Component={Tasks} toastRef={this.toastRef} viewer_id={this.state.viewer_id} onEnterViewerMode={this.handleEnterViewerMode.bind(this)} />
            </Route>
            <Route path="/reports">
              {localStorage.getItem('user_role') === 'manager' ? <Reports /> : <Protected Component={Home} />}
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </Router>
        <ToastWrapper ref={this.toastRef} />
      </>
    );
  }
}
