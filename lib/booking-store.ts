import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Booking {
  id: string
  userId: string
  propertyId: string
  propertyName: string
  propertyType: 'hotel' | 'restaurant' | 'lodge' | 'cafe'
  propertyImage: string
  location: string
  checkIn?: string
  checkOut?: string
  date?: string
  time?: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: Date
  specialRequests?: string
}

interface BookingState {
  bookings: Booking[]
  currentBooking: Partial<Booking> | null
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => string
  updateBooking: (id: string, data: Partial<Booking>) => void
  cancelBooking: (id: string) => void
  getBookingById: (id: string) => Booking | undefined
  getUserBookings: (userId: string) => Booking[]
  setCurrentBooking: (booking: Partial<Booking> | null) => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [
        // Demo bookings
        {
          id: 'demo-1',
          userId: '1',
          propertyId: 'hotel-1',
          propertyName: 'Grand Horizon Hotel',
          propertyType: 'hotel',
          propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
          location: 'Paris, France',
          checkIn: '2026-03-25',
          checkOut: '2026-03-28',
          guests: 2,
          totalPrice: 1200,
          status: 'confirmed',
          createdAt: new Date('2026-03-10'),
        },
        {
          id: 'demo-2',
          userId: '1',
          propertyId: 'restaurant-1',
          propertyName: 'La Maison Gourmet',
          propertyType: 'restaurant',
          propertyImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
          location: 'Lyon, France',
          date: '2026-03-26',
          time: '19:30',
          guests: 2,
          totalPrice: 180,
          status: 'confirmed',
          createdAt: new Date('2026-03-12'),
        },
      ],
      currentBooking: null,

      addBooking: (booking) => {
        const id = `booking-${Date.now()}`
        const newBooking: Booking = {
          ...booking,
          id,
          createdAt: new Date(),
        }
        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }))
        return id
      },

      updateBooking: (id, data) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...data } : b
          ),
        }))
      },

      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'cancelled' } : b
          ),
        }))
      },

      getBookingById: (id) => {
        return get().bookings.find((b) => b.id === id)
      },

      getUserBookings: (userId) => {
        return get().bookings.filter((b) => b.userId === userId)
      },

      setCurrentBooking: (booking) => {
        set({ currentBooking: booking })
      },
    }),
    {
      name: 'luxestay-bookings',
    }
  )
)
