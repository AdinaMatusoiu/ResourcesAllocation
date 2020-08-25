import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigationbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">Cool App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="link" to="/home">Home</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <Link className="link" onClick={() => this.props.onEnterViewerMode(null)} to="/tasks">Tasks</Link>
                        <Link className="link" to="/reports">Reports</Link>
                    </Nav>
                    <Nav>
                        <Link className="link" to="/login" onClick={() => localStorage.clear()}>Sign Out</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}