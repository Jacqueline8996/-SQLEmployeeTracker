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
          choices: ["View all Employees?","View All Employee By Department?","View All Role?","View All Employees By Mangager?","Add Employee","Add Department","Add Role","Remove Employee","Update Employee Role","Update Employee Manager","Exit"],
          name: 'optionChoices',
          loop: false,
      },

    ])
     .then(function(response){
        switch (response.optionChoices) {
          case "View all Employees?":
            // viewAllemployees();
            viewAll('employee');
            break;
          case "View All Employee By Department?":
            viewAll('department');
            // viewAllDepart();
          break;
          case "View All Role?":
            viewAll('Role');
            // viewAllDepart();
          break;
          case "View All Employees By Mangager?":
            viewAllManager();
            break;
          case "Add Employee":
            employeeQueston();
          break;
          case "Add Department":
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

function searchInfo(value){

  let val = value;
  //department
  if(val.colNum === 2){
    let querySet = `SELECT id, ${val.colOne} FROM ${val.theTable}`;
   connection.query(querySet, function(err, res) {
      if(err) {
        console.log(err);
      }
      console.table(res);
      startMenu(); 
    });
  }
  //role
  else if(val.colNum === 4){
    let querySet = `SELECT id, ${val.colOne}, ${val.colTwo}, ${val.colThree} FROM ${val.theTable}`;
    connection.query(querySet, function(err, res) {
      if(err) {
        console.log(err);
      }
      console.table(res);
      startMenu(); 
    });
  }
  //employee
  else if(val.colNum === 5){
    let querySet = `SELECT id, ${val.colOne}, ${val.colTwo}, ${val.colThree}, ${val.colFour} FROM ${val.theTable}`;
    connection.query(querySet, function(err, res) {
      if(err) {
        console.log(err);
      }
      console.table(res);
      startMenu(); 
    });
  }
}

function viewAll(option){
  // console.log("inside view all employee")
  // let value = {colNum:"num", colOne:"first_name",colTwo:"last_name",colThree:"role_id",colFour:"manager_id",theTable:"employee"}

   //department
   if(option === "department"){
    let value = {colNum:2, colOne:"name",theTable:`${option}`}
    searchInfo(value) 
  }
  //Role
  else if(option === 'Role'){
    let value = {colNum:4, colOne:"title",colTwo:"salary",colThree:"department_id",theTable:`${option}`}
    searchInfo(value) 
  }
  //employee
  else if(option === 'employee'){
    let value = {colNum:5, colOne:"first_name",colTwo:"last_name",colThree:"role_id",colFour:"manager_id",theTable:`${option}`}
    searchInfo(value) 
  }
 
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

        ]).then((response) =>{
        let query =  "INSERT INTO employee SET ?";
        connection.query(query, {name: response.departmentName}, (err, data) => {
          if(err) {
            console.log(err);
          }
          console.log(query);
          startMenu();     
        });
});

const addDepartment = () => 
    inquirer.prompt([
      {
      type: 'input',
      message: 'What department would you like to add?',
      name: 'departmentName',
    },
  ]).then((response) =>{
      let query =  "INSERT INTO department SET ?";
      connection.query(query, {name: response.departmentName}, (err, data) => {
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
        let query =  "INSERT INTO Role SET ?";
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