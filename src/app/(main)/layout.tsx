import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radio Top100",
  description: "Discover the top 100 radio stations worldwide, featuring the best in music, news, talk shows, and more. Tune in to live broadcasts and online streams today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
