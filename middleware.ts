import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set() {
          // ❌ no-op in middleware
        },
        remove() {
          // ❌ no-op in middleware
        },
      },
    }
  );

  // ✅ Correct auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🔒 Protect admin
  if (!user && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// IMPORTANT: must match correctly
export const config = {
  matcher: ["/admin/:path*"],
};