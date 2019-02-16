const fs = require('fs');

var fetch = () => {
    try {
        var contacts = fs.readFileSync('contacts.json');
        return JSON.parse(contacts)
    } catch (e) {
        return []
    }
}

var store = (contacts) => {
    fs.writeFileSync('contacts.json', JSON.stringify(contacts))
}

var create = (name, phone) => {
    var contacts = fetch();
    if (contacts.filter(contact => contact.name == name).length > 0) {
        return {
            success: false,
            error: 'name already exists'
        }
    }

    contacts.push({
        name: name,
        phone: phone
    })
    store(contacts)
    return {
        success: true,
        data: {
            name: name,
            phone: phone
        }
    }
}

var index = () => {
    return {
        success: true,
        data: fetch()
    }
}

var show = (name) => {
    contact = fetch().filter(contact => contact.name == name)
    if (contact.length > 0) {
        return {
            success: true,
            data: contact[0]
        }
    } else {
        return {
            success: false,
            data: 'contact not found'
        }
    }
}

var destroy = (name) => {
    allContacts = fetch()
    contacts = allContacts.filter(contact => contact.name != name)
    if (contacts.length < allContacts.length) {
        store(contacts)
        return {
            success: true,
            data: 'deleted successfully'
        }
    } else {
        return {
            success: false,
            error: 'contact not found'
        }
    }
}

var edit = (name, phone) => {
    if (destroy(name).success) {
        create(name, phone)
        return {
            success: true,
            data: {
                name: name,
                phone: phone
            }
        }
    } else {
        return {
            success: false,
            error: 'contact not found'
        }
    }
}

module.exports = {
    create: create,
    index: index,
    show: show,
    destroy: destroy,
    edit: edit,
}