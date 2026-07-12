export const stylists = [
  { id: 1, name: "Elena Rossi", role: "Artistic Director", specialty: "Colour & Balayage", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
  { id: 2, name: "Julian Brooks", role: "Lead Dermal Clinician", specialty: "Skin Wellness & Facials", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { id: 3, name: "Mei Chen", role: "Nail & Beauty Specialist", specialty: "Nail Art & Therapy", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80" },
];

export const services = [
  {
    key: "hair",
    label: "Hair Artistry",
    tagline: "Precision cuts & colour crafted to perfection.",
    heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=85",
    services: [
      { id: "h1", title: "Signature Cut & Style", duration: 60, price: "Rs. 12,500", numeric_price: 1250000, desc: "A precision haircut tailored to your unique features...", featured: true, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80", category_id: "hair" },
      { id: "h2", title: "Balayage & Colour Melt", duration: 180, price: "Rs. 35,000+", numeric_price: 3500000, desc: "Seamless, hand-painted highlights...", featured: true, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80", category_id: "hair" },
    ]
  }
];

// In-memory bookings store (resets on server restart, fine for demo)
export const bookings: any[] = [];
