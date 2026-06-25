export interface PriceCard {
  id: string;
  title: string;
  price: number;
  description: string;
  note: string;
  image?: string;
}

export interface RestaurantConfig {
  name: string;
  city: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsEmbedUrl: string;
  mapsExternalUrl: string;
  hours: {
    closedDay: string;
    openDays: string;
    lunchTime: string;
    dinnerTime: string;
    daily?: { day: string; shifts: string[] }[];
  };
  cuisine: string;
  priceRange: string;
  areaServed: string[];
  prices: PriceCard[];
  instagramUrl?: string;
  facebookUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  notes?: string;
}

export enum OrderType {
  DELIVERY = "DELIVERY",
  TAKEAWAY = "TAKEAWAY",
}

export enum PaymentMethod {
  ONLINE = "ONLINE",
  CASH = "CASH",
}

export interface CheckoutDetails {
  type: OrderType;
  fullName: string;
  phone: string;
  email?: string;
  // For Delivery
  address?: string;
  city?: string;
  paymentMethod?: PaymentMethod;
  // For Takeaway
  pickupTime?: string;
  notes?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}


