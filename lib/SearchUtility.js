const store = require("./store");
const AskUser = require("./AskUser");

class SearchUtility {

    constructor() {

        this.askUser = new AskUser();
    }

    run() {

        store
            .connect()
            .then( () => this.doNextAction() )
            .catch( err => console.log(err) )
            .finally( () => store.close() );
    }

    /**
     * Get an action from the user and do it, then ask for the next action unless they choose to exit
     * @returns {Promise}
     */
    doNextAction() {

        return this.askUser.forAction().then( (response) => {

            let promise;

            // Make a request based on the selected action.

            if( response.action === 'Add a department' ) {

                promise = this.addDepartment();

            } else if( response.action === 'Add a role' ) {

                promise = this.addRole();

            } else if( response.action === 'Add an employee' ) {

                promise = this.addEmployee();

            } else if( response.action === 'Update an employee\'s role' ) {

                promise = this.updateEmployeeRole();

            } else if( response.action === 'View departments' ) {

                promise = this.viewDepartments();

            } else if( response.action === 'View roles' ) {

                promise = this.viewRoles();
            
            } else if( response.action === 'View employees' ) {

                promise = this.viewEmployees();
            }

            if( promise )

                return promise
                    .then( result => this.displayResults(result) )
                    .then( () => this.doNextAction() );

            // Else do nothing and exit the promise loop.

        });

    }

    addDepartment() {
        return this
            .askUser.departmentQuestions()
            .then( response => {
                return store.addDepartment(response.name);
            })
            .then(result => {
                return result;
            });
    }

    addRole() {
        return store
            .viewDepartments()
            .then( response => {
                return this.askUser.roleQuestions(response);
            })
            .then( response => {
                return store.addRole(response);
            })
            .then(result => {
                return result;
            })            
    }

    addEmployee() {

        let employeeInfo;

        return store
            .viewRoles()
            .then( response => {
                return this.askUser.employeeQuestions(response);
            })
            .then( response => {
                employeeInfo = response;
                return store.addEmployee(response);
            })
            .then( () => {
                return store.viewEmployees();
            })
            .then( (response) => {
                return this.askUser.employeeManager(response);
            })
            .then( response => {
                employeeInfo.manager_id = response.manager_id;
                return store.updateEmployeeManager(employeeInfo);
            });
    }

    updateEmployeeRole() {

         let employeeInfo;

        return store
            .viewEmployees()
            .then( response => {
                return this.askUser.updateEmployee(response);
            })
            .then( response => {
                employeeInfo = response;
                return store.viewRoles();
            })
            .then( response => {
                return this.askUser.newEmployeeRole(response);
            })
            .then( response => {
                employeeInfo.role_id = response.role_id;
                return store.updateEmployeeRole(employeeInfo);
            });

    }

    viewDepartments() {
        return store
            .viewDepartments()
            .then(result => {
                return result;
            });
    }

    viewRoles() {
        return store
            .viewRoles()
            .then(result => {
                return result;
            });
    }

    viewEmployees() {
        return store
            .viewEmployees()
            .then(result => {
                return result;
            });
    }

    displayResults(result) {

        console.table(result);

    }

}

module.exports = SearchUtility;