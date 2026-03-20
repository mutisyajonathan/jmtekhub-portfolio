import "./globals.css";

export const metadata = {
  title: "JM TekHub | Portfolio",
  description: "Software Development & Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}