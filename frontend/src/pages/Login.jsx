import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 relative">

      {/* TOP RIGHT - SIGNUP */}
      <button
        onClick={() => navigate("/signup")}
        className="absolute top-4 right-4 text-xs text-pink-600 underline"
      >
        Sign up
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Login</h2>

        <input
          name="email"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          placeholder="Password"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}