import { NextResponse } from "next/server";
import { bookings } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const stylist_id = searchParams.get("stylist_id");
  
  const all_slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
  
  // Find bookings for this date and stylist
  const bookedTimes = bookings
    .filter(b => b.date === date && b.stylist_id == stylist_id && (b.status === "pending" || b.status === "confirmed"))
    .map(b => b.time);
    
  const available_slots = all_slots.filter(slot => !bookedTimes.includes(slot));
  
  return NextResponse.json({ available_slots });
}
