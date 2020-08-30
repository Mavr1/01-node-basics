const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');
const contacts = require(contactsPath);

module.exports.listContacts = function () {
  console.log('contacts :>> ', contacts);
};

module.exports.getContactById = function (contactId) {
  const foundContact = contacts.find((item) => item.id === contactId);
  console.log('foundContact :>> ', foundContact);
};

module.exports.removeContact = async function (contactId) {
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
  const id = Math.max(...contacts.map((item) => item.id)) + 1;
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.promises.writeFile(contactsPath, JSON.stringify(contacts), function (
    err
  ) {
    if (err) {
      console.log('err :>> ', err);
      throw err;
    }
  });
  console.log('Succesfully saved:', newContact);
};
