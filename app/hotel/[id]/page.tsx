"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Star, Heart, Share2, MapPin, Wifi, Car, Waves,
  Utensils, Dumbbell, Coffee, Calendar, Users, ChevronLeft,
  ChevronRight, Check, X, Play, Expand
} from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { featuredHotels } from "@/lib/data"
import { cn } from "@/lib/utils"

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
]

const amenities = [
  { name: "Free WiFi", icon: Wifi, available: true },
  { name: "Parking", icon: Car, available: true },
  { name: "Swimming Pool", icon: Waves, available: true },
  { name: "Restaurant", icon: Utensils, available: true },
  { name: "Fitness Center", icon: Dumbbell, available: true },
  { name: "Room Service", icon: Coffee, available: true },
]

const roomTypes = [
  {
    id: 1,
    name: "Deluxe Room",
    size: "35 sqm",
    beds: "1 King Bed",
    price: 299,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    features: ["City View", "Free WiFi", "Mini Bar", "Work Desk"],
  },
  {
    id: 2,
    name: "Premium Suite",
    size: "55 sqm",
    beds: "1 King Bed + Sofa",
    price: 449,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    features: ["Ocean View", "Living Area", "Jacuzzi", "Butler Service"],
  },
  {
    id: 3,
    name: "Presidential Suite",
    size: "120 sqm",
    beds: "2 King Beds",
    price: 899,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    features: ["Panoramic View", "Private Pool", "Dining Room", "Personal Chef"],
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "2 weeks ago",
    content: "Absolutely stunning property! The service was impeccable and the views were breathtaking. Will definitely be coming back.",
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&q=80"],
  },
  {
    id: 2,
    name: "James L.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "1 month ago",
    content: "Perfect honeymoon destination. The staff went above and beyond to make our stay special. Highly recommend the spa treatments!",
    images: [],
  },
  {
    id: 3,
    name: "Emma W.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    date: "1 month ago",
    content: "Beautiful hotel with amazing amenities. Only minor issue was the check-in took a bit longer than expected, but otherwise perfect.",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80"],
  },
]

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)

  const hotel = featuredHotels.find(h => h.id === parseInt(id)) || featuredHotels[0]

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % hotelImages.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + hotelImages.length) % hotelImages.length)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Image Gallery */}
      <section className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <Image
                src={hotelImages[currentImage]}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 glass-card px-3 py-1 text-sm">
                {currentImage + 1} / {hotelImages.length}
              </div>

              {/* View All Button */}
              <Button
                variant="outline"
                className="absolute bottom-4 right-4 glass-card border-0"
              >
                <Expand className="w-4 h-4 mr-2" />
                View All
              </Button>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {hotelImages.slice(1, 5).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentImage(index + 1)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden cursor-pointer group",
                    currentImage === index + 1 && "ring-2 ring-primary"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${hotel.name} ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="text-lg font-semibold">+{hotelImages.length - 4} more</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="font-semibold text-foreground">{hotel.rating}</span>
                        <span>({hotel.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn("rounded-full", isLiked && "text-red-500")}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="glass-card h-12 p-1 mb-6">
                  <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                  <TabsTrigger value="rooms" className="rounded-lg">Rooms</TabsTrigger>
                  <TabsTrigger value="amenities" className="rounded-lg">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-semibold mb-4">About This Property</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Experience unparalleled luxury at {hotel.name}, where modern elegance meets
                        timeless sophistication. Nestled in the heart of {hotel.location}, this
                        five-star property offers breathtaking views, world-class amenities, and
                        personalized service that exceeds expectations.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        Each room and suite is thoughtfully designed with premium furnishings,
                        state-of-the-art technology, and luxurious touches that create an
                        unforgettable stay. From our award-winning spa to our gourmet restaurants,
                        every detail is crafted to provide an exceptional experience.
                      </p>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {amenities.slice(0, 6).map((amenity) => (
                          <div key={amenity.name} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <amenity.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="rooms">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {roomTypes.map((room) => (
                      <motion.div
                        key={room.id}
                        whileHover={{ y: -5 }}
                        className={cn(
                          "glass-card p-4 flex flex-col md:flex-row gap-6 cursor-pointer transition-all",
                          selectedRoom === room.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedRoom(room.id)}
                      >
                        <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold">{room.name}</h4>
                            <div className="text-right">
                              <div className="text-2xl font-bold">${room.price}</div>
                              <div className="text-sm text-muted-foreground">/night</div>
                            </div>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                            <span>{room.size}</span>
                            <span>{room.beds}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature) => (
                              <span
                                key={feature}
                                className="px-3 py-1 bg-secondary/50 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="amenities">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-semibold mb-6">Property Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {amenities.map((amenity) => (
                        <div key={amenity.name} className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            amenity.available ? "bg-primary/10" : "bg-muted"
                          )}>
                            <amenity.icon className={cn(
                              "w-5 h-5",
                              amenity.available ? "text-primary" : "text-muted-foreground"
                            )} />
                          </div>
                          <div>
                            <span className="font-medium">{amenity.name}</span>
                            {amenity.available ? (
                              <Check className="inline-block w-4 h-4 text-green-500 ml-2" />
                            ) : (
                              <X className="inline-block w-4 h-4 text-muted-foreground ml-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reviews">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Rating Overview */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-primary">{hotel.rating}</div>
                          <div className="flex gap-1 justify-center my-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {hotel.reviews.toLocaleString()} reviews
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <span className="text-sm w-3">{rating}</span>
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    {reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        whileHover={{ y: -3 }}
                        className="glass-card p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-semibold">{review.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.content}</p>
                            {review.images.length > 0 && (
                              <div className="flex gap-2 mt-4">
                                {review.images.map((image, i) => (
                                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden">
                                    <Image src={image} alt="" fill className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-strong p-6 sticky top-28"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold">${hotel.price}</span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Check-in</label>
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-secondary/50 border-0 h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Check-out</label>
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-secondary/50 border-0 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Guests</label>
                    <div className="flex items-center gap-4 bg-secondary/50 rounded-xl px-4 h-12">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-medium">{guests} Guest{guests > 1 ? 's' : ''}</span>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {selectedRoom && (
                  <div className="border-t border-border pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {roomTypes.find(r => r.id === selectedRoom)?.name}
                      </span>
                      <span>${roomTypes.find(r => r.id === selectedRoom)?.price}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Service fee</span>
                      <span>$45</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${(roomTypes.find(r => r.id === selectedRoom)?.price || 0) + 45}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base font-semibold">
                  {selectedRoom ? "Reserve Now" : "Check Availability"}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  You won't be charged yet
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
