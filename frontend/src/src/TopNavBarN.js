import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "rsuite";
// import { Admin, Menu, Reload, Resize, Search } from '@rsuite/icons'; 
import OffRoundIcon from '@rsuite/icons/OffRound';

const TopNavBarN = ({ onLogout, userJsonVal, bookingCount, clearFilters }) => {
  const history = useNavigate();
  const [userID, setUserID] = useState('')
  const getUserId = localStorage.getItem('userid'); //userJsonVal.userid;
  const [token, setToken] = useState(localStorage.getItem('userId'));
  const [backendData, setBackendData] = useState([]);


  const handleLogout = () => {
    // Reset userid and token
    localStorage.removeItem('userid');
    setToken(null);

    // Navigate to the login page
    history('/login');
  };

  useEffect((backendData) => {
    if (userJsonVal && userJsonVal.userid) {
      const userId = userJsonVal.userid;
      setUserID(userId);
      console.log('Fetching data for user ID:', userJsonVal.userid);

      fetch(`http://140.238.167.80:5000/order-service/user-orders?userid=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data from server:", data.length);
          setBackendData(data.length);
        })
        .catch((err) => {
          console.log('Error fetching data:', err);
        });
    }
  }, [userJsonVal]);

  useEffect(() => {
    if (userJsonVal && userJsonVal.userid) {
      const userId = userJsonVal.userid;
      setUserID(userId);
      console.log('Fetching data for user ID: > ', userId);

      fetch(`http://140.238.167.80:5000/order-service/user-orders?userid=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data from server:>> ", data);
          setBackendData(data);
        })
        .catch((err) => {
          console.log('Error fetching data:', err);
        });
    }
  }, [userJsonVal]);


  // Redirect to root if getUserId is null
  useEffect(() => {
    if (userID === null) {
      history('/login');
    }
  }, [userID, history]);

  console.log("before login userid is ", userID)

  if (!getUserId) {
    // If getUserId is null, user is not logged in
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <h2 className="ftco-heading-2">
              <LinkContainer to="/" className="logo">
                <Navbar.Brand>Supremo<span> Rental</span></Navbar.Brand>
              </LinkContainer>
            </h2>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/AboutUs">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/AskMe">
                  <Nav.Link>Ask Me</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {/* <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

    )
  } else {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <h2 className="ftco-heading-2">
              <LinkContainer to="/" className="logo" onClick={clearFilters}>
                <Navbar.Brand>Supremo<span> Rental</span></Navbar.Brand>
              </LinkContainer>
            </h2>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/" onClick={clearFilters}>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/AboutUs">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/AskMe">
                  <Nav.Link>Ask Me</Nav.Link>
                </LinkContainer>
              </Nav>
              
              <Nav>   
                <LinkContainer to="/mybookings">
                  <Nav.Link><span className='noOfOrder'>{bookingCount ? bookingCount : 0 }</span> My Bookings</Nav.Link>
                </LinkContainer>
                <span className='pipeSym nav-link'>|</span>
                {/* <LinkContainer to="/profile">
                  <Nav.Link bookingCountDet={bookingCount} userID={userID}>Profile</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>

                <span className='pipeSym nav-link'>|</span>
                <span className=' nav-link pt-2'>Welcome, <span style={{ 'color': '#fff' }}>{getUserId ? getUserId : 'Guest'}</span></span>

                <IconButton icon={<OffRoundIcon />} appearance="primary" className='topNavIconSignOut' onClick={handleLogout} />
                {/* <LinkContainer></LinkContainer> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
};

export default TopNavBarN;
