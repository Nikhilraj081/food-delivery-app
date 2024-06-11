import React, { useEffect, useState } from "react";
import '../Css/Home.css';
import Slider from "./Slider";
import { Button, Container, Row, Modal, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {getFoodItems} from "../Services/FoodItemsApi";
import { addItemToCart } from "../Services/Cart";
import { useNavigate } from "react-router-dom";
import { clearBrowser, isTokenValid } from "../Services/Login";
import { toast } from 'react-toastify';



const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getFoodItems()
            .then((response) => {
                console.log(response);
                setItems(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    //To check if auth token is valid

    isTokenValid(localStorage.getItem('token'))
    .then((response) => {
        localStorage.setItem('tokenValid', response.data.status);
        if (localStorage.getItem('tokenValid') !== 'true') {
            clearBrowser();
        }
    })
    .catch((error) => console.log(error));

    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item
    const [selectedQuantity, setSelectedQuantity] = useState(null); // State for selected quantity

    const addToCart = (itemId, userId) => {


        console.log("itemId " + itemId)
        console.log("userId " + userId)
        const selectedItem = {
            ...items.find(item => item.id === itemId),
            userId: userId,
            // Add more properties as needed
        };
        if (selectedItem) {
            setSelectedItem(selectedItem);
            setShowModal(true);
        } else {
            console.error("Item not found");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null); // Reset selected item when modal is closed
        setSelectedQuantity(null); // Reset selected quantity when modal is closed
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            console.log("selected item itemId: " + (selectedItem.id || "N/A"));
            console.log("selected item userId: " + (selectedItem.userId || "N/A"));

            if (localStorage.getItem('login') !== 'true') {
                alert("You are not login, please login!")
                navigate('/login');
            } else {
    
                isTokenValid(localStorage.getItem('token'))
                .then((response) => {
            
                    if (response.data.status === true) {
                        addItemToCart(selectedItem, selectedQuantity).catch((error) => console.log(error));
                        toast.success('One item added to cart')
                    }
                    else{
                        alert("You are not login, please login!")
                        clearBrowser();
                       
                        navigate('/login');
                    }
                })
    
            }

            

        } else {
            console.error("No item selected");
        }
        handleCloseModal(); // Close modal after adding to cart
    };

    return (
        
        <>
            <Slider />
            <Container style={{ padding: '10px' }} >
                <h4 className="heading" style={{ marginTop: '10px' }}>Food Items</h4>
                <Row className="card-container" style={{ paddingLeft: '10px' }}>
                    {items.map((item) => (
                        <Card key={item.id} className="card-bodys border-0 shadow-none">
                            <Card.Body>
                                <Card.Img src={'data:image/jpeg;base64,' + item.image} className="card-image" />
                                <h5>{item.name}</h5>
                                {item.discount !== 0.0 && (
                                    <h6 style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'rgb(158, 155, 155)' }}>₹{item.variant[0].price}</h6>
                                )}
                                <h6>₹{item.variant[0].specialPrice}</h6>
                                {item.discount !== 0.0 && (
                                    <h6 style={{ color: 'green' }}>Discount ₹{item.discount}</h6>
                                )}
                                <button className="card-button" onClick={() => addToCart(item.id, localStorage.getItem('userId') || '')}> Add to cart</button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
                
            </Container>
            {/* Modal for additional input */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    <Modal.Title>Customise your meal</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(220, 223, 225)' }}>
                    {/* Render selected item's information here */}
                    {selectedItem && (
                        <div>
                            <h5>{selectedItem.name}</h5>
                            {selectedItem.variant.map((val, index) => (
                                <div key={index} className="varient-tag">
                                    <h6>{val.quantity}</h6>
                                    <h6 style={{ marginLeft: '123px' }}>₹{val.specialPrice}</h6>
                                    <Form.Check
                                        type="radio"
                                        aria-label={`radio ${index + 1}`}
                                        style={{ marginLeft: 'auto', marginRight: '20px', borderColor: 'black' }}
                                        name="variantRadio" // Ensure all radio buttons have the same name
                                        value={val.quantity} // Value of the radio button
                                        checked={selectedQuantity === val.quantity} // Check if this radio button is selected
                                        onChange={() => setSelectedQuantity(val.quantity)} // Update selected quantity
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Home;
