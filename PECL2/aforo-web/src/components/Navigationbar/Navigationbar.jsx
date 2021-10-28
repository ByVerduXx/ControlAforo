import React from 'react'
import { Container } from 'react-bootstrap'
import './Navigationbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function Navigationbar() {

    const isLogged = false
    const username = 'ByVerduXx'

    const profile = `/profile/${username}`

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-title">
                    <i className="fas fa-code" /> {' '}
                    Control de aforo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
                    <Nav className="me-2">
                        {isLogged ?
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={username}
                                menuVariant="dark"
                            >

                                <NavDropdown.Item as={Link} to={profile} href={profile}>
                                    Perfil &nbsp;
                                    <i className="far fa-user"></i>    
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/notify" href="/notify">
                                    Notificar &nbsp;
                                    <i className="fas fa-exclamation-circle"></i>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">
                                    Logout &nbsp;
                                    <i className="fas fa-sign-out-alt"/>
                                </NavDropdown.Item>

                            </NavDropdown>
                            : (<>
                            <Nav.Link as={Link} to="/login" href="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" href="/register">Register</Nav.Link>   
                            </>
                            )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigationbar
