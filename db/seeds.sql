INSERT INTO department (name)
values ("Sales"),
        ("Marketing"),
        ("Good ol Fun");



INSERT INTO role ( title,salary, department_id)
VALUES ("Manager", 10, 1), 
        ("Supervisor", 5, 1),
        ("Jerk", 2, 1),
        ("Peon", 1, 1),
        ("Manager", 10, 2), 
        ("Supervisor", 5, 2),
        ("Jerk", 2, 2),
        ("Peon", 1, 2),
        ("Manager", 10, 3), 
        ("Supervisor", 5, 3),
        ("Jerk", 2, 3), 
        ("Peon", 1, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("sada", "pannord", 1, 2)
