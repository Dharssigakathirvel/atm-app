const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/deposit", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    user.balance += Number(amount);

    await user.save();

    res.status(200).json({
      message: "Amount deposited successfully",
      balance: user.balance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/withdraw", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    user.balance -= Number(amount);

    await user.save();

    res.status(200).json({
      message: "Amount withdrawn successfully",
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


router.get("/balance/:accountNumber", async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.status(200).json({
      name: user.name,
      accountNumber: user.accountNumber,
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;