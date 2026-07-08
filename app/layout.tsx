import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Posts Table Assignment",
  description: "A Next.js posts table with filtering and pagination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
