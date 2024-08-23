import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetMatch",
  description: "Plataforma de Adopción Animal",
  icons: {
    icon: ""
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "ZORRO1.svg",
          },
          variables: {
            colorText: '#010101',
            colorPrimary: '#99E550',
            colorBackground: '#fff',
            colorInputBackground: '#fff',
            colorInputText: '#010101',
            colorTextOnPrimaryBackground: '#010101',
            colorTextSecondary: "#010101"
          }
        }}
      >
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>
        <body className={inter.className}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
