const { User } = require('../../models');

const userData = [
    {
        "username": 'ajackson',
        "email": 'ajackson@gmail.com'
        
    },
    {
        "username": 'kitty123',
        "email": 'kittylee@gmail.com'
    },
    {
        "username": 'nclark',
        "email": 'nicoleclark@outlook.com'
    },
    {
        "username": 'daniel444',
        "email": 'viadaniel@yahoo.com'
    },
    {
        "username": 'robert23',
        "email": 'rja23@hotmail.com'
    }
];

const createUsers = async () => {
    for (const user of userData) {
        await User.create(user);
    }
}

module.exports = { createUsers };
