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

  /**
   * Insert a department into the department table
   * @param {string} name
   * @returns {Promise}
   */
  addDepartment(name) {
    return new Promise((resolve, reject) => {
        this.connection.query(
            `INSERT INTO department
            SET ?`,
            { name },
            (err, results) => {
                if (err) reject(err);
                else {
                    console.log("Inserted as ID " + results.insertId);
                    resolve(results);
                }
            }
        );
    });
  }

  /**
   * Insert a role into the role table
   * @param {string} roleInfo
   * @returns {Promise}
   */
  addRole(roleInfo) {
    return new Promise((resolve, reject) => {
        this.connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`,
            [roleInfo.title, roleInfo.salary, roleInfo.department_id],
            (err, results) => {
                if (err) reject(err);
                else {
                    console.log("Inserted as ID " + results.insertId);
                    resolve(results);
                }
            }
        );
    });
  }

}

module.exports = new Store();