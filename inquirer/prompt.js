const inquirer = require('inquirer');

const questions = [
    {
        type: 'select',
        name: 'actions',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
        ],
    },
    {
        type: 'input',
        name: 'employeeName',
        message: 'Name of Employee?',
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'What would you like to add to their current roles?',
        when: (answers) => answers.action === 'Update Employee Role'
    },
    {
        type: 'input',
        name: 'employeeRoles',
        message: 'What is the new role of the employee?',
        when: (answers) => answers.action === 'Add Role'
    },
    
];

