import { TRPCProvider } from "@/lib/trpc/provider";
import { ToastProvider } from "@/components/ui";
import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgriForward — แลกเปลี่ยนสินค้าเกษตร",
  description: "แพลตฟอร์มซื้อ-ขายสินค้าเกษตรโดยตรง ไม่ผ่านคนกลาง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <TRPCProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
