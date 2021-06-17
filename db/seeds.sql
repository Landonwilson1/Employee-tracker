INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', '110000', 1),
    ('Salesperson', '85000', 1),
    ('Lead Engineer', '125000', 2),
    ('Software Engineer', '125000', 2),
    ('Accountant', '115000', 3),
    ('Legal Team Lead', '190000', 4),
    ('Lawyer', '150000', 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 3),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, NULL),
    ('Sara', 'Lord', 6, NULL),
    ('Tom', 'Allen', 7, 6);   