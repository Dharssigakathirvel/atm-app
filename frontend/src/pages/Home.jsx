import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">

      <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl w-[350px]">

        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Welcome to ATM App 💳
        </h1>

        <p className="text-gray-600 mb-6">
          Simple • Secure • Smart Banking Experience
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border border-pink-500 text-pink-500 py-2 rounded-lg hover:bg-pink-100 transition"
          >
            Sign Up
          </button>

        </div>

        <p className="text-xs text-gray-400 mt-5">
          Designed for smooth & secure transactions
        </p>

      </div>
    </div>
  );
}