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

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 8000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/leads/update", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
  };

  const deleteLead = async (id: number) => {
    await fetch("/api/leads/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    fetchLeads();
  };

  const filteredLeads = leads
    .filter((l) =>
      filter === "all" ? true : l.status === filter
    )
    .filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#050510]">

      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#07071a] to-[#02020a]" />

      <div className="relative z-10 p-6">

        {/* HEADER */}
        <div className="
          flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8
          backdrop-blur-2xl bg-white/5 border border-white/5
          p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        ">
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
              className="
                bg-black/40 border border-white/10
                px-3 py-2 rounded-lg text-sm
                backdrop-blur-md
                focus:outline-none focus:border-[#8be872]
              "
            />

            {/* FILTER PILLS */}
            <div className="flex gap-2 text-xs">
              {["all", "new", "contacted", "closed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full border transition ${filter === f
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8 mb-10">

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
            <div
              key={i}
              className="
                p-5 rounded-2xl
                bg-white/5 backdrop-blur-2xl
                border border-white/5
                shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
                transition-all duration-300
              "
            >
              <p className="text-xs text-gray-400">{m.label}</p>
              <h2 className={`text-2xl font-bold ${m.color}`}>
                {m.value}
              </h2>
            </div>
          ))}
        </div>

        {/* LEADS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8">

          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="
                p-5 rounded-2xl
                bg-white/5 backdrop-blur-2xl
                border border-white/5
                shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                hover:shadow-[0_15px_60px_rgba(0,0,0,0.75)]
                hover:scale-[1.02]
                transition-all duration-300
                relative overflow-hidden
              "
            >

              {/* 🌟 Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">

                {/* LEFT */}
                <div>
                  <h2 className="text-lg font-semibold">{lead.name}</h2>

                  <p className="text-sm text-gray-400">{lead.email}</p>
                  <p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      📞 {lead.phone}
                    </a></p>

                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#8be872]/10 text-[#8be872] border border-[#8be872]/20">
                    {lead.service}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-2">

                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-lg text-sm border border-white/10 backdrop-blur-md ${lead.status === "new"
                        ? "bg-blue-600/80"
                        : lead.status === "contacted"
                          ? "bg-yellow-600/80"
                          : "bg-green-600/80"
                      }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-400 text-xs hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* MESSAGE */}
              <p className="mt-4 text-sm text-gray-300 leading-relaxed relative z-10">
                {lead.message}
              </p>

              {/* DATE */}
              <p className="mt-3 text-xs text-gray-500 relative z-10">
                {new Date(lead.created_at).toLocaleString()}
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}