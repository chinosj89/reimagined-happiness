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
  