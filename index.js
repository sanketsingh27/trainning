const cors = require("cors");
const express = require("express");
const { sequelize } = require("./models");
const PORT = 5055;
const UserRouter = require("./routers/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", UserRouter);

app.listen(PORT, async () => {
  console.log(`Listening on localhost: ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
