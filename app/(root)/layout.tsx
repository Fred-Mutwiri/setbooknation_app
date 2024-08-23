import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import Leftside from "@/components/shared/Leftside";
import Rightside from "@/components/shared/Rightside";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SetBook Nation",
  description: "Setbook Nation Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <Leftside />

            <section className="main-container" >
              <div className="w-full max-w-5xl">
                {children}
              </div>
            </section>

            <Rightside />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
