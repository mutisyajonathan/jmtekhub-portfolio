"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    // 🔑 Force full reload to clear session properly
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-600 px-4 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}