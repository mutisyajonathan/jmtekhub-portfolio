"use client";

import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();

      if (Array.isArray(data)) {
        setLeads(data.filter(Boolean)); // remove null/undefined
      } else {
        console.error("Invalid API response:", data);
        setLeads([]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 8000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch("/api/leads/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      fetchLeads();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteLead = async (id: number) => {
    try {
      await fetch("/api/leads/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchLeads();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredLeads = leads
    .filter((l) => l && typeof l === "object")
    .filter((l) =>
      filter === "all" ? true : l.status === filter
    )
    .filter((l) => {
      const name = l.name ?? "";
      const email = l.email ?? "";

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#050510]">

      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#07071a] to-[#02020a]" />

      <div className="relative z-10 p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 backdrop-blur-2xl bg-white/5 border border-white/5 p-5 rounded-2xl">
          
          <div>
            <h1 className="text-2xl font-bold text-[#8be872]">
              JM TekHub Dashboard
            </h1>
            <p className="text-xs text-gray-400">
              Admin control center
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">

            <input
              placeholder="Search leads..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/40 border border-white/10 px-3 py-2 rounded-lg text-sm backdrop-blur-md focus:outline-none focus:border-[#8be872]"
            />

            {/* FILTER PILLS */}
            <div className="flex gap-2 text-xs">
              {["all", "new", "contacted", "closed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full border transition ${
                    filter === f
                      ? "bg-[#8be872] text-black"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <LogoutButton />
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Leads", value: leads.length, color: "text-white" },
            {
              label: "New",
              value: leads.filter((l) => l.status === "new").length,
              color: "text-blue-400",
            },
            {
              label: "Closed",
              value: leads.filter((l) => l.status === "closed").length,
              color: "text-green-400",
            },
          ].map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-xs text-gray-400">{m.label}</p>
              <h2 className={`text-2xl font-bold ${m.color}`}>
                {m.value}
              </h2>
            </div>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <p className="text-gray-400 text-sm">Loading leads...</p>
        )}

        {/* LEADS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredLeads.map((lead) => {
            if (!lead?.id) return null;

            return (
              <div
                key={lead.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/5"
              >

                <h2 className="text-lg font-semibold">
                  {lead.name || "No Name"}
                </h2>

                <p className="text-sm text-gray-400">
                  {lead.email || "No Email"}
                </p>

                <p className="text-sm text-blue-400">
                  📞 {lead.phone || "N/A"}
                </p>

                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#8be872]/10 text-[#8be872] border border-[#8be872]/20">
                  {lead.service || "N/A"}
                </span>

                {/* STATUS */}
                <div className="mt-3">
                  <select
                    value={lead.status || "new"}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value)
                    }
                    className="px-3 py-1 rounded-lg text-sm bg-black/40 border border-white/10"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="ml-3 text-red-400 text-xs"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-3 text-sm text-gray-300">
                  {lead.message || "No message"}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {lead.created_at
                    ? new Date(lead.created_at).toLocaleString()
                    : "Invalid date"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}