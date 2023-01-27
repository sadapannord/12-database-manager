INSERT INTO department (name)
values ("Sales"),
        ("Marketing"),
        ("Good ol Fun");



INSERT INTO role ( title,salary, department_id)
VALUES ("Manager", 10, 1), 
        ("Supervisor", 5, 2),
        ("Jerk", 2, 3),
        ("Peon", 1, 1),
        ("Lead", 10, 2),
        ("Boot", 5, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("sada", "hello", 1, 2),
        ("dan", "best", 2, 2),
        ("josi", "name", 1, 3)
