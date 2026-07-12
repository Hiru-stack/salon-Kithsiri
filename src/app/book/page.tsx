import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book an Appointment — Kithsiri Salon",
  description: "Secure your time with our expert stylists.",
};

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-neutral-400 font-medium mb-4">
            Reservation
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-neutral-900">
            Book Your Experience
          </h1>
        </div>
        
        <BookingFlow />
      </main>
      <Footer />
    </div>
  );
}
