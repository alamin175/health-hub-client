import type { Metadata } from "next";
// import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";
import DocButton from "@/components/ML_Part/DocButton";
import Link from "next/link";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Health Hub",
  description: "A complete doctor's appointment booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppRouterCacheProvider>
            <>
              <Toaster position="top-right" richColors />
              {/* <AiDoctorButton />  */}
              {/* <div>
                <a
                  target="blank"
                  className={`fixed bottom-20 right-8 z-10 transition-all duration-300
						}`}
                >
                  <div className="text-4xl sm:text-5xl text-green-500 font-bold ">
                    Doctor
                  </div>
                </a>
              </div> */}
              <Link href="/ai-doctor">
                <DocButton />
              </Link>
              {children}
            </>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
