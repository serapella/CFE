import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BODYMATTERS - Make Informed Choices",
  description: "Discover what's really in your personal care products and make informed choices for your wellbeing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto px-4">{children}</div>
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
