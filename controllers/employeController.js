const Employe = require('../models/employee');

module.exports = {
    async addEmployee(req, res) {
        try { 
            const employeeData = req.body;
            const newEmployee = new Employe(employeeData);
            await newEmployee.save();
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async showEmployees(req, res) {
        try {
            const employees = await Employe.find();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getEmployeeById(req, res) {
        try {
            const employee = await Employe.findById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateEmployee(req, res) {
        try {
            const updatedEmployee = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteEmployee(req, res) {
        try {
            const deletedEmployee = await Employe.findByIdAndDelete(req.params.id);
            if (!deletedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async searchEmployeeByName(req, res) {
        try {
            const fullName = req.params.fullName;
            const employee = await Employe.findOne({ FullName: fullName });
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async increaseSalary(req, res) {
        try {
            const { id } = req.params;
            const { percentage } = req.body;
            // Find the employee by id
            const employee = await Employe.findById(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            // Calculate the increased salary
            const currentSalary = employee.Salary;
            const increasedSalary = currentSalary * (1 + percentage / 100);
            // Update the employee's salary
            employee.Salary = increasedSalary;
            await employee.save();
            res.status(200).json({ message: 'Salary increased successfully', updatedEmployee: employee });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
  }; 
    
