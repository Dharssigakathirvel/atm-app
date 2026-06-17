import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 flex items-center justify-center">

      {/* Glass Card */}
      <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-[340px] text-center border border-white/40">

        {/* Title */}
        <h1 className="text-3xl font-bold text-pink-600">
          💳 ATM App
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 mt-2 text-sm">
          cute • secure • simple banking ✨
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-pink-200"></div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl shadow-md transition"
          >
            💕 Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white border border-pink-400 text-pink-500 py-2 rounded-xl hover:bg-pink-50 transition"
          >
            🌸 Sign Up
          </button>

        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-500 mt-6">
          Designed for smooth & secure transactions ✨
        </p>

      </div>
    </div>
  );
}