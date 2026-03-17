"use client"

import { motion } from "framer-motion"
import { ArrowRight, Building2, UtensilsCrossed, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "./property-card"
import { featuredHotels, featuredRestaurants, trendingCafes } from "@/lib/data"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface FeaturedSectionProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  items: typeof featuredHotels | typeof featuredRestaurants | typeof trendingCafes
  viewAllLink: string
}

function FeaturedGrid({ title, subtitle, icon, items, viewAllLink }: FeaturedSectionProps) {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              {icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <p className="text-muted-foreground max-w-md">{subtitle}</p>
        </div>
        <Link href={viewAllLink}>
          <Button variant="ghost" className="mt-4 md:mt-0 group">
            View All
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {items.map((item) => (
          <PropertyCard key={item.id} {...item} />
        ))}
      </motion.div>
    </div>
  )
}

export function FeaturedSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full opacity-30"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <FeaturedGrid
          title="Featured Hotels"
          subtitle="Handpicked luxury stays for unforgettable experiences"
          icon={<Building2 className="w-6 h-6 text-primary" />}
          items={featuredHotels}
          viewAllLink="/search?type=hotel"
        />

        <FeaturedGrid
          title="Top Restaurants"
          subtitle="Exceptional dining experiences curated just for you"
          icon={<UtensilsCrossed className="w-6 h-6 text-primary" />}
          items={featuredRestaurants}
          viewAllLink="/search?type=restaurant"
        />

        <FeaturedGrid
          title="Trending Cafes"
          subtitle="Discover cozy spots for your perfect coffee moment"
          icon={<Coffee className="w-6 h-6 text-primary" />}
          items={trendingCafes}
          viewAllLink="/search?type=cafe"
        />
      </div>
    </section>
  )
}
