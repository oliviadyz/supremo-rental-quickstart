import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Login from './login';
import TopNavBarN from '../TopNavBarN';
import FooterSection from '../Footer';


function Profile({ onLogout, userJsonVal, bookingCount }) {
  const [userDataN, setUserData] = useState([userJsonVal]);
  const [backendData, setBackendData] = useState([]);
  const [carsCountData, setcarsCountData] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  const location = useLocation();
  const { bookingCountDet, userID } = location.state || {};

  const [token, setToken] = useState(localStorage.getItem('userid'));
  const getUserId = localStorage.getItem('userid');
 


  useEffect(() => {
    fetch(`http://140.238.167.80:5000/user-service-redis/users/${getUserId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [getUserId]);

  useEffect(() => {
    if(getUserId){
    console.log('Fetching data for user ID:', getUserId);
    fetch(`http://140.238.167.80:5000/order-service/user-orders?userid=${getUserId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Data from server:)) ", data);
           setBackendData(data);
            setcarsCountData(data);
        })
        .catch((err) => {
            console.log('Error fetching data:', err);
        });
    }
}, [getUserId]);
  
  const handleLogin = async (userData) => {
    if (userData) {
      setToken(userData.userid);
      localStorage.setItem('userid', userData.userid);
      setUserData(userData); // Pass the userData to the parent component
    } else {
      // Handle login failure
      console.log('Login failed');
    }
  };

  const handleLogout = () => {
    // Reset userid and token
    localStorage.removeItem('userid');
    setToken(null);
    console.log("logout trigerred ");
    // Navigate to the root page
    nav('/');
  };

  //console.log("backendData ", backendData.name);
  if (getUserId === null) {
    // If getUserId is null, user is not logged in
    return (
      <>
        <Login onLogin={handleLogin} />
      </>
    )
  }

 


  return (
    <>
      <div>
        {/* <TopNavBarN onLogout={handleLogout} bookingCount={bookingCountDet} /> */}
        <TopNavBarN onLogout={handleLogout} userJsonVal={userDataN} bookingCount={carsCountData.length} />

        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="backBtn-wrap rounded-right w-100 text-left">

                <label className='valueWhiteTxt'>{bookingCountDet}</label>
              </div></div>
          </div>
        </div>
        <section className="ftco-section1 bg-light">

          <div className="container">
            <div className="col-md-12">
              <div className="row no-gutters">
                <div className="col-md-12	featured-top">
                  <div className="row no-gutters">

                    <div className="col-md-4 d-flex align-items-center bg-primary">

                      <form action="#" className="request-form bg-primary fadeInUp text-left w-100 cardetailsForm">
                        <h2>User Details</h2>
                        <div className='d-flex'>
                          <div className="form-group mr-2">
                            <label className="labelWhiteText">Fullname</label>
                            <label className='valueWhiteTxt'>{userDataN.fullname}</label>
                          </div>

                          <div className="form-group ml-2"><label className="labelWhiteText">Mobile</label>
                            <label className='valueWhiteTxt'>{userDataN.mobile}</label>
                          </div>
                        </div>

                        <div className='d-flex'>
                          <div className="form-group mr-2">
                            <label className="labelWhiteText">Country</label>
                            <label className='valueWhiteTxt'>{userDataN.country}</label>
                          </div>

                          {/* <div className="form-group ml-2"><label  className="labelWhiteText">Mobile</label>
                          <label className='valueWhiteTxt'>{userDataN.mobile}</label>
                          </div> */}
                        </div>




                      </form>

                    </div>
                    <div className="col-md-8 d-flex align-items-center carBigImage" style={{ 'marginTop': '-40px' }}>
                      <div className="services-wrap rounded-right w-100 text-left" style={{ 'minHeight': '300px' }}>
                        {/* <h3 className="heading-section mb-4"><Link to={`/`} className="btn btn-dark py-2 mr-2">Home</Link> {backendData.brand + " " +backendData.name} </h3> */}


                        <div className="proceed-wrap rounded-right w-100 text-center">
                          <Tabs
                            defaultActiveKey="contact"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                          >
                            <Tab eventKey="contact" title="Contact">
                              <Container>
                                <Row style={{ 'textAlign': 'left' }} >
                                  <Col><div className='rdOnlyLabel'>Mobile</div>
                                    <div className='rdOnlyValue'>{userDataN.mobile}</div></Col>
                                  <Col><div className='rdOnlyLabel'>Email</div>
                                    <div className='rdOnlyValue'>{userDataN.email}</div></Col>

                                </Row>

                              </Container>
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                              <Container>
                                <Row style={{ 'textAlign': 'left' }} >
                                  <Col><div className='rdOnlyLabel'>Fullname</div>
                                    <div className='rdOnlyValue'>{userDataN.fullname}</div></Col>
                                  <Col><div className='rdOnlyLabel'>Email</div>
                                    <div className='rdOnlyValue'>{userDataN.email}</div></Col>

                                </Row>
                                <Row style={{ 'textAlign': 'left' }}>
                                  <Col><div className='rdOnlyLabel'>Mobile</div>
                                    <div className='rdOnlyValue'>{userDataN.mobile}</div></Col>
                                  <Col><div className='rdOnlyLabel'>Country</div>
                                    <div className='rdOnlyValue'>{userDataN.country}</div></Col>
                                  <Col><div className='rdOnlyLabel'>Member Since</div>
                                    <div className='rdOnlyValue'>{userDataN.membersince}</div></Col>
                                  {/* <Col> </Col> */}
                                </Row>
                              </Container>
                            </Tab>

                          </Tabs>
                          {/* <h2 variant="success"><Badge bg="success">Booking Confirmed</Badge></h2> */}

                        </div>


                      </div>

                    </div>
                    <div>
                      <Row>
                        <Col className='text-center'>
                          <button className="btn btn-dark mt-4" onClick={() => nav("/")}> Home </button></Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>


        <FooterSection />
      </div>
    </>
  );
}
export default Profile
