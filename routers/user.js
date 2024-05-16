const { User } = require("../models");

const { Router } = require("express");
const UserRouter = Router();

UserRouter.post("/users", async (req, res) => {
  try {
    const { country_code, full_name } = req.body;
    console.log({ country_code });
    console.log("body ", JSON.stringify(req.body, null, 2));
    const user = await User.create({ country_code, full_name });

    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = UserRouter;
