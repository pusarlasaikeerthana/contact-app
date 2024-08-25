import React, { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const [errorMessage,setErrorMessage] = useState("")

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddContact = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const agreed = e.target.agreed.checked;
   
    if(name && email){
      if(agreed){
        const newContact = { id: uuidv4(), name, email };
        setContacts([...contacts, newContact]);
        localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
        setErrorMessage("")
        e.target.reset();
      }
      else{
        setErrorMessage("Please Agree to the terms and conditions")
      }
    }
    else{
        setErrorMessage("Please Enter Name and Email")
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedContact = { ...editingContact, name, email };
    const updatedContacts = contacts.map((contact) =>
      contact.id === editingContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setEditingContact(null);
  };

  const handleDeleteContact = (contact) => {
    const filteredContacts = contacts.filter(
      (contactItem) => contactItem.id !== contact.id
    );
    setContacts(filteredContacts);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  };
 

  return (
    <div>
      <form onSubmit={handleAddContact}>
        Name: <input type="text" className = "name" name="name" placeholder="Name" /><br></br>
        Email: <input type="email" className = "email" name="email" placeholder="Email"/>
        <p> {errorMessage} </p>
        <input type="checkbox" name="agreed"/>
        <label htmlFor="agreed">I agree to the terms and conditions</label><br></br>
        <button type="submit" className="button">Add</button>
      </form>

      <h3>Contact List</h3>
      {contacts.map((contact) => (
        <div className="contact-item" key={contact.id}>
          <div className="contact-info">
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
          </div>
          <div className="contact-actions">
            <i className = "bi bi-pencil-square" id= "icon" onClick={() => handleEditContact(contact)}></i>
            <i className = "bi bi-trash" id = "icon" onClick={() => handleDeleteContact(contact)}></i>
          </div>
        </div>
      ))}
      
      {editingContact && (
        <form onSubmit={handleUpdateContact}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={editingContact.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={editingContact.email}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default ContactManager;