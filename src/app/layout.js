import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/lib/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Subscription | Pricing Page",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer position="bottom-right" />
      </body>
      <script
        src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"
        async
        defer
      ></script>
    </html>
  );
}
