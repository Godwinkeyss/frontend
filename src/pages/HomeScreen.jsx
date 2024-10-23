import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Update from '../components/Update';

const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to store the selected contact's ID

  // Fetch contacts from the server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/contact');
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle the modal and set the selected contact's ID for update
  const openModalWithContact = (id) => {
    setSelectedId(id);
    setModal(true);
  };

  // Toggle the delete modal and set the selected contact's ID for deletion
  const deleteModalWithContactId = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  // Close the update modal
  const toggleModal = () => {
    setModal(false);
    setSelectedId(null); // Clear the selected ID when closing the modal
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedId(null); // Clear the selected ID when closing the modal
  };

  // Handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete/${selectedId}`);
      closeDeleteModal(); // Close the delete modal after successful delete
      fetchData(); // Refresh the contact list after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container">
      <div className="contacts">
        {contacts && Array.isArray(contacts) && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="contact">
              <p>Email: {contact.email}</p>
              <p>First name: {contact.firstName}</p>
              <p>Last name: {contact.lastName}</p>
              <div className="btn">
                {/* Set the selected contact ID when clicking Edit and open the modal */}
                <button
                  className="btn-secondary"
                  onClick={() => openModalWithContact(contact.id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteModalWithContactId(contact.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>

      {/* Show the modal when the modal state is true */}
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <h2>Update Contact</h2>
            {/* Pass the selected contact's ID to the Update component */}
            <Update id={selectedId} onClose={toggleModal} />
          </div>
        </div>
      )}

      {/* Show the delete confirmation modal */}
      {deleteModal && (
        <div className="modal">
          <div className="overlay" onClick={closeDeleteModal}></div>
          <div className="modal-content">
            <h2>Delete Contact</h2>
            <p>Are you sure you want to delete this contact?</p>
            <div className="btn-group">
              <button onClick={closeDeleteModal} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
