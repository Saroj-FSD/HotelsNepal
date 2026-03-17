"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Heart, Share2, MapPin, Clock, Star, 
  Wifi, Music, Laptop, Coffee, CreditCard, ParkingCircle,
  ChevronLeft, ChevronRight, Phone, Globe, Instagram
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cafes } from "@/lib/data"

const amenityIcons: Record<string, React.ElementType> = {
  "Free WiFi": Wifi,
  "Live Music": Music,
  "Work Friendly": Laptop,
  "Specialty Coffee": Coffee,
  "Card Payment": CreditCard,
  "Parking": ParkingCircle,
}

export default function CafeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)

  const cafe = cafes.find(c => c.id === id) || cafes[0]
  
  const images = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop",
  ]

  const menuItems = [
    { name: "Signature Espresso", price: "$4.50", category: "Coffee" },
    { name: "Matcha Latte", price: "$5.50", category: "Coffee" },
    { name: "Cold Brew", price: "$5.00", category: "Coffee" },
    { name: "Avocado Toast", price: "$12.00", category: "Food" },
    { name: "Croissant", price: "$4.00", category: "Pastry" },
    { name: "Banana Bread", price: "$5.00", category: "Pastry" },
  ]

  const reviews = [
    { name: "Emma W.", rating: 5, comment: "Best coffee in the city! Love the cozy atmosphere.", date: "2 days ago", avatar: "E" },
    { name: "James K.", rating: 5, comment: "Perfect spot for remote work. Great WiFi and quiet corners.", date: "1 week ago", avatar: "J" },
    { name: "Sophie L.", rating: 4, comment: "Amazing pastries and friendly staff. Will come back!", date: "2 weeks ago", avatar: "S" },
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
          <Link href="/search?type=cafe">
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
      <div className="pt-16 relative h-[50vh] md:h-[60vh]">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]}
            alt={cafe.name}
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
                    <Badge className="bg-primary/20 text-primary border-0">Cafe</Badge>
                    {cafe.isOpen && <Badge className="bg-green-500/20 text-green-500 border-0">Open Now</Badge>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{cafe.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{cafe.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 glass-card px-3 py-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg">{cafe.rating}</span>
                  <span className="text-muted-foreground">({cafe.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>7:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="w-4 h-4" />
                  <span>{cafe.specialty}</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {cafe.name} is a charming specialty coffee shop known for its exceptional brews and cozy atmosphere. 
                Perfect for both quick coffee runs and extended work sessions, we offer a carefully curated selection 
                of single-origin coffees, artisan pastries, and light bites. Our skilled baristas are passionate 
                about craft coffee and always ready to help you discover your new favorite drink.
              </p>
            </motion.div>

            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="glass-card w-full justify-start h-auto p-1 gap-1">
                <TabsTrigger value="menu" className="flex-1 md:flex-none">Menu</TabsTrigger>
                <TabsTrigger value="amenities" className="flex-1 md:flex-none">Amenities</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 md:flex-none">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="mt-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="glass-card p-6 space-y-6"
                >
                  <h3 className="text-xl font-semibold">Popular Items</h3>
                  <div className="grid gap-4">
                    {menuItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <span className="font-semibold text-primary">{item.price}</span>
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
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cafe.amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Coffee
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card-strong p-6 sticky top-24 space-y-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-1">{cafe.priceRange}</div>
                <p className="text-sm text-muted-foreground">Average spend per person</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <h4 className="font-semibold">Connect</h4>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3">Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mon - Fri</span>
                    <span>7:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>8:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>8:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
