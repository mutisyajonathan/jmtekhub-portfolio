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
  <div style="font-family: Arial, sans-serif; background:#050510; padding:40px 0; color:#e5e7eb;">
    
    <!-- Container -->
    <div style="max-width:600px;margin:auto;background:#0b0b1a;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      
      <!-- Header -->
      <div style="background:#010066;padding:20px;text-align:center;">
        <h1 style="margin:0;color:#8be872;font-size:24px;">
          JM TekHub
        </h1>
        <p style="margin:5px 0 0;color:#ccc;font-size:12px;">
          Engineering Digital Solutions
        </p>
      </div>

      <!-- Body -->
      <div style="padding:25px;">
        <h2 style="color:#ffffff;margin-bottom:10px;">
          Hello ${name},
        </h2>

        <p style="color:#aaa;line-height:1.6;">
          We’ve received your request for 
          <strong style="color:#8be872;">${service}</strong>.
        </p>

        <p style="color:#aaa;line-height:1.6;">
          Our team will review your request and get back to you shortly.
        </p>

        <!-- Message box -->
        <div style="margin-top:20px;padding:15px;border-radius:8px;background:#050510;border:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;color:#ccc;font-size:13px;">
            <strong>Your message:</strong><br/>
            ${message}
          </p>
        </div>

        <!-- CTA -->
        <div style="margin-top:25px;text-align:center;">
          <a href="https://wa.me/254720294569"
            style="display:inline-block;padding:12px 20px;border-radius:8px;background:#8be872;color:#050510;text-decoration:none;font-weight:bold;">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:20px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
        
        <!-- Logo -->
       <img src="https://jmtekhub-portfolio.vercel.app/images/logo-fluid.png" 
             alt="JM TekHub" 
             style="width:60px;margin-bottom:10px;" />

        <p style="margin:5px 0;color:#888;font-size:12px;">
          JM TekHub • Nairobi, Kenya
        </p>

        <p style="margin:0;color:#666;font-size:11px;">
          Building scalable, secure and modern systems
        </p>
      </div>

    </div>
  </div>
  `;
}