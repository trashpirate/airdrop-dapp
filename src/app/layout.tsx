import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { headers } from "next/headers";
import { Inter } from "next/font/google";

import { PROJECT_NAME, PROJECT_DESCRIPTION, PROJECT_DOMAIN, PROJECT_X, PROJECT_PREVIEW, PROJECT_URL } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  applicationName: PROJECT_NAME,
  twitter: {
    card: "summary_large_image",
    site: PROJECT_DOMAIN,
    creator: PROJECT_X,
    images: PROJECT_PREVIEW,
  },
  openGraph: {
    type: "website",
    url: PROJECT_URL,
    title: PROJECT_NAME,
    description:
      PROJECT_DESCRIPTION,
    siteName: PROJECT_NAME,
    images: [
      {
        url: PROJECT_PREVIEW,
      },
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>{children}</Providers>
      </body>
    </html>
  );
}