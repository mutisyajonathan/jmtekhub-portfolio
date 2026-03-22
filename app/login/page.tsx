"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Attempting login:", { email });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Login error:", error.message);
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("Login failed: no user returned");
      setLoading(false);
      return;
    }

    // Optional: enforce email verification
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      setError("Please verify your email first.");
      setLoading(false);
      return;
    }

    console.log("Login successful");

    // ✅ Ensure session is fully written before redirect
    await supabase.auth.getSession();

    // ✅ Allow cookies to propagate before middleware checks
    setTimeout(() => {
      window.location.href = "/admin";
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510] text-white">
      <div className="bg-black/40 p-8 rounded-xl w-[350px] shadow-lg backdrop-blur-md">
        <h2 className="text-xl mb-4 text-[#8be872] font-semibold">
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 rounded bg-black border border-gray-700 focus:outline-none focus:border-[#8be872]"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black border border-gray-700 focus:outline-none focus:border-[#8be872]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#010066] py-3 rounded hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
}