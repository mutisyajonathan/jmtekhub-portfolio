import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function middleware(req: any) {
  const res = NextResponse.next();

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.delete(name);
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Middleware session:", session); // 🔍 debug

  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};