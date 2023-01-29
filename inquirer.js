const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const mysql = require('mysql2');
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
function viewDepartments() {
    db.query("select * from department", (err, rows) => {
        console.table(rows);
        showOptions()
    })
}
function viewRole() {
    db.query("select * from role", (err, rows) => {
        console.table(rows);
        showOptions()
    })
}
function viewEmployee() {
    db.query("select * from employee", (err, rows) => {
        console.table(rows);
        showOptions()
    })
}


function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
    }).then((answers) => {
        db.query("INSERT INTO department(name)values(?)", [answers.departmentName], (err, rows) => {
            console.table(rows);
            showOptions()
        })
    })
}
function addRole() {
    const seeDepartments = [];
    db.promise().query("SELECT * FROM department").then(([queryDepartments]) => {
        queryDepartments.map(({ name }) => (seeDepartments.push({ name: name, }))
        )
    })
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the role?",
        name: "roleTitle",
    },
    {
        type: "list",
        message: "What is the role's salary?",
        name: "roleSalary",
        choices: [10, 5, 2, 1]
    },
    {
        type: "list",
        message: "What department does this role belong to?",
        name: "roleDepartment",
        choices: seeDepartments
    }]).then((answers) => {
        console.log(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
        db.query("INSERT INTO role set ?", { title: answers.roleTitle, salary: answers.roleSalary, department_id: 1 }, (err, rows) => {
            console.table(rows);
        })
        showOptions()
    })
}
function addEmployee() {
    const role = []
    db.promise().query("SELECT * FROM role").then(([data]) => {
        data.map(({ id, title, department_id }) => (role.push({ name: title, value: id })))
    })
    const employees = []
    db.promise().query("SELECT * FROM employee").then(([data]) => {
        data.map(({ first_name, last_name, id }) => (employees.push({ name: first_name + " " + last_name, value: id })))
        console.log(employees)
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
            choices: role,
        },

        {
            type: "list",
            message: "What is the employee's manager?",
            name: "employeeManager",
            choices: employees,
        },
        ]).then((answers) => {
            console.log(answers)
            db.query("INSERT INTO employee set ?", { first_name: answers.employeeFirstName, last_name: answers.employeeLastName, role_id: answers.employeeRole, manager_id: answers.employeeManager }, (err, rows) => {
                console.table(rows);
                showOptions()
            })
        })
    })
}
function updateEmployee() {
    const newRole = []
    db.promise().query("SELECT * FROM role").then(([data]) => {
        data.map(({ title, id }) => (newRole.push({ name:title, value: id})))//name is what they see value is what its value actually is
   
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's id?",
        name: "employeeID",
    },
    {
        type: "list",
        message: "What is the employee's new role?",
        name: "employeeRole",
        choices: newRole,

    }]).then((answers) => {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", { id: answers.employeeID, role_id: answers.employeeRole }, (err, rows) => {
            console.table(rows);
            showOptions()
        })
    }) })
}



function showOptions() {
    inquirer.prompt(options).then((answers => {
        if (answers.action === "View all departments") {
            viewDepartments()
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
    }))
}

showOptions()

