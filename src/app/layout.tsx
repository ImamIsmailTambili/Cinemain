import type { Metadata } from "next";
import { Space_Grotesk, Oooh_Baby } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/header";
import Footer from "@/components/footer/footer";
const spaceGrotesk = Space_Grotesk({
  variable: "--font-Space-Grotesk",
  subsets: ["latin"],
});

const ooohBaby = Oooh_Baby({
  variable: "--font-Oooh-Baby",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Cinemain",
  description: "Ini adalah clone web Cinema21",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ooohBaby.variable} antialiased`}
      >
        <Navbar />
        <div className="mt-20">
          {children}
        </div>
        <Footer />


      </body>
    </html>
  );
}
