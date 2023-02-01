import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <Navbar className='header-container' bg="dark" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand>
                <Link to="/" className="custom-nav-link">
                    <img
              alt=""
              src="/photo/Alb cu Mov.png"
              width="auto"
              height="50"
              className="logo d-inline-block align-top"
            />
            </Link>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="custom-nav-link">Home</Link>
                        <Link to="/gallery" className="custom-nav-link">Gallery</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
