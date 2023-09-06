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
// View employee table -- tested with testAllEmployees.sql -- created table
if (choices.action === 'View All Employees') {
    db.query(`SELECT 
    employee.id AS 'Employee ID', 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name',
    role.title AS 'Job Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM 
    employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee AS manager ON manager.id = employee.manager_id`,
        function (err, results) {
            console.log(results);
        });
};

// View role table -- tested -- created table
if (choices.action === 'View All Roles') {
    db.query(`SELECT id AS 'Role ID', 
    title AS ' Job Title', 
    salary AS 'Salary', 
    department_id AS 'Department ID' FROM role`,
        function (err, results) {
            console.log(results);
        });
};

// View department table -- tested -- created table 
if (choices.action === 'View All Departments') {
    db.query(`SELECT 
    id AS 'Department ID', 
    name AS 'Department Name' FROM department`,
        function (err, results) {
            console.log(results);
        });
};


// ADD EMPLOYEE
// Adding new employees to the table with different fields
if (choices.action === 'Add Employee') {
    db.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?)', [
        choices.employeeFirstName,
        choices.employeeLastName,
    ], function (err, employeeResult) {
        if (err) {
            console.log(err);
        } else {
            console.log('Employee added successfully.');
            console.log(employeeResult);
        }
    });
}

if (choices.action === 'Add Role') {
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        choices.employeeRole,
        choices.employeeSalary,
        choices.employeeDepartment,
    ], function (err, roleResult) {
        if (err) {
            console.log(err);
        } else {
            console.log('Role added successfully.');
            console.log(roleResult);
        }
    });
}



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
// ADD new role
if (choices.action === 'Add Role') {
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        choices.newRole,
        choices.newSalary,
        choices.newDepartmentId
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success! New Role added');
        }
    });
}

// ADD new department
if (choices.action === 'Add Department') {
    db.query('INSERT INTO department (name) VALUES (?)', [
        choices.newDepartment
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success! New Department added');
        }
    });
}
