import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const Header = () => {
  const { cartItems, numberOfItems } = useSelector(state => state.cart);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              <img src={logo} alt='ProShop'></img>
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav'> </Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav' >
            <Nav className='ms-auto'>
              <LinkContainer to={'/cart'}>
                <Nav.Link>
                  <FaShoppingCart />Cart

                  {
                    cartItems.length > 0 &&
                    <Badge >{numberOfItems}</Badge>

                  }
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/login'}>
                <Nav.Link>
                  <FaUser />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header
