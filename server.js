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
// View employee table
if (choices.action === 'View All Employees') {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.log(results);
    });
};

// View role table
if (choices.action === 'View All Roles') {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(results);
    });
};

// View department table
if (choices.action === 'View All Departments') {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(results);
    });
};

// Adding new employees to the table
if (choices.action === 'Add Employee') {
    db.query('INSERT INTO employee (first_name, last_name, title, department,salary) VALUES (?, ?, ?, ?, ?)', [
        choices.employeeFirstName,
        choices.employeeLastName,
        choices.employeeRole,
        choices.employeeDepartment,
        choices.employeeSalary,
        choices.employeeManager,
        
    ], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('Employee added successfully.');
            console.log(results)
        }
    });
}