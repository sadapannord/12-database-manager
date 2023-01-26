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
    inquirer.prompt({
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
    }). then ((answers) => {
        db.query ("INSERT INTO role(name)values(?)", [answers.roleName], (err, rows) => {
            console.table(rows);
            showOptions()
        })
    }) 
}
function addEmployee () {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the new employee?",
        name: "employeeName",
    }). then ((answers) => {
        db.query ("INSERT INTO employee(name)values(?)", [answers.employeeName], (err, rows) => {
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
    if (options.action === "View all departments") {
        viewDepartments();
    } else if (options.action === "View all roles") {
        viewRole();
    } else if (options.action === "View all employees") {
        viewEmployee();
    } else if (options.action === "Add a department") {
       addDepartment();
    } else if (options.action === "Add a role") {
        addRole();
    } else if (options.action === "Add an employee") {
        addEmployee();
    } else if (options.action === "Update an employee role") {
        updateEmployee();
    }
}))}

showOptions()

