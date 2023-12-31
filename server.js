const inquirer = require("inquirer");
const db = require("./config/connection");
// const {viewAllDep,viewAllRoles,viewAllEmp} = require("./functions")
const consoleTable = require('console.table')

function promptCall() {
  console.log("")
inquirer.prompt([
    {
      type:"list",
      message:"What would you like to do?",
      name:"selections",
      choices: [
      {
        name: "View all departments",
        value: "viewAllDep",
      },
      {
        name: "View all roles",
        value: "viewAllRoles",
      },
      {
        name: "View all employees",
        value: "viewAllEmp",
      },
      {
        name: "Add a Department",
        value: "addDept",
      },
      {
        name: "Add a role",
        value: "addRole",
      },
      {
        name: "Add an Employee",
        value: "addEmployee",
      },
        {
          name: "Update an Employee Role",
          value: "updateRole"
        },
        {
          name: "Delete a Department",
          value: "deleteDepartment"
        },
        {
          name: "Delete a Role",
          value: "deleteRole"
        },
        {
          name: "Delete an Employee",
          value: "deleteEmployee"
        },
      {
        name: "Exit",
        value: "exit"
      }
        ]
    }
  ]
)
.then((optionData) => {
  // console.log(optionData);
  if (optionData.selections ==  "viewAllDep"){
return viewAllDep()
} else if (optionData.selections == "viewAllRoles") {
  return viewAllRoles()
} else if (optionData.selections == "viewAllEmp") {
  return viewAllEmp()
} else if (optionData.selections == "addDept") {
  return addDept()
} else if (optionData.selections == "addRole") {
return addRole()
} else if (optionData.selections == "addEmployee") {
  return addEmployee()
} else if (optionData.selections == "updateRole") {
  return updateRole()
} else if (optionData.selections == "deleteDepartment") {
  return deleteDepartment()
} else if (optionData.selections == "deleteRole") {
  return deleteRole()
} else if (optionData.selections == "deleteEmployee") {
  return deleteEmployee()
} else if (optionData.selections == "exit"){
    console.log("Bye bye!")
    return db.end();
  }
})
}


function viewAllDep() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log("\n__Departments_\n")
      console.table(results);
    console.log("____________\n")
      promptCall()
    })
  }
  function viewAllRoles() {
    db.query("SELECT * FROM role", function (err, results) {
      console.log("\n__Roles______\n")
        console.table(results);
      console.log("______________\n")
        promptCall()
      })
    }
function viewAllEmp() {
      db.query(`SELECT employee.id, employee.first_name, employee.last_name,
      employee.manager_id, role.title, role.salary, department.name
      FROM employee 
      LEFT JOIN role 
      ON employee.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id`, function (err, results) {
 
    console.log("\n_____Employees _____\n")
    
        console.table(results);
    console.log("______________________\n")
          promptCall()
        })
      }


function addDept() {
  db.query("SELECT * FROM department", function (err, results) {
    // const queryRes = results;
    const addDeptPrompts = [
      {
        type: "input",
        message: "Enter a new Department Name",
        name: "newDepName"
      }
    ]
inquirer.prompt(addDeptPrompts)
.then((newDeptAnsData) => {
// console.log(newDeptAnsData)
  const addDeptQuery = `INSERT INTO department (name) 
  VALUES (?)`
db.query(addDeptQuery, [newDeptAnsData.newDepName], function (err, results) {
  viewAllDep()

})

})
  })
}

function addRole() {
  
  db.query("SELECT * FROM department", function (err, results) {
    const depData = results;
    const departments = results.map((d) => d.name); // this brings back department names
      // console.table(depData);

      const rolePrompts = [
        {
          type: "input",
          message: `Enter a Role Title: `,
          name: "title",
        },
        {
          type: "input",
          message: `Enter a Role Salary: `,
          name: "salary",
        },
        {
          type: "list",
          message: `Choose a Department `,
          name: "dep",
          choices: departments
        }];
        inquirer.prompt(rolePrompts)
        .then((roleParams) => {
          // console.log(roleParams)
          const department_id = depData.filter(department => department.name !== roleParams.dep)[0].id;
      console.log(department_id)
        const addRoleQuery = `INSERT INTO role (title, salary, department_id) 
          VALUES (?,?,?)`
       db.query(addRoleQuery, [roleParams.title,roleParams.salary, department_id], function (err, results) {
        console.log("_________________________")
          viewAllRoles()
        })
        })
    })

}

function addEmployee() {
  db.query("SELECT * FROM employee", function (err, employeesFromDatabase) {
const addEmployeePrompts = [
  {
    type: "input",
    message: `Enter New Employee's First Name `,
    name: "firstName",
  },
  {
    type: "input",
    message: `Enter New Employee's Last Name `,
    name: "lastName",
  },
  {
    type: "input",
    message: `Enter New Employee's Role ID `,
    name: "employeeRoleID",
  },
  {
    type: "input",
    message: `If this New Employee has a Manager, enter the Employee ID of that Manager.
If the Employee does not have a Manager, just hit Enter to proceed. \n`,
    name: "employeeManagerID",
   default: null
  },
]
inquirer.prompt(addEmployeePrompts)
.then((ansDataFromNewEmployee) => {
  const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (?,?,?,?)`

const maybeChangeToNull = () => {
if (ansDataFromNewEmployee.employeeManagerID == "") {
return null
}else {
  return employeeManagerID
}
}
  db.query(addEmployeeQuery, 
  [ansDataFromNewEmployee.firstName,
    ansDataFromNewEmployee.lastName,
    ansDataFromNewEmployee.employeeRoleID,
  maybeChangeToNull()
  
], function (err,results) {
    viewAllEmp()
  })
})
  })
}


function updateRole() {
db.query("SELECT * FROM employee", function (err, employeesFromDatabase) {

  const employeeFirstNames = employeesFromDatabase.map((e) => e.first_name );

  const promptUserForEmployeeNameandNewRoleID = [
    {
    type: "list",
    message: "Select an Employee to Update their Role",
    name: "employeeName",
    choices: employeeFirstNames
  },
  {
    type: "input",
    message: "Enter a Role ID",
    name: "newRoleID"
  }
  ]
inquirer.prompt(promptUserForEmployeeNameandNewRoleID)
.then((userAnswersForEmployeeNameAndNewID) => {

  const employeeNameFromUsersAnswer = userAnswersForEmployeeNameAndNewID.employeeName;
  const newRoleIDFromUsersAnswer = userAnswersForEmployeeNameAndNewID.newRoleID;

  const employeeToUpdate = employeesFromDatabase.find(employee => employee.first_name === employeeNameFromUsersAnswer ) 


  const updateRoleQuery = `UPDATE employee SET role_id = ? WHERE id = ? `

  db.query(updateRoleQuery, [newRoleIDFromUsersAnswer , employeeToUpdate.id], function (err,results) {
 
  viewAllEmp()
})
})
  
})
}

function deleteDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the ID of the Department you would like to remove:",
      name: "departmentIdToDelete"
    },
  ])
  .then((deleteAnsData) => {
    const deleteID = deleteAnsData.departmentIdToDelete;
    const queryTemplate = "DELETE FROM department WHERE id = ?";
  db.query(queryTemplate, [deleteID], function (err, results) {
      if (err) {
console.error("Error deleting Department! ", err);
      } else {
console.log("Department deleted successfully!");
viewAllDep();
      }
    })
  })
};

function deleteRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the ID of the Role you would like to remove:",
      name: "roleIdToDelete"
    },
  ])
  .then((deleteRoleData) => {
    const deleteID = deleteRoleData.roleIdToDelete;
    const queryTemplate = "DELETE FROM role WHERE id = ?";
    db.query(queryTemplate, [deleteID], function (err, results) {
      if (err) {
        console.error("Error deleting Role! ", err);
      } else {
        console.log("Role deleted successfully!");
      viewAllRoles();
      }
    })
  })
}

function deleteEmployee() {
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the ID of the Employee you would like to remove:",
    name: "employeeIdToDelete"
  },
  ])
.then((deleteEmployeeData) => {
  const deleteID = deleteEmployeeData.employeeIdToDelete;
  const queryTemplate = "DELETE FROM employee WHERE id = ?";
  db.query(queryTemplate, [deleteID], function (err, results) {
    if (err) {
      console.error("Error deleting Employee! ", err);
    } else {
      console.log("Employee deleted successfully!");
    viewAllEmp();
    }
  })
})
}

promptCall()