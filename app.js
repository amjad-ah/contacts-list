const yargs = require('yargs');
const contacts = require('./contacts');

const args = yargs
    .command('create', 'Add new contact with name and phone', {
        name: {
            describe: 'Contact\'s name',
            demand: true,
            alias: 'n'
        },
        phone: {
            describe: 'Contact\'s phone',
            demand: true,
            alias: 'p'
        }
    })
    .command('list', 'Get all contacts')
    .command('get', 'Get a contact\'s data', {
        name: {
            describe: 'Contact\'s name',
            demand: true,
            alias: 'n'
        }
    })
    .command('delete', 'Delete a contact\'s data', {
        name: {
            describe: 'Contact\'s name',
            demand: true,
            alias: 'n'
        }
    })
    .command('edit', 'Edit a contact\'s data', {
        name: {
            describe: 'Contact\'s name',
            demand: true,
            alias: 'n'
        },
        phone: {
            describe: 'Contact\'s phone',
            demand: true,
            alias: 'p'
        }
    })
    .help()
    .argv;

var command = args._[0];

if (command == 'create') {
    console.log(contacts.create(args.name, args.phone))
} else if (command == 'list') {
    console.log(contacts.index());
} else if (command == 'get') {
    console.log(contacts.show(args.name));
} else if (command == 'delete') {
    console.log(contacts.destroy(args.name));
} else if (command == 'edit') {
    console.log(contacts.edit(args.name, args.phone));
} else {
    console.log('command not found');
}