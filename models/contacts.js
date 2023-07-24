const fs = require("fs/promises");
const path = require("path");

const CONTACTS_PATH = path.join(__dirname, "contacts.json");

const listContacts = async () => {
   try {
     const result = await fs.readFile(CONTACTS_PATH, "utf8");
     const data = JSON.parse(result);
     return data;
   } catch (err) {
     return console.error(err);
   }
};

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error("Not found!");
    }
    return contact;
};

const removeContact = async (contactId) => {
      try {
        const allContacts = await listContacts();
        const contactsRemove = allContacts.find(
          (contact) => contact.id === contactId.toString()
        );
        const newContactsList = JSON.stringify(
          allContacts.filter((contact) => contact.id !== contactId.toString())
        );
        fs.writeFile(CONTACTS_PATH, newContactsList);
        return contactsRemove;
      } catch (error) {
        return console.error(error);
      }

};

const addContact = async (body) => {
   try {
     const contacts = JSON.parse(await fs.readFile(CONTACTS_PATH, "utf8"));
     contacts.push(body);
     await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
     return body;
   } catch (error) {
     return console.error(error);
   }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw new Error("Not found");
    }
    const updateContact = { ...contacts[index], ...body };
    contacts[index] = updateContact;
    await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2));
    return updateContact;
  } catch (error) {
    return console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
