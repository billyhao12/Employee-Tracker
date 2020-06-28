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

                // set promise equal to a method

            } else if( response.action === 'View departments' ) {

                // set promise equal to a method

            } else if( response.action === 'View roles' ) {

                // set promise equal to a method
            
            } else if( response.action === 'View employees' ) {

                // set promise equal to a method
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
            .askUser.addDepartment()
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
                return this.askUser.addRole(response);
            })
            .then( response => {
                return store.addRole(response);
            })
            .then(result => {
                return result;
            })            
    }

    addEmployee() {

    }

    viewDepartments() {

    }

    viewRoles() {

    }

    viewEmployees() {
        
    }

    displayResults(result) {

        console.log(result);
    }

}

module.exports = SearchUtility;