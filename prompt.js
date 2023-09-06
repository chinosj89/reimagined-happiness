const inquirer = require('inquirer');
const { employees, roles } = require('./server');
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
    // ADD EMPLOYEE
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
    // UPDATE EMPLOYEE ROLE
    {
        type: 'list',
        name: 'updateEmployee',
        message: 'Which employee would you like to update?',
        choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
        when: (answers) => answers.action === 'Update Employee Roles',
    },
    {
        type: 'list',
        name: 'updateRole',
        message: 'What is their new role?',
        choices: roles.map(role => role.title),
        when: (answers) => answers.action === 'Update Employee Roles',
      },
    // ADD NEW TYPE OF ROLE
    {
        type:'input',
        name:'newRole',
        message:'What is the new role you want to add?',
        defualt: '',
        when: (answers) => answers.action === 'Add Role',
    },
    {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary for the new role?',
        default: '',
        when: (answers) => answers.action === 'Add Role',
      },
      
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What department does the new role belong to?',
        default: '',
        when: (answers) => answers.action === 'Add Role',
      },
    // ADD NEW TYPE OF DEPARTMENT
    {
        type:'input',
        name:'newDepartment',
        message:'What is the new department you want to add?',
        when: (answers) => answers.action === 'Add Department',
    },
];
module.exports = questions;