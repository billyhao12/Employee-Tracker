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
                        'Update an employee\'s role',
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
    employeeQuestions(roleInfo) {
        return inquirer
        .prompt([
            {
                message: "What is the employee's first name?",
                type: "input",
                name: "first_name"
            },

            {
                message: "What is the employee's last name?",
                type: "input",
                name: "last_name"
            },

            {
                message: "Select a role for this employee",
                type: "list",
                choices: roleInfo.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    };
                }),
                name: "role_id"
            }

        ]);

    }

    employeeManager(employeeInfo) {

        // Adding in an option to select "No Manager"
        employeeInfo.push(
            {
                id: null,
                first_name: 'No',
                last_name: 'Manager',
                role_id: "NA"
            });

        return inquirer
        .prompt([
            
            {
                message: "Select a manager for this employee",
                type: "list",
                choices: employeeInfo.map( employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}, role_id = ${employee.role_id}`,
                        value: employee.id
                    };
                }),
                name: "manager_id"
            }
        ]);
    }

    updateEmployee(employeeInfo) {
        return inquirer
        .prompt([
            {
                message: "Select an employee to update",
                type: "list",
                choices: employeeInfo.map( employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}, role_id = ${employee.role_id}`,
                        value: employee.id
                    };
                }),
                name: "employee_id"
            }
        ]);
    }

    newEmployeeRole(roleInfo) {
        return inquirer
        .prompt([
            {
                message: "Select a role to assign",
                type: "list",
                choices: roleInfo.map( role => {
                    return {
                        name: role.title,
                        value: role.id
                    };
                }),
                name: "role_id"
            }
        ]);
    }
}

module.exports = AskUser;