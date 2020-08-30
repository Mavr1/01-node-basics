const contacts = require('./contacts');

const argv = require('yargs').command(
  'contacts [action, id, name, email, phone]',
  'Welcome to contacts!',
  (yargs) => {
    yargs
      .positional('action', {
        type: 'string',
      })
      .positional('id', {
        type: 'number',
      });
  },
  function (argv) {
    invokeAction(argv.action, argv.id, argv.name, argv.email, argv.phone);
  }
).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;

    case 'get':
      contacts.getContactById(id);
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    case undefined:
      break;

    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(argv);
