import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Update from './Update'; // If you plan to use this in the navbar, keep it; otherwise, consider removing
import Create from './Create';

const Navbar = () => {
  const [createModal, setCreateModal] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    setCreateModal(true); // Open the create modal
  };

  const toggleModal = () => {
    setCreateModal(false); // Close the create modal
  };

  return (
    <div className='navbar'>
      <h4 className='logo'>
        <Link to="/">Logo</Link>
      </h4>
      <nav className="nav">
        <a href="#" onClick={handleCreate}>Create</a>
      </nav>
      {createModal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal}></div>
          <div className='modal-content'>
            <h2>Create Contact</h2>
            <Create onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
