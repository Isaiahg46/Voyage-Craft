const { Sequelize } = require('sequelize'); // Ensure Sequelize is imported

let sequelize; // Declare once

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL); // Use `new Sequelize`, not `new sequelize`
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'postgres', // Ensure this matches your database type
        }
    );
}

module.exports = sequelize; // Export for use in other files
