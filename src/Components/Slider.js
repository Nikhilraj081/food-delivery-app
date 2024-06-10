import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import First from '../Image/first.jpg';
import Second from '../Image/second.jpg';
import Third from '../Image/third.jpg'
import { Image } from "react-bootstrap";
import '../Css/Slider.css'

const Slider = () => {
    return (
        <Carousel className="slider">
            <Carousel.Item interval={2000}>
             <img className="d-block w-100 slide-image" src={First} alt="First slide" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100 slide-image" src={Second} alt="First slide" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 slide-image" src={Third} alt="First slide" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    );
};

export default Slider;