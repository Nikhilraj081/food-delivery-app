// src/components/LoadingOverlay.js
import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import '../Css/LoadingOverlay.css';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <ClipLoader color="#36d7b7" size={150} />
        </div>
    );
};

export default LoadingOverlay;
