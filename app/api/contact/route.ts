export const dynamic = "force-dynamic";
import { clientEmailTemplate } from "../../../lib/emailTemplate";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    // ✅ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ 1. Store in Supabase
    const { error: dbError } = await supabaseServer
      .from("leads")
      .insert([
        {
          name,
          email,
          service,
          message,
        },
      ]);

    if (dbError) {
      console.error("DB Error:", dbError);
    }

    // ✅ 2. Send email to YOU
    await resend.emails.send({
      from: "JM TekHub <onboarding@resend.dev>",
      to: ["mutisyajonathan.ke@gmail.com"],
      subject: `New Service Request: ${service}`,
      html: `
        <h2>New Client Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // ✅ 3. Send confirmation email to CLIENT
    await resend.emails.send({
      from: "JM TekHub <onboarding@resend.dev>",
      to: [email],
      subject: "We received your request - JM TekHub",
      html: clientEmailTemplate({
        name,
        service,
        message,
      }),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}