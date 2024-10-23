import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Create contact
  const handleCreateContact = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/create', {
        firstName,
        lastName,
        email,
      });
      alert('Contact created successfully!');
      onClose(); // Close the modal after successful creation
      navigate('/'); // Navigate to the home screen or refresh the contacts
    } catch (error) {
      console.error('Error creating contact:', error);
      setError('Failed to create contact. Please try again.');
    }
  };

  return (
    <div className="update-form">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreateContact}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Contact</button>
      </form>
    </div>
  );
};

export default Create;
