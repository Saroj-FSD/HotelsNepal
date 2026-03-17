"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, MapPin, Grid3X3, List, Map,
  SlidersHorizontal, X, Star, DollarSign,
  ChevronDown, Heart
} from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PropertyCard } from "@/components/landing/property-card"
import { featuredHotels, featuredRestaurants, trendingCafes, amenitiesOptions } from "@/lib/data"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list" | "map"
type SortOption = "recommended" | "price-low" | "price-high" | "rating"

const allProperties = [
  ...featuredHotels,
  ...featuredRestaurants,
  ...trendingCafes,
  // Additional mock properties
  {
    id: 5,
    name: "Serene Valley Lodge",
    location: "Colorado, USA",
    price: 280,
    rating: 4.7,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    amenities: ["Fireplace", "Hiking", "Spa", "Restaurant"],
    type: "lodge",
  },
  {
    id: 6,
    name: "Oceanfront Paradise",
    location: "Hawaii, USA",
    price: 650,
    rating: 4.9,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["Beach", "Pool", "Spa", "Restaurant"],
    type: "hotel",
  },
  {
    id: 7,
    name: "Le Petit Bistro",
    cuisine: "French",
    location: "Paris, France",
    price: "$$$",
    rating: 4.8,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    features: ["Wine Pairing", "Outdoor", "Romantic"],
    type: "restaurant",
  },
  {
    id: 8,
    name: "Bean & Book Cafe",
    specialty: "Specialty Coffee",
    location: "Portland, USA",
    price: "$",
    rating: 4.6,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
    features: ["Books", "WiFi", "Vegan Options"],
    type: "cafe",
  },
]

const propertyTypes = [
  { id: "all", label: "All" },
  { id: "hotel", label: "Hotels" },
  { id: "restaurant", label: "Restaurants" },
  { id: "lodge", label: "Lodges" },
  { id: "cafe", label: "Cafes" },
]

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      // Type filter
      if (selectedType !== "all" && property.type !== selectedType) return false
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = property.name.toLowerCase().includes(query)
        const matchesLocation = property.location.toLowerCase().includes(query)
        if (!matchesName && !matchesLocation) return false
      }
      
      // Price filter (only for numeric prices)
      if (typeof property.price === "number") {
        if (property.price < priceRange[0] || property.price > priceRange[1]) return false
      }
      
      // Rating filter
      if (property.rating < minRating) return false
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const propertyAmenities = property.amenities || property.features || []
        const hasAllAmenities = selectedAmenities.every(a => 
          propertyAmenities.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
        )
        if (!hasAllAmenities) return false
      }
      
      return true
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          const priceA = typeof a.price === "number" ? a.price : 0
          const priceB = typeof b.price === "number" ? b.price : 0
          return priceA - priceB
        case "price-high":
          const priceAH = typeof a.price === "number" ? a.price : 1000
          const priceBH = typeof b.price === "number" ? b.price : 1000
          return priceBH - priceAH
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }, [searchQuery, selectedType, priceRange, minRating, selectedAmenities, sortBy])

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setPriceRange([0, 1000])
    setMinRating(0)
    setSelectedAmenities([])
    setSortBy("recommended")
  }

  const activeFiltersCount = [
    selectedType !== "all",
    priceRange[0] > 0 || priceRange[1] < 1000,
    minRating > 0,
    selectedAmenities.length > 0,
  ].filter(Boolean).length

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Search Header */}
      <section className="pt-28 pb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Find Your Perfect <span className="text-gradient">Stay</span>
            </h1>
            
            {/* Search Bar */}
            <div className="glass-card-strong p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-0 h-12 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "h-12 px-4 rounded-xl gap-2",
                    showFilters && "bg-primary text-primary-foreground"
                  )}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
                <div className="hidden md:flex items-center gap-1 glass-card px-2 rounded-xl">
                  {[
                    { mode: "grid", icon: Grid3X3 },
                    { mode: "list", icon: List },
                    { mode: "map", icon: Map },
                  ].map(({ mode, icon: Icon }) => (
                    <Button
                      key={mode}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-lg",
                        viewMode === mode && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setViewMode(mode as ViewMode)}
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Type Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedType === type.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 280 }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block shrink-0"
                >
                  <div className="glass-card p-6 sticky top-28">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold">Filters</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                      >
                        Clear all
                      </Button>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium mb-3 block">
                        Price Range
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={1000}
                        step={10}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium mb-3 block">
                        Minimum Rating
                      </Label>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={cn(
                              "flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all",
                              minRating === rating
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/50 hover:bg-secondary"
                            )}
                          >
                            {rating === 0 ? "Any" : (
                              <>
                                {rating}
                                <Star className="w-3 h-3 fill-current" />
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Amenities
                      </Label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {amenitiesOptions.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={() => toggleAmenity(amenity)}
                            />
                            <Label
                              htmlFor={amenity}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-secondary/50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedType !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {selectedType}
                      <button onClick={() => setSelectedType("all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button onClick={() => setPriceRange([0, 1000])}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {minRating > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {minRating}+ stars
                      <button onClick={() => setMinRating(0)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedAmenities.map((amenity) => (
                    <span key={amenity} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm">
                      {amenity}
                      <button onClick={() => toggleAmenity(amenity)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Results Grid/List */}
              {viewMode === "map" ? (
                <div className="glass-card h-[600px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Map className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Interactive map view coming soon</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  layout
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProperties.map((property) => (
                      <motion.div
                        key={`${property.type}-${property.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PropertyCard {...property} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {filteredProperties.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
