"use client"

import { useState, use } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Star, Heart, Share2, MapPin, Clock, Phone, Globe,
  ChevronLeft, ChevronRight, Utensils, Wine, Leaf, ChefHat,
  Calendar, Users, Plus, Minus
} from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { featuredRestaurants } from "@/lib/data"
import { cn } from "@/lib/utils"

const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=80",
]

const menuCategories = [
  {
    name: "Starters",
    items: [
      { id: 1, name: "Truffle Arancini", description: "Crispy risotto balls with black truffle and parmesan", price: 18, image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80", dietary: ["vegetarian"] },
      { id: 2, name: "Tuna Tartare", description: "Fresh yellowfin tuna with avocado, sesame, and wasabi aioli", price: 24, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", dietary: ["gluten-free"] },
      { id: 3, name: "Burrata Salad", description: "Creamy burrata with heirloom tomatoes and aged balsamic", price: 22, image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80", dietary: ["vegetarian", "gluten-free"] },
    ],
  },
  {
    name: "Main Courses",
    items: [
      { id: 4, name: "Wagyu Ribeye", description: "A5 Japanese wagyu with truffle butter and roasted vegetables", price: 95, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", dietary: ["gluten-free"] },
      { id: 5, name: "Lobster Risotto", description: "Creamy arborio rice with butter-poached Maine lobster", price: 48, image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&q=80", dietary: ["gluten-free"] },
      { id: 6, name: "Wild Mushroom Pasta", description: "House-made tagliatelle with foraged mushrooms and truffle oil", price: 32, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&q=80", dietary: ["vegetarian"] },
    ],
  },
  {
    name: "Desserts",
    items: [
      { id: 7, name: "Chocolate Soufflé", description: "Warm Valrhona chocolate soufflé with vanilla bean ice cream", price: 16, image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&q=80", dietary: ["vegetarian"] },
      { id: 8, name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers", price: 14, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", dietary: ["vegetarian"] },
    ],
  },
]

const features = [
  { name: "Michelin Star", icon: Star },
  { name: "Fine Dining", icon: Utensils },
  { name: "Wine Pairing", icon: Wine },
  { name: "Vegan Options", icon: Leaf },
  { name: "Chef's Table", icon: ChefHat },
]

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Starters")
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])
  const [reservationDate, setReservationDate] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [partySize, setPartySize] = useState(2)

  const restaurant = featuredRestaurants.find(r => r.id === parseInt(id)) || featuredRestaurants[0]

  const addToCart = (itemId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { id: itemId, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
      }
      return prev.filter(i => i.id !== itemId)
    })
  }

  const getItemQuantity = (itemId: number) => {
    return cart.find(i => i.id === itemId)?.quantity || 0
  }

  const cartTotal = cart.reduce((total, item) => {
    const menuItem = menuCategories.flatMap(c => c.items).find(i => i.id === item.id)
    return total + (menuItem?.price || 0) * item.quantity
  }, 0)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Image Gallery */}
      <section className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src={restaurantImages[currentImage]}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
            
            {/* Navigation */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + restaurantImages.length) % restaurantImages.length)}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % restaurantImages.length)}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {restaurantImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    currentImage === index ? "bg-primary w-8" : "bg-white/50"
                  )}
                />
              ))}
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {features.slice(0, 3).map((feature) => (
                      <span key={feature.name} className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                        <feature.icon className="w-4 h-4" />
                        {feature.name}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
                  <p className="text-muted-foreground">{restaurant.cuisine} Cuisine</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn("rounded-full glass-card border-0", isLiked && "text-red-500")}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full glass-card border-0">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
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
              {/* Info Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-6 mb-8 text-sm"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-muted-foreground">({restaurant.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Open until 11:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{restaurant.price}</span>
                  <span className="text-muted-foreground">Price Range</span>
                </div>
              </motion.div>

              {/* Tabs */}
              <Tabs defaultValue="menu" className="mb-8">
                <TabsList className="glass-card h-12 p-1 mb-6">
                  <TabsTrigger value="menu" className="rounded-lg">Menu</TabsTrigger>
                  <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="menu">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                      {menuCategories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                            selectedCategory === category.name
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                              : "bg-secondary/50 hover:bg-secondary"
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-4">
                      {menuCategories
                        .find(c => c.name === selectedCategory)
                        ?.items.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-4 flex gap-4"
                          >
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <span className="font-bold text-primary">${item.price}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  {item.dietary.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-primary/10 rounded-full capitalize">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2">
                                  {getItemQuantity(item.id) > 0 ? (
                                    <>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="w-8 h-8 rounded-full"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                      <span className="w-8 text-center font-medium">
                                        {getItemQuantity(item.id)}
                                      </span>
                                      <Button
                                        size="icon"
                                        className="w-8 h-8 rounded-full bg-primary"
                                        onClick={() => addToCart(item.id)}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      size="sm"
                                      className="rounded-full"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      <Plus className="w-4 h-4 mr-1" />
                                      Add
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="about">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">About {restaurant.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Experience culinary excellence at {restaurant.name}, where traditional
                      techniques meet innovative flavors. Our award-winning chefs create
                      unforgettable dishes using only the finest seasonal ingredients sourced
                      from local farms and artisanal producers.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Hours</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monday - Thursday</span>
                            <span>5:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Friday - Saturday</span>
                            <span>5:00 PM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sunday</span>
                            <span>5:00 PM - 9:00 PM</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            <span>www.restaurant.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reviews">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-6 text-center"
                  >
                    <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Reviews coming soon</h3>
                    <p className="text-muted-foreground">Be the first to share your experience!</p>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Reservation Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-strong p-6 sticky top-28"
              >
                <h3 className="text-xl font-semibold mb-6">Make a Reservation</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="time"
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Party Size</label>
                    <div className="flex items-center gap-4 bg-secondary/50 rounded-xl px-4 h-12">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <button
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-medium">{partySize} Guest{partySize > 1 ? 's' : ''}</span>
                      <button
                        onClick={() => setPartySize(Math.min(20, partySize + 1))}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-border pt-4 mb-4">
                    <h4 className="font-semibold mb-3">Pre-order Items</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {cart.map((item) => {
                        const menuItem = menuCategories.flatMap(c => c.items).find(i => i.id === item.id)
                        return (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.quantity}x {menuItem?.name}
                            </span>
                            <span>${(menuItem?.price || 0) * item.quantity}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between font-semibold pt-2 mt-2 border-t border-border">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base font-semibold">
                  Reserve Table
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Free cancellation up to 24 hours before
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
