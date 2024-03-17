const connection = require('../../config/connection');
const { User, Thought } = require('../../models');

/* Import functions for seed data */
const { createUsers } = require('./seed_users');
const { createThoughts } = require('./seed_thoughts');

console.time(' Total time');

/* Create the connection to MongoDB */
connection.once('open', async () => {
    console.log('\x1b[36m', 'Connection to MongoDB established...');

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

    console.log('\x1b[36m', 'Seeding data...');
    
    // Call createUsers to add seeds to the User collection
    await createUsers();

    // Call createThoughts to add seeds to the Thought collection
    await createThoughts();

    console.log('\x1b[32m', '✅ Done!', '\x1b[0m');
    console.timeEnd(' Total time');
    process.exit(0);
});