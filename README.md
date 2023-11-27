# ratnest-workers

## Description
This is a command line application that allows the user to view and manage the departments, roles, and employees in a company. The user can view all employees, view all employees by department, view all employees by manager, add an employee, remove an employee, update an employee's role, update an employee's manager, view all roles, add a role, remove a role, view all departments, add a department, remove a department, and view the total utilized budget of a department. This application uses Node.js, Inquirer, and MySQL.

## Table of Contents
* [Installation](#installation) 
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)




## Installation
Make sure to have your modules and package lock setup with npm install if you don't have those already. Next you must verify that you have the SQL database sourced for your queries. If you would like some sample data in your database before you make your queries, you can opt to seed the database now that you are in the SQL shell. Before making queries, make sure you set up your mysql connection in the config directory and input your SQL credentials to allow for the mysql package to read the data from the sourced database.

## Usage

With your terminal open, run the line node server.js to start SQL Employee. Using your arrow and enter keys, you can navigate the different options and then follow the prompts to interact with your database of employees that include a table of departments, roles, and employees. To exit the app just simply navigate to the exit option at the bottom or ctr+C.

Link to Demo Video: https://drive.google.com/file/d/1QEMTMsf8Dbc2G0FNhlDg5PqLcfJArN6-/view?usp=sharing

## Credits
This Apllication was Develpoed with the help of Eduardo Perez (kananaki) Github: https://github.com/Kanabaki
Repo referenced for Startup: https://github.com/nramirez686/employeeNavigator

The maybeChangeToNull function was inspired by: https://stackoverflow.com/questions/54537680/how-to-insert-null-value-from-nodejs-javascript-to-mysql-using-parameterized-inp

## License
License: MIT

## Questions
If you have questions regarding the app, you can reach out to my github or email.
Github:Jackelam20
Email:jackelam202@gmail.com

