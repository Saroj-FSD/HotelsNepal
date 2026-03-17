"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Heart, Share2, MapPin, Clock, Star, 
  Wifi, Mountain, TreePine, Flame, Car, UtensilsCrossed,
  ChevronLeft, ChevronRight, Users, Calendar, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { lodges } from "@/lib/data"

const amenityIcons: Record<string, React.ElementType> = {
  "Free WiFi": Wifi,
  "Mountain View": Mountain,
  "Nature Trails": TreePine,
  "Fireplace": Flame,
  "Parking": Car,
  "Restaurant": UtensilsCrossed,
}

export default function LodgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [guests, setGuests] = useState(2)

  const lodge = lodges.find(l => l.id === parseInt(id)) || lodges[0]
  
  const images = [
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
  ]

  const activities = [
    { name: "Guided Hiking", duration: "4 hours", price: "$45" },
    { name: "Wildlife Safari", duration: "6 hours", price: "$120" },
    { name: "Kayaking", duration: "2 hours", price: "$35" },
    { name: "Stargazing Tour", duration: "3 hours", price: "$25" },
    { name: "Mountain Biking", duration: "3 hours", price: "$55" },
  ]

  const cabinTypes = [
    { name: "Standard Cabin", capacity: "2 guests", price: lodge.price, features: ["Queen Bed", "Mountain View", "Private Bathroom"] },
    { name: "Deluxe Cabin", capacity: "4 guests", price: lodge.price + 80, features: ["King Bed", "Fireplace", "Kitchen", "Deck"] },
    { name: "Family Lodge", capacity: "6 guests", price: lodge.price + 150, features: ["2 Bedrooms", "Full Kitchen", "Living Area", "Hot Tub"] },
  ]

  const reviews = [
    { name: "Michael R.", rating: 5, comment: "Incredible escape from the city. The views are breathtaking and the cabin was perfect.", date: "1 week ago", avatar: "M" },
    { name: "Sarah T.", rating: 5, comment: "Best lodge experience ever! The guided hiking tour was unforgettable.", date: "2 weeks ago", avatar: "S" },
    { name: "David L.", rating: 4, comment: "Peaceful and well-maintained. Great for a nature retreat.", date: "3 weeks ago", avatar: "D" },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b border-glass-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/search?type=lodge">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLiked(!liked)}
              className={liked ? "text-red-500" : ""}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Image Gallery */}
      <div className="pt-16 relative h-[50vh] md:h-[70vh]">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]}
            alt={lodge.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Gallery Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <Button 
            variant="secondary" 
            size="icon" 
            className="glass-card"
            onClick={() => setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage ? "bg-primary w-6" : "bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <Button 
            variant="secondary" 
            size="icon" 
            className="glass-card"
            onClick={() => setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card-strong p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/20 text-primary border-0">Lodge</Badge>
                    <Badge className="bg-green-500/20 text-green-500 border-0">{lodge.type}</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{lodge.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{lodge.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 glass-card px-3 py-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg">{lodge.rating}</span>
                  <span className="text-muted-foreground">({lodge.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Up to 6 guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  <span>{activities.length}+ Activities</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {lodge.name} offers an authentic wilderness experience with modern comforts. Nestled in the heart of 
                pristine nature, our lodge provides the perfect escape for those seeking adventure and tranquility. 
                Wake up to stunning mountain views, explore untouched trails, and end your day by a cozy fireplace. 
                Whether you are seeking a romantic getaway or a family adventure, we have the perfect cabin for you.
              </p>
            </motion.div>

            <Tabs defaultValue="cabins" className="w-full">
              <TabsList className="glass-card w-full justify-start h-auto p-1 gap-1">
                <TabsTrigger value="cabins" className="flex-1 md:flex-none">Cabins</TabsTrigger>
                <TabsTrigger value="activities" className="flex-1 md:flex-none">Activities</TabsTrigger>
                <TabsTrigger value="amenities" className="flex-1 md:flex-none">Amenities</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 md:flex-none">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="cabins" className="mt-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  {cabinTypes.map((cabin, idx) => (
                    <div key={idx} className="glass-card p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-1">{cabin.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{cabin.capacity}</p>
                          <div className="flex flex-wrap gap-2">
                            {cabin.features.map((feature, fidx) => (
                              <div key={fidx} className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-primary" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gradient">${cabin.price}</div>
                          <p className="text-sm text-muted-foreground mb-2">per night</p>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="activities" className="mt-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Available Activities</h3>
                  <div className="grid gap-4">
                    {activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{activity.duration}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-primary">{activity.price}</span>
                          <p className="text-xs text-muted-foreground">per person</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Lodge Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lodge.amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Mountain
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  {reviews.map((review, idx) => (
                    <div key={idx} className="glass-card p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card-strong p-6 sticky top-24 space-y-6"
            >
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-3xl font-bold text-gradient">${lodge.price}</div>
                <p className="text-sm text-muted-foreground">per night</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-10 bg-secondary/50 border-0" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-10 bg-secondary/50 border-0" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="font-medium w-8 text-center">{guests}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">${lodge.price} x 3 nights</span>
                  <span>${lodge.price * 3}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>$45</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${lodge.price * 3 + 45}</span>
                </div>
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base font-semibold">
                Reserve Now
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Free cancellation up to 48 hours before check-in
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
