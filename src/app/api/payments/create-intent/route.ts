import { NextResponse } from "next/server";
import Stripe from "stripe";
import { bookings, services } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(request: Request) {
  try {
    const { booking_id } = await request.json();
    
    const booking = bookings.find(b => b.id === booking_id);
    if (!booking) {
      return NextResponse.json({ detail: "Booking not found" }, { status: 404 });
    }
    
    // Find the service to get the price
    let service;
    for (const cat of services) {
      const found = cat.services.find((s: any) => s.id === booking.service_id);
      if (found) {
        service = found;
        break;
      }
    }
    
    if (!service) {
      return NextResponse.json({ detail: "Service not found" }, { status: 404 });
    }
    
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: service.numeric_price, // e.g. 1250000 for 12,500 LKR
      currency: "lkr",
      metadata: { booking_id: booking.id.toString() }
    });
    
    // Update booking in memory
    booking.stripe_payment_intent_id = paymentIntent.id;
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ detail: error.message }, { status: 400 });
  }
}
