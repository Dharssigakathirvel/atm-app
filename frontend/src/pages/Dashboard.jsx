import { useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [amount, setAmount] = useState("");

  // ✅ safer update
  const updateUser = (newBalance) => {
    const updated = {
      ...JSON.parse(localStorage.getItem("user")),
      balance: newBalance,
    };

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  // ================= DEPOSIT =================
  const handleDeposit = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        return alert("Enter valid amount");
      }

      const res = await API.post("/api/account/deposit", {
        accountNumber: user.accountNumber,
        amount: Number(amount),
      });

      alert(res.data.message);

      updateUser(res.data.balance);
      setAmount("");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  // ================= WITHDRAW =================
  const handleWithdraw = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        return alert("Enter valid amount");
      }

      const res = await API.post("/api/account/withdraw", {
        accountNumber: user.accountNumber,
        amount: Number(amount),
      });

      alert(res.data.message);

      updateUser(res.data.balance);
      setAmount("");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Withdraw failed");
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 p-10">

      <h1 className="text-3xl font-bold">
        Welcome {user?.name}
      </h1>

      <div className="bg-white p-6 w-80 rounded-xl mt-4">
        <h2>Balance</h2>

        <p className="text-2xl text-green-600">
          ₹{user?.balance}
        </p>
      </div>

      <input
        className="border p-2 mt-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <div className="flex gap-4 mt-4">

        <button
          onClick={handleDeposit}
          className="bg-green-500 text-white px-4 py-2"
        >
          Deposit
        </button>

        <button
          onClick={handleWithdraw}
          className="bg-red-500 text-white px-4 py-2"
        >
          Withdraw
        </button>

      </div>

    </div>
  );
}