// import { Button, FormControl, FormGroup } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TopNavBarN from '../TopNavBarN';
import FooterSection from '../Footer';

function AskMe({ onLogout, userJsonVal, bookingCount }) {
    const [userDataN, setUserData] = useState([userJsonVal]);
    const [backendData, setBackendData] = useState([]);
    const [carsCountData, setcarsCountData] = useState([]);
    const nav = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('userid'));
    const getUserId = localStorage.getItem('userid');



    // const handleLogin = async (userData) => {
    //     if (userData) {
    //         setToken(userData.userid);
    //         localStorage.setItem('userid', userData.userid);
    //         setUserData(userData); // Pass the userData to the parent component
    //     } else {
    //         // Handle login failure
    //         console.log('Login failed');
    //     }
    // };

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

    const handleLogout = () => {
        // Reset userid and token
        localStorage.removeItem('userid');
        setToken(null);

        // Navigate to the root page
        nav('/');
    };

    const [searchValue, setSearchValue] = useState('');
    const onChange = (event) => {
        setSearchValue(event.target.value);
        //setSearchValue(searchText);
    }

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpenSearch = () => {
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic b3BlbnNlYXJjaDpPcmFjbGUjMTIz");

        var raw = JSON.stringify({
            "query": {
                "multi_match": {
                    "query": searchValue,
                    "fields": [
                        "question",
                        "answer",
                        "url"
                    ]
                }
            }
        });

        var requestOptions = {
            method: 'POST', // Change the method to POST
            headers: myHeaders,
            body: raw, // Include the request body for POST
            redirect: 'follow'
        };

        fetch("http://140.238.167.80:5000/askme-search", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setSearchResults(result);
            })
            .catch(error => {
                console.log('Error fetching search results:', error);
                // Display an error message to the user
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            {loading && <p>Loading...</p>}

            <div>
            <TopNavBarN onLogout={handleLogout} userJsonVal={userDataN} bookingCount={carsCountData.length} />
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="backBtn-wrap rounded-right w-100 text-left">
                                {/* <AskMeSearchSection /> */}
                                <div className="col-md-12 d-flex align-items-center bg-primary">

                                    <form action="#" className="askme-request-form bg-primary fadeInUp text-left d-flex w-100">
                                        <div className="d-flex align-bottom w-100">
                                            <div className="form-group mr-2 d-flex col-md-12 searchTxtOuter">
                                                <div className="col-md-2"><span className="askMeTxt">Ask Me</span></div>
                                                <FormGroup className="col-md-8">
                                                    <FormControl type="text" placeholder="Search - Opensearch" className="searchTxt" value={searchValue} onChange={onChange} />
                                                </FormGroup>{' '}
                                                <Button className="col-md-2 btn btn-secondary" onClick={() => handleOpenSearch(searchValue)}>Submit</Button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ftco-section-askme bg-light">

                    <div className="container">
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-md-12 featured-top">
                                    <div className="row no-gutters">
                                        <div className="col-md-12 d-flex align-items-center carBigImage">
                                            <div className="services-wrap1 rounded-right w-100 text-left">
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            {/* Display search results */}
                                                            {searchResults.hits?.hits.map((result, index) => (
                                                                <div key={index} className="result-card">
                                                                    <h5>{result._source.question}</h5>
                                                                    <p>{result._source.answer}</p>
                                                                    <a href={result._source.url} target="_blank" rel="noopener noreferrer">
                                                                        {result._source.url}
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className='text-center'>
                                                            <button className="btn btn-dark mt-4" onClick={() => nav("/")}> Home </button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
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

export default AskMe
