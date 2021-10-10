import React, {Component} from 'react';
import {Container, Navbar, Button} from 'react-bootstrap';

function Nav (){
    return(
        <Navbar className="bg-primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home" className="align-center">
                <img alt="" src="/logo.svg" width="30" height="50" className="d-inline-block align-center text-align-center"/>{' '}
                    Sandbox
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
export default Nav;