const colors = require("colors");
const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");

function getContacts() {
  const contacts = fs.readFileSync(contactsPath, "utf8");
  return JSON.parse(contacts);
}

function listContacts() {
  const contacts = getContacts();
  console.table(contacts);
}

function getContactById(contactId) {
  const contacts = getContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return "Error - contact not found".red;
  } else {
    console.table(contact);
  }
  return contact;
}

function removeContact(contactId) {
  const contacts = getContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log("Error writing contacts file".red, err);
        return;
      }
      console.log("Contact removed successfully".green);
    });
  } else {
    console.log("Contact not found".red);
  }
}

function addContact(name, email, phone) {
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    if (err) {
      console.log(err);
      return;
    }
    const contactsObject = JSON.parse(contacts);
    contactsObject.push(contact);
    fs.writeFile(
      contactsPath,
      JSON.stringify(contactsObject, null, 2),
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Contact added successfully".green);
      }
    );
  });
}

module.exports = {
  getContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
