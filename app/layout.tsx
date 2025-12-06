import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amrutam",
  description: "Amrutam is a platform for authentic ayurvedic products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Header />
        <Sidebar />
        <main className="ml-[244px] mt-20 mr-20">{children}</main>
      </body>
    </html>
  );
}
