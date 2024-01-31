import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { IBM_Plex_Sans_Thai } from "@next/font/google";
import { Room } from "@/shared/room";

const font = IBM_Plex_Sans_Thai({
  weight: ["300", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-bai",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Room>
      <div className={`${font.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </Room>
  );
}
