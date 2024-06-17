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

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img className="d-block w-100 slide-image" src={Second} alt="First slide" />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 slide-image" src={Third} alt="First slide" />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    );
};

export default Slider;