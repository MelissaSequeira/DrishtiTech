import React, { useState } from 'react';
import './Products.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import images from src/assets
import prod1 from '../assets/prod12.jpg';
import prod2 from '../assets/prod2.jpeg';


const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [club, setClub] = useState('');
  const [country, setCountry] = useState('');

  // Function to open the modal
  const handleEnquireClick = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formData = {
      email,
      password,
      club,
      country,
    };

    try {
      // Send data to the backend using a POST request
      const response = await fetch('https://drishtitech-backend.onrender.com/api/enquire/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully', result);
        

        closeModal();  // Close the modal after submission
        toast.success('Your request was submitted successfully. We will get back to you soon.', {
          position: "top-center",
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      } else {
        console.log('Error submitting form:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="products-page">
      <h2>Our Products</h2>

      <div className="product-section">
        <div className="product-content">
          <div className="text-content">
            <h3>MAANVI</h3>
            <p><strong>Motion Artificial Analysis N Visual Inference</strong></p>
            <ul>
              <li>Custom-built ML model for in-depth match and player analytics.</li>
              <li>Offers 100% precision for data generation.</li>
              <li>Designed to be affordable for Tier 1 and grassroots football leagues globally.</li>
            </ul>
          </div>
          <div className="image-content">
            <img src={prod1} alt="MAANVI Product" />
          </div>
        </div>
      </div>

      <div className="product-section">
        <div className="product-content">
          <div className="text-content">
            <h3>VISION+</h3>
            <p>Real-time referee assistance ML model for fast-paced football matches.</p>
            <ul>
              <li>Predicts match-time fouls and goal decisions within 5 seconds.</li>
              <li>Acts as a live assistant to referees, unlike post-mortem VAR.</li>
              <li>Aims to ensure fair, unbiased, and accurate officiating in real time.</li>
            </ul>
          </div>
          <div className="image-content">
            <img src={prod2} alt="VISION+ Product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
