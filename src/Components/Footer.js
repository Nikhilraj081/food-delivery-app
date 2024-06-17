import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../Css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>Welcome to Food Delivery App, where we bring delicious meals straight to your doorstep! Our mission is to make your dining experience effortless, enjoyable, and memorable. </p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: support@fooddelivery.com</p>
                        <p>Phone: 9572730268</p>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="footer-bottom">&copy; 2024 Food Delivery App. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
