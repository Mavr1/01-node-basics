const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

module.exports.listContacts = async function () {
  const contacts = await fs.promises.readFile(contactsPath, 'utf8');
  console.log('contacts :>> ', JSON.parse(contacts));
};

module.exports.getContactById = async function (contactId) {
  const response = await fs.promises.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(response);
  const foundContact = contacts.find((item) => item.id === contactId);
  console.log('foundContact :>> ', foundContact);
};

module.exports.removeContact = async function (contactId) {
  const response = await fs.promises.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(response);
  const filteredContacts = contacts.filter((item) => item.id !== contactId);
  await fs.promises.writeFile(
    contactsPath,
    JSON.stringify(filteredContacts),
    function (err) {
      if (err) {
        console.log('err :>> ', err);
        throw err;
      }
    }
  );
  console.log('Succesfully deleted:', contactId);
};

module.exports.addContact = async function (name, email, phone) {
  const response = await fs.promises.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(response);
  const id = Math.max(...contacts.map((item) => item.id)) + 1;
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log('error :>> ', error);
  }

  console.log('Succesfully saved:', newContact);
};
