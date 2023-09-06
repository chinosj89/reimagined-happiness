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
// VIEW DIFFERENT TABLES
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

// ADD EMPLOYEE
// Adding new employees to the table with different fields
// Prompt requires: First name, last name, role, manager
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
};

// UPDATE ROLE
// Update employee role
// Find employee names in the database to map into inquirer instead of having a set of values since we have a prompt that needs to be update if new role is added
const employees = [];
const employeeData = db.query('SELECT * FROM employee');
employeeData.forEach(employee => {
    employees.push({
        first_name: employee.first_name,
        last_name: employee.last_name,
        role_id: employee.role_id,
    });
});
// Find employee roles in the database to map into inquirer instead of having a set of values since we have a prompt that needs to be update if new role is added
const roles = [];
const roleData = db.query('SELECT * FROM role');

roleData.forEach(role => {
    roles.push({
        id: role.id,
        title: role.title,
    });
});

// UPDATE the role of an employee
if (choices.action === 'Update Employee Roles') {
    const sql = `UPDATE role SET title = ? WHERE id = ?`;
    db.query(sql, [choices.updateEmployee, choices.updateRole])
    console.log('Success, updated!')
};
// this query will UPDATE the role table, update the title column, and using the updateEmployee to find the equal id to it. 

// ADD NEW DATA
// ADD NEW TYPE OF ROLE
// Prompt asks for name of role, salary of the role, and department
if (choices.action === 'Add Role') {
    db.query(`INSERT INTO role (title, salary, department) VALUES (?, ?, ?)`,
        [
            choices.newRole,
            choices.newSalary,
            choices.newDepartment
        ])
    console.log('Success! New Role added')
}

// ADD NEW TYPE OF DEPARTMENT
if (choices.action === 'Add Department') {
    db.query(`INSERT INTO department (name) VALUES (?)`)
    console.log('Success! New Department added')
}