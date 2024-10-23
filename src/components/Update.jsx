import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = ({ id, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Fetch the contact data when the modal opens
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/contact/${id}`);
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching contact:', error);
        setError('Error fetching contact details.');
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

//   create contact


  useEffect(()=>{
     const fetchdata = async()=>{
       try {
        const response = await axios.post('http://127.0.0.1:5000/create',{
            firstName,
            lastName,
            email
        })
        alert('Contact created successfully!');
       } catch (error) {
        
       }
     }
     fetchdata();
  },[])

  // Handle form submission to update the contact
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = { firstName, lastName, email };
      await axios.patch(`http://127.0.0.1:5000/update/${id}`, updatedContact);
      alert('Contact updated successfully!');
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Error updating contact. Please try again.');
    }
  };

  return (
    <div className="update-form">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default Update;
