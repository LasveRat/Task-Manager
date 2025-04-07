"use client";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import MainLayout from "@/providers/MainLayout";
import MiniSidebarProvider from "@/providers/MiniSidebarProvider";
import HeraderProvider from "@/providers/HeraderProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <UserProvider>
          <Toaster position="top-center" />
          <div className="h-full flex overflow-hidden">
            <MiniSidebarProvider />
            <div className="flex-1 flex flex-col">
              <HeraderProvider />
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
                <SidebarProvider />
              </MainContentLayout>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
