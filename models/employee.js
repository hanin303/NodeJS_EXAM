const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    FullName: {
        type: String,
        required: true
      },
      Rank: {
        type: Number,
        required: true
      },
      Salary: {
        type: Number,
        required: true
      }
});
module.exports = mongoose.model("Employee", employeeSchema);
