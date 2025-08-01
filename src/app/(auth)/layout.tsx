import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import { Toaster } from "react-hot-toast";

import Favicon from "/public/favicon.ico"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swalay Plus Login",
  description: "India's First All-In-One Music Distribution Solution",
   icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </Head> */}

      <body className={`m-0 bg-white ${inter.className}`} >
        <main className="w-full h-screen ">
        <Toaster position="top-center" reverseOrder={false} />
          {children}

        </main>
      </body>
    </html>
  );
}
