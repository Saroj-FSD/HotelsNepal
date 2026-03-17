"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Building2, UtensilsCrossed, Mountain, Coffee, Users, 
  DollarSign, TrendingUp, Calendar, Settings, LogOut,
  Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  ChevronDown, Bell, Sparkles, BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/auth-store"
import { useBookingStore } from "@/lib/booking-store"

const stats = [
  { label: "Total Bookings", value: "1,234", change: "+12%", icon: Calendar, color: "from-blue-500 to-blue-600" },
  { label: "Total Revenue", value: "$89,432", change: "+8%", icon: DollarSign, color: "from-green-500 to-green-600" },
  { label: "Active Users", value: "5,678", change: "+23%", icon: Users, color: "from-purple-500 to-purple-600" },
  { label: "Properties", value: "342", change: "+5%", icon: Building2, color: "from-orange-500 to-orange-600" },
]

const properties = [
  { id: "1", name: "Grand Horizon Hotel", type: "Hotel", location: "Paris, France", status: "active", bookings: 45, revenue: "$12,340" },
  { id: "2", name: "La Maison Gourmet", type: "Restaurant", location: "Lyon, France", status: "active", bookings: 128, revenue: "$8,760" },
  { id: "3", name: "Alpine Adventure Lodge", type: "Lodge", location: "Swiss Alps", status: "active", bookings: 32, revenue: "$9,450" },
  { id: "4", name: "Tokyo Zen Cafe", type: "Cafe", location: "Tokyo, Japan", status: "pending", bookings: 89, revenue: "$3,210" },
  { id: "5", name: "Sunset Beach Resort", type: "Hotel", location: "Maldives", status: "active", bookings: 67, revenue: "$28,900" },
]

const recentBookings = [
  { id: "1", customer: "John Doe", property: "Grand Horizon Hotel", date: "Mar 15, 2026", amount: "$450", status: "confirmed" },
  { id: "2", customer: "Jane Smith", property: "La Maison Gourmet", date: "Mar 14, 2026", amount: "$180", status: "confirmed" },
  { id: "3", customer: "Mike Johnson", property: "Alpine Lodge", date: "Mar 14, 2026", amount: "$890", status: "pending" },
  { id: "4", customer: "Sarah Wilson", property: "Tokyo Zen Cafe", date: "Mar 13, 2026", amount: "$45", status: "confirmed" },
]

const typeIcons: Record<string, React.ElementType> = {
  Hotel: Building2,
  Restaurant: UtensilsCrossed,
  Lodge: Mountain,
  Cafe: Coffee,
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { bookings } = useBookingStore()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'host')) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-0 bottom-0 w-64 glass-card-strong border-r border-glass-border p-6 hidden lg:flex flex-col"
      >
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HotelsNepal</span>
        </Link>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === "overview" ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === "properties" ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Properties</span>
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === "bookings" ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === "users" ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Users</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTab === "settings" ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 border-2 border-primary/30">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 glass-card-strong border-b border-glass-border"
        >
          <div className="px-6 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
              <p className="text-sm text-muted-foreground">Manage your hospitality platform</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-2">
                <Plus className="w-4 h-4" />
                Add Property
              </Button>
            </div>
          </div>
        </motion.header>

        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Bookings */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Recent Bookings</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b border-border">
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Property</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border/50">
                          <td className="py-4 font-medium">{booking.customer}</td>
                          <td className="py-4 text-muted-foreground">{booking.property}</td>
                          <td className="py-4 text-muted-foreground">{booking.date}</td>
                          <td className="py-4 font-medium">{booking.amount}</td>
                          <td className="py-4">
                            <Badge className={`border-0 ${
                              booking.status === "confirmed" 
                                ? "bg-green-500/20 text-green-500" 
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                                <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search properties..." className="pl-10 bg-secondary/50 border-0" />
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>All Types</DropdownMenuItem>
                      <DropdownMenuItem>Hotels</DropdownMenuItem>
                      <DropdownMenuItem>Restaurants</DropdownMenuItem>
                      <DropdownMenuItem>Lodges</DropdownMenuItem>
                      <DropdownMenuItem>Cafes</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Property</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Bookings</th>
                      <th className="pb-3 font-medium">Revenue</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => {
                      const TypeIcon = typeIcons[property.type] || Building2
                      return (
                        <tr key={property.id} className="border-b border-border/50">
                          <td className="py-4 font-medium">{property.name}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <TypeIcon className="w-4 h-4" />
                              {property.type}
                            </div>
                          </td>
                          <td className="py-4 text-muted-foreground">{property.location}</td>
                          <td className="py-4">
                            <Badge className={`border-0 ${
                              property.status === "active" 
                                ? "bg-green-500/20 text-green-500" 
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}>
                              {property.status}
                            </Badge>
                          </td>
                          <td className="py-4">{property.bookings}</td>
                          <td className="py-4 font-medium text-gradient">{property.revenue}</td>
                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                                <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold">All Bookings ({bookings.length})</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Booking ID</th>
                      <th className="pb-3 font-medium">Property</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Guests</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border/50">
                        <td className="py-4 font-mono text-sm">{booking.id}</td>
                        <td className="py-4 font-medium">{booking.propertyName}</td>
                        <td className="py-4 text-muted-foreground capitalize">{booking.propertyType}</td>
                        <td className="py-4 text-muted-foreground">{booking.checkIn || booking.date}</td>
                        <td className="py-4">{booking.guests}</td>
                        <td className="py-4 font-medium">${booking.totalPrice}</td>
                        <td className="py-4">
                          <Badge className={`border-0 ${
                            booking.status === "confirmed" 
                              ? "bg-green-500/20 text-green-500"
                              : booking.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-semibold mb-6">User Management</h2>
              <p className="text-muted-foreground">User management features coming soon...</p>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-semibold mb-6">Platform Settings</h2>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
