import type { Metadata } from "next";
import { Noto_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import NextTopLoader from 'nextjs-toploader';
const noto = Noto_Sans({
  subsets: ["latin"],
});
const dancingScript = Dancing_Script({
  variable: "--font-dance",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "K-Pop Album Store | Buy Official K-Pop Albums & Merch",
  description:
    "Shop official K-pop albums, photobooks, and merchandise from top artists. Fast delivery, authentic products, and latest releases in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${noto.className} ${dancingScript.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <NuqsAdapter> 
              <NextTopLoader
              color="red"
              height={2}
              />
              {children}
            </NuqsAdapter>

            <Toaster
              position="top-center" />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
