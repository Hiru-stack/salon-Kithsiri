import { NextResponse } from "next/server";
import { bookings } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  
  // Verify availability again (basic check)
  const existing = bookings.find(b => 
    b.date === body.date && 
    b.time === body.time && 
    b.stylist_id == body.stylist_id && 
    (b.status === "pending" || b.status === "confirmed")
  );
  
  if (existing) {
    return NextResponse.json({ detail: "Time slot no longer available" }, { status: 400 });
  }
  
  const newBooking = {
    id: Date.now(), // Generate a unique ID
    ...body,
    status: "pending",
    created_at: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  
  return NextResponse.json(newBooking);
}
