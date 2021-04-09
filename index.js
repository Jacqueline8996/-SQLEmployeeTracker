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
  
function viewAllemployees(){

    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id,employee.manager_id,role.title, role.salary, department.name";
    query += "employee INNER JOIN role ON (employee.role_id = role.id AND role.salary ";
    query += "FROM role INNER JOIN department ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //rendering info
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
        switch (answer.action) {
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
function goMainQues(keepGoing){

    if(keepGoing === "Exit"){
        exitWindow();
        return 
    }else{
        employeeQueston(); 
    }

}
const employeeQueston = () =>
    inquirer.prompt([
        //Basic QUesiton for everyone 
        {
            type: 'list',
            message: 'What is the employee position',
            choices: jobRank,
            name: 'rank',
            loop: false
        },
        {
            type: 'input',
            message: 'What is the employee Name?',
            name: 'employeeName'
        },
        {
            type: 'input',
            message: 'What is the employee ID?',
            name: 'employeeID'
        },
        {
            type: 'input',
            message: 'What is the Employee email?',
            name: 'employeeEmail'
        },
       // Specific quetsion for Engineer 
       {
            type: "input",
            message: "what is your git hub?",
            name:"github",
            when: (response) => response.rank === jobRank[0],
        },
        //specific question for intern

        {
            type: "input",
            message: "what is your School?",
            name:"school",
            when: (response) => response.rank === jobRank[1],
        },
        //specific question for manager
        {
            type: "input",
            message: "what is your office number?",
            name:"officeNumber",
            when: (response) => response.rank === jobRank[2],
        },

    ]) .then((response) =>{

        let eName = response.employeeName;
        let eID = response.employeeID;
        let eEmail = response.employeeEmail;
        let eRank = response.rank;
        switch(response.rank){

        //enginer
        case(jobRank[0]):
            let eGit = response.github;
            employeeInfo = new Engineer(eName, eID, eEmail,eRank, eGit);
            employeesArray.push(employeeInfo);
            console.log("Engineer has been added!");
            break;
        //adds intern
        case(jobRank[1]):
            let eSchool = response.school;
            employeeInfo = new Intern(eName, eID, eEmail, eRank,eSchool);
            employeesArray.push(employeeInfo);
            console.log("Intern has been added!");
            break;
        //adds manger
        case(jobRank[2]):
            let eOffice = response.officeNumber;
            employeeInfo = new Manager(eName, eID, eEmail, eRank,eOffice);
            employeesArray.push(employeeInfo);
            console.log("Manager has been added!");
            break;
    
        }
        TaskTodo();
    }
   
        
);





const main = () =>{
    startScreen();
    
    TaskTodo();
}


main();