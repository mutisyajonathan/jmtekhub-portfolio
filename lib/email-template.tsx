/**
 * 
 * @param param0 email template
 * @returns 
 */

export function clientEmailTemplate({
  name,
  service,
  message,
}: {
  name: string;
  service: string;
  message: string;
}) {
  return `
  <div style="margin:0;padding:0;background:#050510;font-family:Arial, sans-serif;color:#e5e7eb;">

    <!-- Wrapper -->
    <div style="max-width:600px;margin:40px auto;background:#0b0b1a;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

      <!-- HEADER -->
      <div style="background:#010066;padding:25px 20px;text-align:center;">

        <!-- Logo -->
        <a href="https://jmtekhub-portfolio.vercel.app" style="text-decoration:none;">
          <img 
            src="https://jmtekhub-portfolio.vercel.app/images/logo-fluid.png"
            width="70"
            style="display:block;margin:0 auto;height:auto;
                   filter: drop-shadow(0 0 10px rgba(139,232,114,0.6));"
          />
        </a>

        <!-- Brand -->
        <h1 style="margin:10px 0 0;color:#8be872;font-size:22px;">
          JM TekHub
        </h1>

        <p style="margin:5px 0 0;color:#cbd5e1;font-size:12px;">
          Engineering modern, scalable digital solutions
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:30px 25px;">

        <h2 style="margin:0 0 10px;color:#ffffff;font-size:18px;">
          Hello ${name},
        </h2>

        <p style="margin:0 0 15px;color:#9ca3af;line-height:1.6;font-size:14px;">
          Thank you for reaching out to <strong style="color:#8be872;">JM TekHub</strong>.
        </p>

        <p style="margin:0 0 15px;color:#9ca3af;line-height:1.6;font-size:14px;">
          We’ve received your request for 
          <strong style="color:#8be872;">${service}</strong>.
        </p>

        <p style="margin:0 0 20px;color:#9ca3af;line-height:1.6;font-size:14px;">
          Our team will review your requirements and get back to you shortly.
        </p>

        <!-- Message Box -->
        <div style="padding:15px;border-radius:10px;background:#050510;border:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 5px;color:#8be872;font-size:12px;">
            Your Message
          </p>
          <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.5;">
            ${message}
          </p>
        </div>

        <!-- CTA -->
        <div style="margin-top:25px;text-align:center;">
          <a href="https://wa.me/254720294569"
             style="display:inline-block;padding:12px 22px;border-radius:8px;
                    background:#8be872;color:#050510;text-decoration:none;
                    font-weight:bold;font-size:14px;">
            Continue on WhatsApp
          </a>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="padding:25px 20px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);background:#050510;">

        <!-- Logo -->
        <div style="margin-bottom:10px;">
          <img 
            src="https://jmtekhub-portfolio.vercel.app/images/logo-fluid.png"
            width="60"
            style="display:block;margin:0 auto;height:auto;
                   filter: drop-shadow(0 0 8px rgba(139,232,114,0.5));"
          />
        </div>

        <!-- Brand -->
        <p style="margin:5px 0 0;color:#8be872;font-weight:600;font-size:13px;">
          JM TekHub
        </p>

        <!-- Tagline -->
        <p style="margin:5px 0;color:#888;font-size:11px;">
          Building secure, scalable & modern systems
        </p>

        <!-- Divider -->
        <div style="height:1px;background:rgba(255,255,255,0.08);margin:15px 0;"></div>

        <!-- Links -->
        <p style="margin:5px 0;font-size:12px;">
          <a href="https://jmtekhub-portfolio.vercel.app" 
             style="color:#3b82f6;text-decoration:none;">
             Visit Website
          </a>
          &nbsp;|&nbsp;
          <a href="https://wa.me/254720294569" 
             style="color:#8be872;text-decoration:none;">
             WhatsApp
          </a>
        </p>

        <!-- Location -->
        <p style="margin:5px 0;color:#666;font-size:11px;">
          Nairobi, Kenya
        </p>

        <!-- Copyright -->
        <p style="margin-top:10px;color:#555;font-size:10px;">
          © ${new Date().getFullYear()} JM TekHub. All rights reserved.
        </p>

      </div>

    </div>
  </div>
  `;
}