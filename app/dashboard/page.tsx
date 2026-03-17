"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Calendar, MapPin, Star, Heart, Settings, LogOut, 
  Bell, CreditCard, Clock, ChevronRight, Building2,
  UtensilsCrossed, Mountain, Coffee, TrendingUp, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/auth-store"

const upcomingBookings = [
  {
    id: "1",
    name: "Grand Horizon Hotel",
    type: "Hotel",
    location: "Paris, France",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 28, 2026",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    price: "$1,200",
  },
  {
    id: "2",
    name: "La Maison Gourmet",
    type: "Restaurant",
    location: "Lyon, France",
    date: "Mar 26, 2026",
    time: "7:30 PM",
    guests: 2,
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    price: "$180",
  },
]

const savedPlaces = [
  { id: "1", name: "Santorini Sunset Resort", type: "Hotel", rating: 4.9, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=200&h=150&fit=crop" },
  { id: "2", name: "Alpine Adventure Lodge", type: "Lodge", rating: 4.8, image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=200&h=150&fit=crop" },
  { id: "3", name: "Tokyo Zen Cafe", type: "Cafe", rating: 4.7, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop" },
]

const recentActivity = [
  { action: "Booked", item: "Grand Horizon Hotel", date: "2 days ago" },
  { action: "Reviewed", item: "The Blue Lagoon Restaurant", date: "1 week ago" },
  { action: "Saved", item: "Mountain View Lodge", date: "2 weeks ago" },
]

const typeIcons: Record<string, React.ElementType> = {
  Hotel: Building2,
  Restaurant: UtensilsCrossed,
  Lodge: Mountain,
  Cafe: Coffee,
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, hasHydrated } = useAuthStore()

  useEffect(() => {
    // Wait for hydration before checking auth
    if (hasHydrated && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, hasHydrated, router])

  // Show nothing while hydrating or if not authenticated
  if (!hasHydrated || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass-card-strong border-b border-glass-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">Luxestay</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 border-2 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-card-strong p-6 sticky top-24 space-y-6">
              {/* Profile Card */}
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className="mt-2 bg-primary/20 text-primary border-0 capitalize">
                  {user.role}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-2xl font-bold text-gradient">12</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-2xl font-bold text-gradient">8</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Overview</span>
                </Link>
                <Link href="/dashboard/bookings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </Link>
                <Link href="/dashboard/saved" className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                  <Heart className="w-5 h-5" />
                  <span>Saved Places</span>
                </Link>
                <Link href="/dashboard/payments" className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                  <CreditCard className="w-5 h-5" />
                  <span>Payments</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </nav>

              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card-strong p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Welcome back, {user.name.split(" ")[0]}!
                  </h1>
                  <p className="text-muted-foreground">
                    You have 2 upcoming trips. Ready for your next adventure?
                  </p>
                </div>
                <Link href="/search">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <MapPin className="w-4 h-4 mr-2" />
                    Explore Places
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Upcoming Bookings */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                <Link href="/dashboard/bookings" className="text-primary hover:underline text-sm flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-4">
                {upcomingBookings.map((booking, idx) => {
                  const TypeIcon = typeIcons[booking.type] || Building2
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="glass-card p-4 flex flex-col md:flex-row gap-4"
                    >
                      <div className="relative w-full md:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={booking.image}
                          alt={booking.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground border-0">
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {booking.type}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {booking.location}
                            </p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-500 border-0 capitalize">
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          {booking.checkIn && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.checkIn} - {booking.checkOut}
                            </div>
                          )}
                          {booking.date && (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gradient">{booking.price}</span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>

            {/* Saved Places & Activity */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Saved Places */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Saved Places</h2>
                  <Link href="/dashboard/saved" className="text-primary hover:underline text-sm flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="glass-card p-4 space-y-3">
                  {savedPlaces.map((place) => {
                    const TypeIcon = typeIcons[place.type] || Building2
                    return (
                      <div key={place.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/30 transition-colors">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{place.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TypeIcon className="w-3 h-3" />
                            <span>{place.type}</span>
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{place.rating}</span>
                          </div>
                        </div>
                        <Heart className="w-5 h-5 text-accent fill-accent flex-shrink-0" />
                      </div>
                    )
                  })}
                </div>
              </motion.section>

              {/* Recent Activity */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="glass-card p-4 space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        {activity.action === "Booked" && <Calendar className="w-5 h-5 text-primary" />}
                        {activity.action === "Reviewed" && <Star className="w-5 h-5 text-yellow-500" />}
                        {activity.action === "Saved" && <Heart className="w-5 h-5 text-accent" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="text-muted-foreground">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
