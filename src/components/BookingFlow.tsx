"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

// Dummy stripe key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// API types
type Service = { id: string; title: string; duration: number; price: string; numeric_price: number; desc: string; category_id: string; image: string };
type Stylist = { id: number; name: string; role: string; specialty: string; image: string };

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  
  // Data from backend
  const [services, setServices] = useState<any[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  
  // Client info
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "" });
  
  // Payment
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    // Load services and stylists
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data));
      
    fetch("/api/stylists")
      .then(res => res.json())
      .then(data => setStylists(data));
  }, []);
  
  useEffect(() => {
    if (date && selectedStylist && selectedService) {
      const formattedDate = format(date, "yyyy-MM-dd");
      fetch(`/api/availability?date=${formattedDate}&stylist_id=${selectedStylist.id}&service_id=${selectedService.id}`)
        .then(res => res.json())
        .then(data => setAvailableSlots(data.available_slots));
    }
  }, [date, selectedStylist, selectedService]);
  
  const handleProceedToPayment = async () => {
    if (!selectedService || !selectedStylist || !date || !time) return;
    
    // Create pending booking
    const bookingRes = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientInfo.name,
        client_email: clientInfo.email,
        client_phone: clientInfo.phone,
        service_id: selectedService.id,
        stylist_id: selectedStylist.id,
        date: format(date, "yyyy-MM-dd"),
        time: time
      })
    });
    
    if (bookingRes.ok) {
      const booking = await bookingRes.json();
      
      // Create payment intent
      const paymentRes = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: booking.id })
      });
      
      const paymentData = await paymentRes.json();
      setClientSecret(paymentData.clientSecret);
      setStep(5);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-neutral-100 min-h-[600px]">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 w-full h-px bg-neutral-100 -z-10" />
        {["Service", "Stylist", "Date & Time", "Details", "Payment"].map((label, i) => (
          <div key={label} className="flex flex-col items-center bg-white px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-2 ${step > i ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"}`}>
              {i + 1}
            </div>
            <span className={`text-[10px] tracking-widest uppercase ${step > i ? "text-neutral-900" : "text-neutral-400"}`}>{label}</span>
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-serif text-3xl mb-6">Select a Service</h2>
            <div className="space-y-10">
              {services.map(cat => (
                <div key={cat.key}>
                  <h3 className="font-sans text-[11px] tracking-widest uppercase text-neutral-500 mb-4">{cat.label}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.services.map((svc: Service) => (
                      <div 
                        key={svc.id} 
                        onClick={() => setSelectedService(svc)}
                        className={`p-4 border cursor-pointer transition-colors ${selectedService?.id === svc.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                      >
                        <h4 className="font-medium">{svc.title}</h4>
                        <p className="text-sm text-neutral-500 mt-1">{svc.duration} min • {svc.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-end">
              <button disabled={!selectedService} onClick={() => setStep(2)} className="bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-widest uppercase disabled:opacity-50">Next Step</button>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-serif text-3xl mb-6">Choose a Stylist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stylists.map(stylist => (
                <div 
                  key={stylist.id} 
                  onClick={() => setSelectedStylist(stylist)}
                  className={`p-6 border text-center cursor-pointer transition-colors ${selectedStylist?.id === stylist.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                >
                  <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="font-medium text-lg">{stylist.name}</h4>
                  <p className="text-[10px] tracking-widest uppercase text-neutral-500 mt-1">{stylist.role}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-between">
              <button onClick={() => setStep(1)} className="text-neutral-500 hover:text-neutral-900 text-[11px] tracking-widest uppercase">Back</button>
              <button disabled={!selectedStylist} onClick={() => setStep(3)} className="bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-widest uppercase disabled:opacity-50">Next Step</button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-serif text-3xl mb-6">Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h3 className="font-medium mb-4">Available Times</h3>
                {date ? (
                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.length > 0 ? availableSlots.map(t => (
                      <button 
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-2 border text-sm ${time === t ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 hover:border-neutral-400"}`}
                      >
                        {t}
                      </button>
                    )) : (
                      <p className="col-span-3 text-sm text-neutral-500">No available slots for this date.</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">Please select a date first.</p>
                )}
              </div>
            </div>
            <div className="mt-10 flex justify-between">
              <button onClick={() => setStep(2)} className="text-neutral-500 hover:text-neutral-900 text-[11px] tracking-widest uppercase">Back</button>
              <button disabled={!date || !time} onClick={() => setStep(4)} className="bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-widest uppercase disabled:opacity-50">Next Step</button>
            </div>
          </motion.div>
        )}
        
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-serif text-3xl mb-6">Your Details</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1">Full Name</label>
                <input type="text" className="w-full border border-neutral-200 p-3 outline-none focus:border-neutral-900" value={clientInfo.name} onChange={e => setClientInfo({...clientInfo, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1">Email</label>
                <input type="email" className="w-full border border-neutral-200 p-3 outline-none focus:border-neutral-900" value={clientInfo.email} onChange={e => setClientInfo({...clientInfo, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-neutral-500 mb-1">Phone Number</label>
                <input type="tel" className="w-full border border-neutral-200 p-3 outline-none focus:border-neutral-900" value={clientInfo.phone} onChange={e => setClientInfo({...clientInfo, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="mt-10 p-5 bg-neutral-50 border border-neutral-100 flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-500">Total Due Today</p>
                <p className="font-serif text-2xl">{selectedService?.price}</p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-between">
              <button onClick={() => setStep(3)} className="text-neutral-500 hover:text-neutral-900 text-[11px] tracking-widest uppercase">Back</button>
              <button disabled={!clientInfo.name || !clientInfo.email} onClick={handleProceedToPayment} className="bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-widest uppercase disabled:opacity-50">Proceed to Payment</button>
            </div>
          </motion.div>
        )}
        
        {step === 5 && clientSecret && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-serif text-3xl mb-6">Complete Payment</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onSuccess={() => setStep(6)} />
            </Elements>
          </motion.div>
        )}
        
        {step === 6 && (
          <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl mb-4">Booking Confirmed!</h2>
            <p className="text-neutral-500 mb-8">Your appointment is confirmed. A receipt has been sent to your email.</p>
            <button onClick={() => window.location.href = '/'} className="bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-widest uppercase">Return Home</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required' // For simple demo without redirecting away
    });
    
    setIsProcessing(false);
    
    if (!error) {
      onSuccess();
    } else {
      alert(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <PaymentElement className="mb-8" />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        className="w-full bg-neutral-900 text-white py-4 text-[11px] tracking-widest uppercase disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
