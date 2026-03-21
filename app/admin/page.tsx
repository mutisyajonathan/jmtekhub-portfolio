"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/leads/update", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
  };

  const filteredLeads =
    filter === "all"
      ? leads
      : leads.filter((l) => l.status === filter);

  return (
    <div className="min-h-screen p-6 bg-[#050510] text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#8be872]">
          JM TekHub Dashboard
        </h1>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="bg-black/40 border border-gray-700 p-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Leads */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 rounded-xl bg-black/40 border border-gray-800 shadow-lg hover:shadow-[0_0_20px_rgba(139,232,114,0.2)] transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{lead.name}</h2>
                <p className="text-sm text-gray-400">{lead.email}</p>
              </div>

              {/* Status */}
              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead.id, e.target.value)
                }
                className="bg-[#010066] text-white px-3 py-1 rounded-lg"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <p className="mt-2 text-[#8be872] text-sm">
              {lead.service}
            </p>

            <p className="mt-2 text-gray-300 text-sm">
              {lead.message}
            </p>

            <p className="mt-3 text-xs text-gray-500">
              {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}