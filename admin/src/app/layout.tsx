import type { Metadata } from "next";
import { Noto_Sans, Pacifico } from "next/font/google";
import "./globals.css";

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
  title: "Cinemain Admin",
  description: "ini adalah web admin cinemain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${pacifico.variable} antialiased`}
      >
        {children}


      </body>
    </html>
  );
}
