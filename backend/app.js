const express = require("express");
const app = express();
const connectDB = require("./config/connect");
const notFound = require("./middleware/notFound");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is working");
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

//Error Middlewares
app.use(notFound);
app.use(errorHandler);

//Port
const port = process.env.PORT || 4000;

//Server listening on...
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on Port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
