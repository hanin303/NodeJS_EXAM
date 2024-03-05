const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const Employee = require("./models/employee");

//mongoose
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/entrepriseA";

const server = http.createServer(app);

// Socket.io
const io = require("socket.io")(server);

const employeRouter = require("./routes/employee");
const socketRouter = require("./routes/socket");

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`user is connected`);

  setInterval(async () => {
    try {
      const count = await Employee.countDocuments({ Salary: { $gt: 4000 } });
      //we use emit to send events to the server
      io.emit("msg", {
        message: `${count} employees' salaries have exceeded 4000DT`,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }, 5000);

  // Handle disconnection event
  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

//twig
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Parse JSON bodies
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

server.listen(3000, () => console.log("Server is running"));

app.use("/api/employees", employeRouter);
app.use("/socket", socketRouter);

// Connect to MongoDB
var configDB = require("./database/mongodb.json");

//mongodb connection
mongoose.connect(uri).then(() => console.log("Mongodb Connected!"));
module.exports = app;
