const { User } = require("../models");

const { Router } = require("express");
const UserRouter = Router();

UserRouter.post("/users", async (req, res) => {
  try {
    const { country_code, full_name } = req.body;
    console.log("body ", JSON.stringify(req.body, null, 2));
    const user = await User.create({ country_code, full_name });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.get("/users", async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Id is required");

  try {
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Id is required");

  const validField = ["full_name", "country_code"]; // valid fields to edit -> fake dto

  try {
    let user = await User.findByPk(id);

    if (!user) return res.status(500).json({ error: `user ${id} not found` });

    validField.forEach((field) => {
      if (field in req.body) {
        user[field] = req.body[field];
      }
    });

    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Id is required");

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(500).json({ error: `user ${id} not found` });

    await user.destroy();

    return res.json({ message: `User ${id} deleted!` });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = UserRouter;
