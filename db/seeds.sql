-- Insert departments into the database
INSERT INTO department (name, manager_id) VALUES
('Sales', 1),
('Engineering', 2),
('Finance', 3),
('Legal', 4)

-- Insert roles given into the database
INSERT INTO role (title,department,salary) VALUES
('Sales Lead', 'Sales', 100000),
('Salesperson', 'Sales', 80000),
('Lead Engineer', 'Engineering', 150000),
('Software Engineer', 'Engineering',120000),
('Account Manger', 'Finance', 160000),
('Accountant', 'Finance', 125000),
('Legal Team Lead', 'Legal', 250000),
('Lawyer', 'Legal', 190000);

-- Insert employees into the database
INSERT INTO employee (first_name, last_name) VALUES
('John', 'Doe'),
('Mike', 'Chan'),
('Ahsley', 'Rodriguez'),
('Kevin', 'Tupik'),
('Kunal', 'Singh'),
('Malia', 'Brown'),
('Sarah', 'Lourd'),
('Tom', 'Allen');

INSERT INTO employee (manager_id)


