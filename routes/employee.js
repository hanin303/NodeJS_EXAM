const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeController");
const validateEmployee = require("../middleware/validateEmployee");

// Routes for Employe CRUD operations
router.post('/addEmployee', validateEmployee, employeeController.addEmployee);
router.get('/showEmployees', employeeController.showEmployees);
router.get('/showEmploye/:id', employeeController.getEmployeeById);
router.put('/updateEmploye/:id', employeeController.updateEmployee);
router.delete('/deleteEmploye/:id', employeeController.deleteEmployee);

// Route for searching employee by name
router.get('/searchEmployeeByName/:fullName', employeeController.searchEmployeeByName);

// Route for increasing employee's salary
router.post('/increaseSalary/:id', employeeController.increaseSalary);

module.exports = router; 