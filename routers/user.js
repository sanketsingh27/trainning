const { User, AadharCardDetails, Address } = require("../models");

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

UserRouter.post("/users/:id/aadhar", async (req, res) => {
  const { id: userId } = req.params;
  const { name, aadharNumber } = req.body;

  if (!name || !aadharNumber || !userId) {
    return res
      .status(400)
      .json({ message: "name or aadharNumber or id is missing" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user)
      return res.status(500).json({ message: `user ${userId} not found` });

    const aadharDetails = await AadharCardDetails.create({
      name,
      aadharNumber,
      userId,
    });

    user.aadharId = aadharDetails.id;
    const updatedUser = await user.save();

    res.status(201).json({ user: updatedUser, aadhar: aadharDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.get("/users/:id/aadhar", async (req, res) => {
  const { id: userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const user = await User.findByPk(userId, {
      include: "aadhar_card_details",
    });

    if (!user)
      return res.status(500).json({ message: `user ${userId} not found` });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.post("/users/:id/addresses", async (req, res) => {
  const { id: userId } = req.params;

  const { name, street, city, country } = req.body;

  if (!name || !street || !city || !country || !userId) {
    return res
      .status(400)
      .json({ message: "name or street or city or  country id is missing" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user)
      return res.status(500).json({ message: `user ${userId} not found` });

    const address = await Address.create({
      name,
      street,
      city,
      country,
      userId,
    });

    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.get("/users/:id/addresses", async (req, res) => {
  const { id: userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const address = await Address.findAll({
      where: { userId },
    });

    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.get("/users/:userId/addresses/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !addressId) {
    return res
      .status(400)
      .json({ message: "userId and addressId both are required" });
  }

  try {
    const address = await Address.findAll({
      where: { userId, id: addressId },
    });

    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

UserRouter.put("/users/:userId/addresses/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;

  const validField = ["name", "street", "city", "country", "country"];

  if (!userId || !addressId) {
    return res
      .status(400)
      .json({ message: "userId and addressId both are required" });
  }

  try {
    let address = await Address.findOne({
      where: {
        userId,
        id: addressId,
      },
    });

    if (!address)
      return res.status(500).json({ error: `address ${id} not found` });

    validField.forEach((field) => {
      if (field in req.body) {
        address[field] = req.body[field];
      }
    });

    const newAddress = await address.save();

    res.status(201).json(newAddress);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
module.exports = UserRouter;
