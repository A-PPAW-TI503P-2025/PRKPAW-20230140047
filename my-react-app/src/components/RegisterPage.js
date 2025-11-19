import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mahasiswa",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3001/api/auth/register", formData);

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mt-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Register
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Buat akun baru Anda
        </p>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg text-sm">
            Registrasi Berhasil! Mengarahkan...
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nama */}
          <div>
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              placeholder="Nama lengkap"
              value={formData.nama}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">Daftar sebagai</label>
            <div className="flex gap-4 mt-1 text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="mahasiswa"
                  checked={formData.role === "mahasiswa"}
                  onChange={handleChange}
                />
                Mahasiswa
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>

            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Sudah punya akun?
          <Link to="/login" className="text-indigo-600 ml-1 font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
