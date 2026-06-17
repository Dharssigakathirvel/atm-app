const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   DEPOSIT ROUTE
========================= */
router.post("/deposit", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    user.balance += Number(amount);
    await user.save();

    res.status(200).json({
      message: "Amount deposited successfully",
      balance: user.balance,
    });

  } catch (error) {
    console.error("DEPOSIT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   WITHDRAW ROUTE
========================= */
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= Number(amount);
    await user.save();

    res.status(200).json({
      message: "Amount withdrawn successfully",
      balance: user.balance,
    });

  } catch (error) {
    console.error("WITHDRAW ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   BALANCE ROUTE (used on dashboard load to always show fresh data)
========================= */
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      name: user.name,
      accountNumber: user.accountNumber,
      balance: user.balance,
    });

  } catch (error) {
    console.error("BALANCE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;