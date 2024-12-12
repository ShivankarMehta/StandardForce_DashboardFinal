import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";
dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stance || StandardForce Corp.",
  description: "Created by Abhay and Shivankar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <Head>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
