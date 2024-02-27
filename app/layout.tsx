import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Umer - Blog",
  description: "Blog website made using NextJs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          <Navbar />
          <hr className=" max-w-3xl items-center mx-auto px-4 mb-8 w-full relative h-0.5 border-t-0 bg-black/35 opacity-50 dark:bg-gray-400" />
          <main className="mx-auto px-4 max-w-3xl">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
