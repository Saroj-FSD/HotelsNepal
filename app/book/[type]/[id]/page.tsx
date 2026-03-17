"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Calendar, Users, MapPin, Clock, 
  CreditCard, Check, Shield, Star, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/lib/auth-store"
import { useBookingStore } from "@/lib/booking-store"
import { featuredHotels, featuredRestaurants, trendingCafes, lodges } from "@/lib/data"

export default function BookingPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = use(params)
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { addBooking } = useBookingStore()
  
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  
  // Form state
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [specialRequests, setSpecialRequests] = useState("")

  // Get property data
  const getProperty = () => {
    switch (type) {
      case 'hotel':
        return featuredHotels.find(h => String(h.id) === id)
      case 'restaurant':
        return featuredRestaurants.find(r => String(r.id) === id)
      case 'lodge':
        return lodges.find(l => String(l.id) === id)
      case 'cafe':
        return trendingCafes.find(c => String(c.id) === id)
      default:
        return null
    }
  }

  const property = getProperty()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/book/${type}/${id}`)
    }
  }, [isAuthenticated, router, type, id])

  if (!property || !user) {
    return null
  }

  const isHotelOrLodge = type === 'hotel' || type === 'lodge'
  const pricePerNight = (property as any).pricePerNight || 0
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1
  const subtotal = isHotelOrLodge ? pricePerNight * nights : 50 * guests
  const serviceFee = Math.round(subtotal * 0.1)
  const total = subtotal + serviceFee

  const handleSubmit = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    addBooking({
      userId: user.id,
      propertyId: id,
      propertyName: property.name,
      propertyType: type as any,
      propertyImage: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop`,
      location: property.location,
      checkIn: isHotelOrLodge ? checkIn : undefined,
      checkOut: isHotelOrLodge ? checkOut : undefined,
      date: !isHotelOrLodge ? date : undefined,
      time: !isHotelOrLodge ? time : undefined,
      guests,
      totalPrice: total,
      status: 'confirmed',
      specialRequests,
    })
    
    setIsProcessing(false)
    setBookingComplete(true)
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card-strong p-8 md:p-12 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your reservation at {property.name} has been confirmed. Check your email for details.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                View My Bookings
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass-card-strong border-b border-glass-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/${type}/${id}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Secure Booking</span>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s 
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 md:w-24 h-1 mx-2 rounded ${
                      step > s ? "bg-primary" : "bg-secondary"
                    }`} />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card-strong p-6 md:p-8 space-y-6"
              >
                <h2 className="text-xl font-semibold">Booking Details</h2>
                
                {isHotelOrLodge ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Check-in Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Check-out Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Reservation Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Number of Guests</label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-lg w-8 text-center">{guests}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Special Requests (Optional)</label>
                  <Textarea
                    placeholder="Any special requests or requirements..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="bg-secondary/50 border-0 rounded-xl resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={isHotelOrLodge ? !checkIn || !checkOut : !date || !time}
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl"
                >
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card-strong p-6 md:p-8 space-y-6"
              >
                <h2 className="text-xl font-semibold">Payment Information</h2>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      className="h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">CVV</label>
                    <Input
                      type="text"
                      placeholder="123"
                      className="h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Cardholder Name</label>
                  <Input
                    type="text"
                    placeholder="Name on card"
                    defaultValue={user.name}
                    className="h-12 bg-secondary/50 border-0 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 text-green-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Your payment information is secure and encrypted</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl"
                  >
                    Review Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card-strong p-6 md:p-8 space-y-6"
              >
                <h2 className="text-xl font-semibold">Review Your Booking</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium">{property.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{property.location}</span>
                  </div>
                  {isHotelOrLodge ? (
                    <>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Check-in</span>
                        <span className="font-medium">{checkIn}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Check-out</span>
                        <span className="font-medium">{checkOut}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{date}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{time}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">{guests}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg text-gradient">${total}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-12 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="flex-1 h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      "Confirm & Pay"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card-strong p-6 sticky top-24 space-y-6"
            >
              <div className="flex gap-4">
                <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop`}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Badge className="bg-primary/20 text-primary border-0 capitalize mb-1">
                    {type}
                  </Badge>
                  <h3 className="font-semibold">{property.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviews} reviews)</span>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <h4 className="font-semibold">Price Details</h4>
                {isHotelOrLodge && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${pricePerNight} x {nights} night{nights > 1 ? 's' : ''}
                    </span>
                    <span>${subtotal}</span>
                  </div>
                )}
                {!isHotelOrLodge && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${50} x {guests} guest{guests > 1 ? 's' : ''}
                    </span>
                    <span>${subtotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-gradient">${total}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Free cancellation up to 48 hours before your booking
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
