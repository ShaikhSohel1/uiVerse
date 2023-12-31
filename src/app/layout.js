import NavBar from "@/Components/NavBar";
import "./globals.css";
import {Ubuntu } from "next/font/google";
import Footer from "@/Components/Footer";
import AuthProvider from "@/Components/AuthProvider";


// add ubuntu font to entire app add suvset

const ubuntu = Ubuntu({
  subsets: ['greek'],
  weight: '700',

});

export const metadata = {
  title: "uiVerse",
  description: "Created By Professors and Students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-slate-700  scrollbar-thumb-opacity-50 scrollbar-track-opacity-50  ${ubuntu.className}`} >
      <body className="bg-gradient-to-b from-[#222222] to-[#464242] overflow-x-hidden"   >
        <AuthProvider>
          <NavBar  />
            {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
