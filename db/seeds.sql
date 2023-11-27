INSERT INTO department (name)
VALUES
("Customer Service"),
("Meat Department"),
("Merchandising Department"),
("Purchasing Department"),
("Sales Department");


INSERT INTO role (title,salary,department_id)
VALUES 
("Butcher",980, 2),
("Cashier",1100, 5),
("Inventory Control", 1200, 3),
("Stock Clerk", 1000, 4),
("Shopping Cart Attendant", 800, 1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
("Mark", "Hamal", 4, NULL),
("Keanu", "Reeves", 5, NULL),
("Aaron", "Hansin", 2, 2),
("Matt", "Mercer",1 , NULL),
("Brain", "Keibler", 3, 2);