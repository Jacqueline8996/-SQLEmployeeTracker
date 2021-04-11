USE employees_DB;

-- adds into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(1, "Eren", "Jager", 1, 4;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2, "Mikasa", "Ackerman", 1,4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3, "Armin", "Alert", 2, 5;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4, "Levi", "Ackerman", 3, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5, "Hange", "Zoe", 3, 5);

-- adds into the role table
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Fighter", 50000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Intellegence", 70000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Comander", 150000, 2);

-- add into department 
INSERT INTO department (id, name)
VALUES (1, "Combat");

INSERT INTO department (id, name)
VALUES (2, "strategy");

