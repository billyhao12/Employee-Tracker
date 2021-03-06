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
   * @param {object} name
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
   * @param {object} roleInfo
   * @returns {Promise}
   */
  addRole(roleInfo) {
    return new Promise((resolve, reject) => {
        this.connection.query(
            `INSERT INTO role
            SET ?`,
            roleInfo,
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
   * Insert an employee into the employee table
   * @param {object} employeeInfo
   * @returns {Promise}
   */
  addEmployee(employeeInfo) {
    return new Promise((resolve, reject) => {
        this.connection.query(
            `INSERT INTO employee
            SET ?`,
            employeeInfo,
            (err, results) => {
                if (err) reject(err);
                else {
                    console.log("Inserted as ID " + results.insertId);
                    employeeInfo.id = results.insertId;
                    resolve(results);
                }
            }    
        );
    });
  }

  updateEmployeeManager(updateInfo) {
    return new Promise((resolve, reject) => {
        this.connection.query(
            `UPDATE employee
            SET manager_id = ?
            WHERE id = ?`,
            [updateInfo.manager_id, updateInfo.id],
            (err, results) => {
                if (err) reject(err);
                else {
                    resolve(results);
                }
            }
        );
    });
  }

  updateEmployeeRole(updateInfo) {
      return new Promise((resolve, reject) => {
          this.connection.query(
              `UPDATE employee
              SET role_id = ?
              WHERE id = ?`,
              [updateInfo.role_id, updateInfo.employee_id],
              (err, results) => {
                  if (err) reject(err);
                  else {
                      resolve(results);
                  }
              }
          );
      });
  }

  /** 
   * SELECT all departments from the department table
   * @returns {Promise}
   */
  viewDepartments() {
    return new Promise((resolve, reject) => {

        this.connection.query("SELECT * FROM department", (err, results) => {

            if (err) reject(err);
            else resolve(results);
            
        });
    });
  }

  /** 
   * SELECT all roles from the role table
   * @returns {Promise}
   */
  viewRoles() {
    return new Promise((resolve, reject) => {

        this.connection.query("SELECT * FROM role", (err, results) => {

            if (err) reject(err);
            else resolve(results);

        });
    });
  }

  /** 
   * SELECT all employees from the employee table
   * @returns {Promise}
   */
  viewEmployees() {
    return new Promise((resolve, reject) => {

        this.connection.query("SELECT * FROM employee", (err, results) => {

            if (err) reject(err);
            else resolve(results);

        });
    });
  }

}

module.exports = new Store();