import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { IBM_Plex_Sans_Thai } from "@next/font/google";

const font = IBM_Plex_Sans_Thai({
  weight: ["300", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-bai",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${font.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
