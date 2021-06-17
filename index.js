const db = require("./db/connection");
const inquirer = require("inquirer");

require("console.table");

console.log(`
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);

function firstPrompt() {
    return inquirer
    .prompt([
    {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
        "Exit"
        ],
    },
    ])
    .then((response) => {
    if (response.selection === "View all departments") {
        return departments();
    } else if (response.selection === "View all roles") {
        return roles();
    } else if (response.selection === "View all employees") {
        return employees();
    } else if (response.selection === "Add a department") {
        return addDepartment();
    } else if (response.selection === "Add a role") {
        return addRole();
    } else if (response.selection === "Add an employee") {
        return addEmployee();
    } else if (response.selection === "Update an employee") {
        return updateEmployee();
    } else {
        return exit();
    }
    });
};

function departments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log("No departments found.");
            return;
        }
        console.table(row);
        firstPrompt();
    });
};

function roles() {
    const sql = `SELECT role.id, role.title, department.department_name, role.salary
                    FROM role
                    LEFT JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, row) => {
        if (err) {
            console.log("No departments found.");
            return;
        }
        console.table(row);
        firstPrompt();
    });
};

function employees() {
    const sql = `SELECT employee.id,  employee.first_name, employee.last_name, role.title, role.salary, department.department_name
                    FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id;`;
    db.query(sql, (err, row) => {
        if (err) {
            console.log("No departments found.");
            return;
        }
        console.table(row);
        firstPrompt();
    });
};

function addDepartment() {
    return inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new departments name?",
        },
        ])
        .then((data) => {
        const sql = `INSERT INTO department (department_name)
                    VALUES (?);`;
        const newDepartment = [data.name];
        db.query(sql, newDepartment, (err, result) => {
            departments();
        });
    });
};

function addRole() {
    return inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new roles name?",
        },
        {
            type: "number",
            name: "salary",
            message: "What is the new roles salary?",
        },
        {
            type: "list",
            name: "department",
            message: "What department does the new role belong to?",
            choices: ["Sales", "Engineering", "Finance", "Legal"],
        },
        ])
        .then((data) => {
        let department = 0;
        if (data.department === "Sales") {
            department = 1;
        } else if (data.department === "Engineering") {
            department = 2;
        } else if (data.department === "Finance") {
            department = 3;
        } else {
            department = 4;
        }
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?);`;
        const newRole = [data.name, data.salary, department];
        db.query(sql, newRole, (err, result) => {
            roles();
        });
    });
};

function addEmployee()  {
    return inquirer
        .prompt([
        {
            type: "input",
            name: "first",
            message: "What is the new employees first name?",
        },
        {
            type: "input",
            name: "last",
            message: "What is the new employees last name?",
        },
        {
            type: "list",
            name: "roles",
            message: "What is the new employees role?",
            choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
            ],
        },
        ])
        .then((data) => {
        let role = 0;
        if (data.roles === "Sales Lead") {
            role = 1;
        } else if (data.roles === "Salesperson") {
            role = 2;
        } else if (data.roles === "Lead Engineer") {
            role = 3;
        } else if (data.roles === "Software Engineer") {
            role = 4;
        } else if (data.roles === "Accountant") {
            role = 5;
        } else if (data.roles === "Legal Team Lead") {
            role = 6;
        } else {
            department = 7;
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?,?,?, ?);`;
        const newEmployee = [data.first, data.last, role, 1];
        db.query(sql, newEmployee, (err, result) => {
            employees();
        });
    });
};

function updateEmployee() {
    return(employees);
}

function exit() {
    console.log("GoodBye!");
}

firstPrompt(); 
