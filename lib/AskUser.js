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
                        'View departments',
                        'View roles',
                        'View employees',
                        'Exit'
                    ]
                }
            ]);
    }

    /**
     * Prompt the user for a department to add
     * @returns {Promise}
     */
    departmentQuestions() {
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
     * @param {object} departmentInfo
     * @returns {Promise}
     */
    roleQuestions(departmentInfo) {

        return inquirer
        .prompt([
            {
                message: "What is the role's title?",
                type: "input",
                name: "title"
            },

            {
                message: "What is the role's salary per year (USD)?",
                type: "input",
                name: "salary",
                validate: (value) => {
                    return !isNaN(value) ? true : "Please provide a number value.";
                }
            },

            {
                message: "Select a department for this role",
                type: "list",
                choices: departmentInfo.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    };
                }),
                name: "department_id"
            }
        ]);

    }

    /**
     * Prompt the user for an employee to add
     * @returns {Promise}
     */
    employeeQuestions() {
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

}

module.exports = AskUser;