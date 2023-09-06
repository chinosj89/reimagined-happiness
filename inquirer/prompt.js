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
        name: 'employeeFirst',
        message: 'First Name of Employee?',
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'input',
        name: 'employeeLast',
        message: 'First Name of Employee?',
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'select',
        name: 'employeeRole',
        message: 'Role/Title of Employee?',
        choices: [
            'Sales Lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal team Lead',
            'Lawyer'
            ],
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'select',
        name: 'employeeManager',
        message: 'Manager of Employee?',
        choices: [
            'John Doe',
            'Ashley Rodriguez',
            'Kunal Singh',
            'Kevin Tupik',
            'Malia Brown',
            'Mike Chan',
            ],
            default: '',
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'select',
        name: 'employeeDepartment',
        message: 'Department of Employee?',
        choices: [
            'Sales',
            'Engineering',
            'Finance',
            'Legal',
            ],
        when: (answers) => answers.action === 'Add Employee'
    },
    {
        type: 'input',
        name: 'employeeSalary',
        message: 'Salary of this employee?',
        when: (answers) => answers.action === 'Add Employee'
    },

    {
        type: 'input',
        name: 'employeeRole',
        message: 'What new role would you like to add?',
        when: (answers) => answers.action === 'Update Employee Roles'
    },
    {
        type: 'input',
        name: 'employeeRoles',
        message: 'What new role would you like to add?',
        when: (answers) => answers.action === 'Add Role'
    },
    
];

