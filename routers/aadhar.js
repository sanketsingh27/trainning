const { AadharCardDetails, User } = require("../models");

const { Router } = require("express");
const AadharCardDetailsRouter = Router();

AadharCardDetailsRouter.post("/aadharcarddetails", async (req, res) => {
  console.log("here ");
  const { name, aadharNumber, userId } = req.body;

  if (!name || !aadharNumber || !userId) {
    return res
      .status(400)
      .json({ message: "Please add all the required fields" });
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

    res.status(201).json(aadharDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

AadharCardDetailsRouter.get("/aadharcarddetails/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("Id is required");

  try {
    const aadhar = await AadharCardDetails.findOne({
      while: { userId },
      include: "user",
    });
    res.status(200).json(aadhar);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = AadharCardDetailsRouter;
