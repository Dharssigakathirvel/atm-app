const express = require("express");
const User = require("../models/User");
console.log("✅ authRoutes LOADED");

const router = express.Router();

/* =========================
   DEPOSIT ROUTE
========================= */
router.post("/deposit", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    user.balance += Number(amount);

    await user.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   WITHDRAW ROUTE
========================= */
router.post("/withdraw", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= Number(amount);

    await user.save();

    res.status(200).json({
      message: "Withdraw successful",
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   BALANCE ROUTE
========================= */
router.get("/balance/:accountNumber", async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      name: user.name,
      accountNumber: user.accountNumber,
      balance: user.balance,
    });

  } catch (error) {
    console.error("🔥 BALANCE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;