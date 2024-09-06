// Loading.js
import React from 'react';
import loadingImage from '../assets/images/Loading.bb93b243b1ec87da17b4.png'; // Update path as necessary
import './Home.css'; // Import the CSS for styling

const Loading = () => {
  return (
    <div className="loader-container">
      <img src={loadingImage} alt="Loading" className="loader-image" />
    </div>
  );
};

export default Loading;
