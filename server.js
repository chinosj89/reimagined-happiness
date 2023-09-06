const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer 
const choices = inquirer.prompt(questions);
// to hide password - learned in module 13
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mySQL connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

if (choices.action === 'View All Employees') {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.log(results);
    });
};

if (choices.action === 'View All Roles') {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(results);
    });
};

if (choices.action === 'View All Departments') {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(results);
    });
};

if (choices.action === 'Add Employee') {
    db.query('INSERT INTO employee (first_name, last_name, title, salary, manager) VALUES (?, ?, ?, ?, ?)', [
        choices.employeeFirstName,
        choices.employeeLastName,
        choices.employeeRole,
        choices.employeeSalary,
        choices.employeeManager,
        choices.employeeDepartment
    ], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('Employee added successfully.');
        }
    });
}