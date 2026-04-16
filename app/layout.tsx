import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Codex Studio",
  description: "Conversion-focused software products and automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
