import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    accountNumber: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/api/auth/register", form);

      alert(res.data.message);

      navigate("/login");

    } catch (err) {
      const msg = err.response?.data?.message;

      if (
        msg === "Email already exists" ||
        msg === "Account number already exists"
      ) {
        alert(msg);
        navigate("/login");
      } else {
        alert(msg || "Error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 relative">

      {/* TOP RIGHT - LOGIN */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-4 right-4 text-xs text-pink-600 underline"
      >
        Login
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Signup</h2>

        <input name="name" onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Name" />
        <input name="email" onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Email" />
        <input name="accountNumber" onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Account Number" />
        <input name="password" type="password" onChange={handleChange} className="w-full p-2 border mb-4" placeholder="Password" />

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}