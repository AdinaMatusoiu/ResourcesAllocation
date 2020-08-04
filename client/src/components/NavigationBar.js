import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigationbar extends React.Component {

    render() {

        return (
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">Cool App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Nav.Link href="/tasks">Tasks</Nav.Link>
                        <Nav.Link href="/reports">Reports</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" onClick={() => localStorage.clear()}>Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}