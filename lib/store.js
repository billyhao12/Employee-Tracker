const mysql = require("mysql");
const config = require("./config");

class Store {
    constructor() {
        if (!config.DB_PASSWORD)
            throw new Error(`Missing database password. Please run "node init"`);

        // Create a new mysql connection object and store it as an object property
        this.connection = mysql.createConnection({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        });
    }

    /**
     * Connect to the database server using a Promise
     * @returns {Promise}
     */
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    close() {
        // Close the connection to the database
        this.connection.end();
    }

}

module.exports = new Store();