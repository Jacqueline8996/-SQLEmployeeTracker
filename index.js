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
      
            case "View All Employee By Department":
              viewAllDepart();
              break;
      
            case "View All Employees By Mangager":
              viewAllManager();
              break;
      
            case "Add Employee":
              employeeQueston();
              addAll();
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
//ask the user in nodes what question,and then put the information into a read me file
// function goMainQues(keepGoing){

//     if(keepGoing === "Exit"){
//         exitWindow();
//         return 
//     }else{
//         employeeQueston(); 
//     }

// }
const employeeQueston = () =>


    inquirer.prompt([
        //Basic QUesiton for everyone 
        {
            type: 'name',
            message: 'What is your First Name?',
            name: 'first',
            loop: false
        },
        {
            type: 'name',
            message: 'What is the Last Name?',
            name: 'last'
        },
        {
            type: 'list',
            message: 'What is the role?',
            choices:[],
            name: 'employeeRole'
        },
        {
            type: 'list',
            message: 'What is your manager num?',
            choices:[],
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
    


const main = () =>{
    startScreen();
    startMenu();
}


main();