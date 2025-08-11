import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hector Suazo",
  description:
    "Portfolio website by Hector Suazo to display skills, projects, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-screen min-h-screen antialiased">{children}</body>
    </html>
  );
}
