import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/layout/Header";

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
        className={`antialiased  bg-clip-text text-transparent`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
