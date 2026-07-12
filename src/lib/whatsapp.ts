export const WHATSAPP_NUMBER = "1234567890"; // Replace with actual number

export function getWhatsAppBookingLink(serviceName?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!serviceName) {
    return `${base}?text=${encodeURIComponent("Hello! I would like to make an appointment at Kithsiri Salon.")}`;
  }
  return `${base}?text=${encodeURIComponent(`Hello! I would like to book an appointment for ${serviceName}.`)}`;
}
