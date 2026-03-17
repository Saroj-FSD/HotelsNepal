"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Star, Heart, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  id: number
  name: string
  location: string
  price: number | string
  rating: number
  reviews: number
  image: string
  amenities?: string[]
  features?: string[]
  type: string
  cuisine?: string
  specialty?: string
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  WiFi: Wifi,
  Parking: Car,
  Pool: Waves,
  Restaurant: Coffee,
}

export function PropertyCard({ 
  id, 
  name, 
  location, 
  price, 
  rating, 
  reviews, 
  image, 
  amenities,
  features,
  type,
  cuisine,
  specialty
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt Effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const displayItems = amenities || features || []
  const subtitle = cuisine || specialty || location

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <div className="glass-card overflow-hidden hover-lift">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Top Actions */}
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full glass-card w-9 h-9",
                isLiked && "text-red-500"
              )}
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </Button>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="glass-card px-3 py-1 text-xs font-medium capitalize">
              {type}
            </span>
          </div>

          {/* Price Tag */}
          <div 
            className="absolute bottom-3 right-3 z-10 glass-card-strong px-3 py-2"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="text-lg font-bold">
              {typeof price === "number" ? `$${price}` : price}
              {typeof price === "number" && (
                <span className="text-xs text-muted-foreground font-normal">/night</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="w-3 h-3" />
                <span>{subtitle}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="font-semibold text-sm">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Amenities */}
          {displayItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {displayItems.slice(0, 4).map((item) => {
                const IconComponent = amenityIcons[item]
                return (
                  <span 
                    key={item} 
                    className="flex items-center gap-1 text-xs bg-secondary/50 px-2 py-1 rounded-full"
                  >
                    {IconComponent && <IconComponent className="w-3 h-3" />}
                    {item}
                  </span>
                )
              })}
            </div>
          )}

          {/* CTA */}
          <Link href={`/${type}/${id}`}>
            <Button 
              variant="outline" 
              className="w-full mt-4 rounded-xl border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
