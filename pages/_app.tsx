import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Bai_Jamjuree } from "@next/font/google";

const font = Bai_Jamjuree({
  weight: ["400", "700"],
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
