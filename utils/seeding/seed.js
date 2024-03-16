const connection = require('../../config/connection');
const { User, Thought } = require('../../models');

/* Import functions for seed data */
const { createUsers } = require('./seed_users');
const { createThoughts } = require('./seed_thoughts');

console.time('Seeding');

/* Create the connection to MongoDB */
connection.once('open', async () => {
    // Drop the users collection if it exists
    let userArray = await connection.db.listCollections({ name: 'users' }).toArray();

    if (userArray.length) {
        await connection.dropCollection('users');
    }

    // Drop the thoughts collection if it exists 
    let thoughtArray = await connection.db.listCollections({ name: 'thoughts'}).toArray();

    if (thoughtArray.length) {
        await connection.dropCollection('thoughts');
    }

    // Call createUsers to add seeds to the User collection
    await createUsers();

    // Call createThoughts to add seeds to the Thought collection
    await createThoughts();

    console.timeEnd('Seeding');
    process.exit(0);
});