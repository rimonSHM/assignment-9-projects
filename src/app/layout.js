import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import "./globals.css";

// Configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata setup
export const metadata = {
  title: "TutorSphere | Find and Book Tutors",
  description: "Learn from the best or share your knowledge with the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#0d0e12] min-h-screen flex flex-col font-sans text-white antialiased">
        
        {/* Persistent Navbar component */}
        <Navbar />
        
        {/* Dynamic Route Content window */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer component */}
        <Footer />
        <Toaster></Toaster>
      </body>
    </html>
  );
}