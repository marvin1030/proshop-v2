import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

import { useLogoutMutation } from '../slices/usersApiSlice.js';
import { logout } from '../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Header = () => {
  const { cartItems, numberOfItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  console.log(userInfo)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

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
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              )
                :
                (<LinkContainer to={'/login'}>
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>)}

            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header
