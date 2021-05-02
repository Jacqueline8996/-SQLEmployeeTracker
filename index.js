//Importing data and programs from  othere folders
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Blue rose",
    database: "employees_DB",
});

connection.connect(function(err) {
  if (err) throw err;
  startScreen();
  startMenu();
});

//start the program 
const startScreen = () =>{
    console.log("Welcome to the Employee Creator!")
    console.log("Choose what you want to do with the employee!")
}

//figures out what they want to do 
function startMenu() {
    inquirer.prompt([
      //option of what you want to do 
      {
          type: 'list',
          message: 'What would you like to do?',
          choices: ["View all Employees","View All Employee By Department","View All Employees By Mangager","Add Employee","Remove Employee","Update Employee Role","Update Employee Manager","Exit"],
          name: 'optionChoices',
          loop: false,
      },

    ])
     .then(function(response){
        switch (response.optionChoices) {
          case "View all Employees?":
            viewAllemployees();
            break;

          case "View All Employee By Department <---not click":
            viewAllDepart();
            break;
    
          case "View All Employees By Mangager <---not click":
            viewAllManager();
            break;
    
          case "Add Employee":
            employeeQueston();
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

function viewAllemployees() {
    // console.log("inside view all employee")

    let query= "SELECT first_name,last_name,role_id,manager_id FROM employee";
      connection.query(query, function(err, res) {

      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        console.log("\n");
        console.table(res[i]);
      }
      
      startMenu();     
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
        let query =  "INSERT INTO employee SET ?";
        connection.query(query, {first_name: response.first, last_name: response.last, role_id: response.employeeRole, manager_id: response.EmployeeManag}, (err, data) => {
          if(err) {
            console.log(err);
          }
          console.log(query);
          startMenu();     
        });
});

const addDepartment = () => 
    inquirer
        .prompt({
        type: "input",
        name: "department",
        message: "What department would you like to add?",
    }).then((response) => {
      let query =  "INSERT INTO department SET ?";
      connection.query(query, {title: response.department}, (err, data) => {
        if(err) {
          console.log(err);
        }
        console.log(query);
        startMenu();     
      });
});

const addRole = () => 
    inquirer.prompt([
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

    ]) .then((response) =>{
        let query =  "INSERT INTO employee SET ?";
        connection.query(query, {title: response.roleTitle, salary: response.salary, department_id: response.departmentID}, (err, data) => {
          if(err) {
            console.log(err);
          }
          console.log(query);
          startMenu();     
        });
});



// const removeEmployee = () =>{

//     inquirer
//     .prompt({
//       type: "list",
//       name: "terminated",
//       message: "Which employeed do you want to remove",
//     })
//     .then((response) => {
//       let query = "DELETE FROM employee WHERE (?)";
//       getResults(query, [response.terminated]);
//       console.log(`${response.terminated} has been added to Departments`);
//       console.log("\n");
//       mainMenu();
//     });

// }