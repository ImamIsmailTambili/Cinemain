import type { Metadata } from "next";
import { Noto_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const notoSans = Noto_Sans({
  variable: "--font-Noto-Sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-Pacifico",
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
      <body className={`${notoSans.variable} ${pacifico.variable} antialiased`}>
        <Header />
        <div className="mt-20">
          {children}
        </div>
        <Footer />

      </body>
    </html >
  );
}
