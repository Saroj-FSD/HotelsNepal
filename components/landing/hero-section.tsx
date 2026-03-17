"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Search, MapPin, Calendar, Users, Building2, 
  UtensilsCrossed, Mountain, Coffee, ArrowRight, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const categories = [
  { id: "hotel", name: "Hotels", icon: Building2 },
  { id: "restaurant", name: "Restaurants", icon: UtensilsCrossed },
  { id: "lodge", name: "Lodges", icon: Mountain },
  { id: "cafe", name: "Cafes", icon: Coffee },
]

export function HeroSection() {
  const [activeCategory, setActiveCategory] = useState("hotel")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 -z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury hotel interior"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
        
        {/* Floating 3D Elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--foreground-rgb), 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(var(--foreground-rgb), 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* 3D Floating Cards */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotateY: -15 }}
        animate={{ opacity: 1, x: 0, rotateY: -15 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-[5%] top-[20%] hidden xl:block"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card p-4 w-48 transform rotate-6"
        >
          <div className="w-full h-24 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 mb-3" />
          <div className="h-3 w-3/4 rounded bg-muted mb-2" />
          <div className="h-2 w-1/2 rounded bg-muted/60" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, rotateY: 15 }}
        animate={{ opacity: 1, x: 0, rotateY: 15 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute right-[5%] top-[30%] hidden xl:block"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card p-4 w-52 transform -rotate-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary" />
            <div>
              <div className="h-2 w-20 rounded bg-muted mb-1" />
              <div className="h-2 w-14 rounded bg-muted/60" />
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Sparkles key={i} className="w-4 h-4 text-accent" />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute right-[10%] bottom-[20%] hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card p-3 w-40"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">Maldives</span>
          </div>
          <div className="text-lg font-bold">$450<span className="text-xs text-muted-foreground">/night</span></div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Discover Your's Premium Properties</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
          >
            Find Your Perfect{" "}
            <span className="text-gradient">Escape</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty"
          >
            Discover extraordinary Hotels, Restaurants, Lodges, and Cafes. 
            Book unforgettable experiences with just a few clicks.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card-strong p-4 md:p-6 max-w-3xl mx-auto"
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Where to?" 
                    className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="date"
                    className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-muted-foreground mb-1 block">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="2 Adults" 
                    className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                  />
                </div>
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
          >
            <span className="text-muted-foreground">Popular:</span>
            {["Kathmandu", "Pokhara", "Butwal", "Chitwan", "Mustang","Manang"].map((city) => (
              <button
                key={city}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                {city}
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
