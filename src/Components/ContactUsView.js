import React, { useEffect, useState } from 'react';
import '../Css/ContactUs.css';
import { useLocation } from 'react-router-dom';

const ContactUs = () => {

    const { pathname } = useLocation()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[0-9]{6,10}$/; // Adjust as needed for pin code or phone number

        if (!emailPattern.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!phonePattern.test(formData.phone)) {
            alert('Please enter a valid pin code or phone number.');
            return;
        }

        alert('Form submitted successfully!');
        // Handle form submission
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pathname]);

    return (
        <div className='contact-wrapper'>
            <div className="contact-container">


                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Email: support@fooddeliveryapp.com</p>
                    <p>Phone: 9572730268</p>
                    <p>Address: Navi Ganj, Chhapra, Bihar 841301</p>
                </div>

                {/* <div className="map-container">
                    <h2>Our Location</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509831!2d144.9559283154044!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727ab4b1e6e84b!2s123%20Food%20Street%2C%20Flavor%20Town%2C%20USA!5e0!3m2!1sen!2s!4v1605196254213!5m2!1sen!2s"
                        width="600"
                        height="450"
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0">
                    </iframe>
                </div> */}
            </div>
        </div>

    );
};

export default ContactUs;
