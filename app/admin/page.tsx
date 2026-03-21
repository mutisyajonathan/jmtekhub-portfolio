import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminPage() {
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      <div className="space-y-4">
        {leads?.map((lead: any) => (
          <div
            key={lead.id}
            className="p-4 rounded-lg border border-gray-700 bg-black/40"
          >
            <p><strong>{lead.name}</strong> ({lead.email})</p>
            <p className="text-sm text-gray-400">{lead.service}</p>
            <p className="mt-2">{lead.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}