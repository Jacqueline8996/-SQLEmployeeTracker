//Importing data and programs from  othere folders
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const util = require("util");


//start the program 
const startScreen = () =>{
    console.log("Welcome to the Employee Creator!")
    console.log("Choose what you want to do with the employee!")
}

//connection to sql server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Blue rose",
    database: "employees_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    startMenu();
});
  
const viewAllemployees = async () => {

    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id,employee.manager_id,Role.title, Role.salary, department.name";
    // query += "employee INNER JOIN role ON (employee.role_id = role.id AND role.salary ";
    // query += "FROM role INNER JOIN department ON (em.manager_id = department. AND top_albums.year ";
    //rendering info
    console.log("my query",query);
    const allEmployee = await getResults(query);
    console.log("\n");
    console.table(allEmployee);


};

//figures out what they want to do 
function startMenu() {
    inquirer.prompt([
        //option of what you want to do 
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ["View all Employees","View All Employee By Department","View All Employees By Mangager","Add Employee","Remove Employee","Update Employee Role","Update Employee Manager","Exit"],
            name: 'optionChoices',
            loop: false
        },

    ])
     .then((response) =>{
        switch (response.action) {
            case "View all Employees?":
              viewAllemployees();
              break;
      
            // case "View All Employee By Department":
            //   viewAllDepart();
            //   break;
      
            // case "View All Employees By Mangager":
            //   viewAllManager();
            //   break;
      
            case "Add Employee":
              employeeQueston();
              addAll();
              break;
            case "Add department":
                addDepartment();
            break;
            case "Add Role":
                addRole();
            break;
            case "Remove Employee":
              removeEmployee();
            break;
            case "Update Employee Role":
              updateEmployee();
              break;

            case "Update Employee Manager":
              updateManager();
            break; 
            case "remove employee":
                removeEmployee();
            break; 
      
            case "Exit":
            exitWindow()
              connection.end();
              break;
            }
    });
}

// old code will reuse later
function exitWindow(){
    displayPage(employeesArray);
    console.log("Thank you Your page has been generated good Bye");
    return 
}

const employeeQueston = () =>


    inquirer.prompt([
        //Basic QUesiton for everyone 
        {
            type: 'name',
            message: 'What is your First Name?',
            name: 'first',
        },
        {
            type: 'name',
            message: 'What is the Last Name?',
            name: 'last'
        },
        {
            type: 'number',
            message: 'What is the role number?',
            name: 'employeeRole'
        },
        {
            type: 'number',
            message: 'What is your manager num?',
            name: 'EmployeeManag'
        },

    ]) .then((response) =>{
        let query =  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        getResults(query, [
          response.first,
          response.last,
          response.employeeRole,
          response.EmployeeManag,
        ]);
        
        console.log("\n");
        startMenu();
    
});

const addDepartment = () => {
    inquirer
        .prompt({
        type: "input",
        name: "department",
        message: "What department would you like to add?",
    }).then((response) => {
        let query = "INSERT INTO department (name) VALUES (?)";
        getResults(query, [response.department]);
        console.log(`${response.department} has been added to Departments`);
        console.log("\n");
        mainMenu();
    });
};

const addRole = () => {
    inquirer
      .prompt(
         //Basic QUesiton for everyone 
         {
            type: 'input',
            message: 'What is the role title?',
            name: 'roleTitle',
        },
        {
            type: 'number',
            message: 'What is the Salary?',
            name: 'salary'
        },
        {
            type: 'number',
            message: 'What is the Department ID?',
            name: 'departmentID'
        },
      )
      .then((response) => {
        var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("my response", response);
        }
        mainMenu();
      });
    });
}

const removeEmployee = () =>{

    inquirer
    .prompt({
      type: "list",
      name: "terminated",
      message: "Which employeed do you want to remove",
    })
    .then((response) => {
      let query = "DELETE FROM employee WHERE (?)";
      getResults(query, [response.terminated]);
      console.log(`${response.terminated} has been added to Departments`);
      console.log("\n");
      mainMenu();
    });


}


const main = () =>{
    startScreen();
    startMenu();
}


main();