const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require ('console.table');
const mysql = require ('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

const options = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "action",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
]
function viewDepartments () {
    console.log("testing")
    db.query("select * from department", (err, rows)=> {
        console.table(rows);
        showOptions()
    })
}
function viewRole () {
    db.query("select * from role", (err, rows)=> {
        console.table(rows);
        showOptions()
    })
}
function viewEmployee () {
    db.query("select * from employee", (err, rows)=> {
        console.table(rows);
        showOptions()
    })
}


function addDepartment () {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
    }). then ((answers) => {
        db.query ("INSERT INTO department(name)values(?)", [answers.departmentName], (err, rows) => {
            console.table(rows);
            showOptions()
        })
    }) 
}
function addRole () {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the role?",
        name: "roleTitle",
    },
    {
        type:"list",
        message: "What is the role's salary?",
        name: "roleSalary",
        choices: [10, 5, 2, 1]
    },
    {
        type:"list",
        message: "What department does this role belong to?",
        name: "roleDepartment",
        choices: ["Sales", "Marketing", "Good ol Fun"]
    }]). then ((answers) => {
        console.log(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
        db.query ("INSERT INTO role(answers)values(?)", [answers.roleTitle, answers.roleSalary, answers.roleDepartment], (err, rows) => {
            console.table(rows);})
        showOptions()
    }) 
}
function addEmployee () {
    inquirer.prompt([{
        type: "input",
        message: "What is the first name of the new employee?",
        name: "employeeFirstName",
    }, 
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "employeeLastName",
    }, 
    {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: ["Manager", "Supervisor","Jerk","Peon"],
    },]
    ). then ((answers) => {
        db.query ("INSERT INTO employee(first_name, last_name, role_id)values(?)", [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole], (err, rows) => {
            console.table(rows);
            showOptions()
        })
    }) 
}
function updateEmployee () {
    inquirer.prompt({
        type: "list",
        message: "What is the employee's new role?",
        name: "employeeRole",
        choices: ["Manager", "Supervisor", "Jerk", "Peon"]

    }). then ((answers) => {
        db.query ("UPDATE employee SET role_id = ? WHERE id = ?", [answers.employeeRole], (err, rows) => {
            console.table(rows);
            showOptions()
        })
    }) 
}



function showOptions() {
    inquirer.prompt(options).then((answers => {
    if (answers.action === "View all departments") { //tried changing options.actions to answers
        viewDepartments()
        console.log("Yippee");
    } else if (answers.action === "View all roles") {
        viewRole();
    } else if (answers.action === "View all employees") {
        viewEmployee();
    } else if (answers.action === "Add a department") {
       addDepartment();
    } else if (answers.action === "Add a role") {
        addRole();
    } else if (answers.action === "Add an employee") {
        addEmployee();
    } else if (answers.action === "Update an employee role") {
        updateEmployee();
    }
}))}

showOptions()

