import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Snipster - Manage Your Code Snippets",
  description:
    "Snipster is is a web-based tool designed to help developers store, categorize, and easily retrieve reusable code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/logo.png",
          },
          variables: {
            colorText: "#fff",
            colorBackground: "#111",
            colorPrimary: "#FF7474",
            colorInputBackground: "#333",
            colorInputText: "#fff",
            colorTextSecondary: "#fff",
            colorTextOnPrimaryBackground: "#111",
          },
        }}
      >
        <body className={`${poppins.variable} font-poppins antialiased`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
