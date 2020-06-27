const inquirer = require("inquirer");

class AskUser {

    /**
     * Prompt the user for an action to perfom.
     * @returns {Promise}
     */ 
    forAction() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: [
                        'Add a department',
                        'Add a role', 
                        'Add an employee',
                        'View department(s)',
                        'View role(s)',
                        'View employee(s)'
                    ]
                }
            ]);
    }

    /**
     * Prompt the user for a department to add
     * @returns {Promise}
     */
    addDepartment() {
        return inquirer
            .prompt([
                {
                    message: "What is the department's name?",
                    type: "input",
                    name: "name"
                }
            ]);
    }

    /**
     * Prompt the user for a role to add
     * @returns {Promise}
     */
    addRole() {
        return inquirer
        .prompt([
            {
                message: "What is the role's title?",
                type: "input",
                name: "title"
            },

            {
                message: "What is the role's salary per year (USD)?",
                type: "number",
                name: "salary"
            },

            {
                message: "Select a department for this role",
                type: "list",
                choices: [],
                name: "departmentId"
            }
        ]);


    }

    /**
     * Prompt the user for an employee to add
     * @returns {Promise}
     */
    addEmployee() {
        return inquirer
        .prompt([
            {
                message: "What is the employee's first name?",
                type: "input",
                name: "firstName"
            },

            {
                message: "What is the employee's last name?",
                type: "input",
                name: "lastName"
            },

            {
                message: "Select a role for this employee",
                type: "list",
                choices: [],
                name: "roleId"
            },

            {

            }
        ]);

    }

    /**
     * Prompt the user for department(s) to view
     * @returns {Promise}
     */
    viewDepartment() {
        
    }

    /**
     * Prompt the user for role(s) to view
     * @returns {Promise}
     */
    viewRole() {
        
    }
    
    /**
     * Prompt the user for employee(s) to view
     * @returns {Promise}
     */
    viewEmployee() {
        
    }


}

module.exports = AskUser;