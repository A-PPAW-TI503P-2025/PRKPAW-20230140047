// src/components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Login gagal, coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-600 mt-1">Masuk ke akun Anda</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-indigo-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:border-indigo-500"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
