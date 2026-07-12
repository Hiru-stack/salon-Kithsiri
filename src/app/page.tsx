import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhilosophyStrip from "@/components/PhilosophyStrip";
import ServiceCatalog from "@/components/ServiceCatalog";
import TeamGrid from "@/components/TeamGrid";
import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/LuxButton";
import { getWhatsAppBookingLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kithsiri Salon — Where Craftsmanship Meets Timeless Beauty",
  description:
    "Premium hair artistry, skin care, nail therapy, and expert grooming in Sri Lanka. Book your appointment via WhatsApp.",
  keywords: ["salon", "hair", "beauty", "Sri Lanka", "Colombo", "grooming", "spa"],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PhilosophyStrip />
        <ServiceCatalog />
        <TeamGrid />
      </main>
      <Footer />
      <FloatingWhatsApp href={getWhatsAppBookingLink()} />
    </div>
  );
}
