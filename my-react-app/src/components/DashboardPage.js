// src/components/DashboardPresensiPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DashboardPresensiPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    } catch (error) {
      console.error("Invalid token");
      navigate("/login");
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const greet = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  if (!userData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-700">Dashboard Presensi</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Blue welcome card */}
        <div className="bg-indigo-600 text-white rounded-xl p-6 mb-6 shadow">
          <h2 className="text-2xl font-bold">
            {greet()}, {userData.nama}! 👋
          </h2>
          <p className="mt-1 text-indigo-200">
            Sistem Presensi – Universitas Muhammadiyah Yogyakarta
          </p>

          {/* Clock */}
          <div className="mt-4 bg-white bg-opacity-20 p-4 rounded-lg inline-block">
            <p className="text-xl font-semibold">
              {currentTime.toLocaleTimeString("id-ID")}
            </p>
            <p className="text-sm text-indigo-100">
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Menu Presensi full dashboard style */}
        <h3 className="text-xl font-semibold mb-4 text-white">Menu Presensi</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="font-bold text-gray-800">Isi Presensi</p>
            <p className="text-sm text-gray-500 mt-1">
              Catat kehadiran hari ini
            </p>
          </button>

          <button className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="font-bold text-gray-800">Riwayat Presensi</p>
            <p className="text-sm text-gray-500 mt-1">
              Lihat presensi sebelumnya
            </p>
          </button>

          <button className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="font-bold text-gray-800">Status Kehadiran</p>
            <p className="text-sm text-gray-500 mt-1">Cek status aktif</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Aktivitas Terbaru
          </h3>

          <div className="p-4 bg-gray-100 rounded-lg mb-3">
            <p className="font-medium text-gray-800">Login berhasil</p>
            <p className="text-sm text-gray-500">
              Baru saja • {currentTime.toLocaleTimeString("id-ID")}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium text-gray-800">Presensi terakhir</p>
            <p className="text-sm text-gray-500">Hari ini • 07:45</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-200 text-sm py-6">
        © 2025 Sistem Presensi 
      </footer>
    </div>
  );
}

export default DashboardPresensiPage;
