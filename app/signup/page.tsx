"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase/supabase-client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email to verify your account.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510] text-white">
      <div className="bg-black/40 p-8 rounded-xl w-[350px]">
        <h2 className="text-xl mb-4 text-[#8be872]">Create Admin Account</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 rounded bg-black border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-black border border-gray-700"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-[#010066] py-3 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}