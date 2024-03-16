const { connect, connection } = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
const connectionString = 'mongodb://localhost:27017/nosql-social-network';

// Establish a connection to MongoDB using Mongoose
connect(connectionString);

// Export connection
module.exports = connection;
