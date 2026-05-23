/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum BookingStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export enum PaymentMethod {
  MPESA = "MPESA",
  TIGOPESA = "TIGOPESA",
  HALOPESA = "HALOPESA",
  AIRTEL_MONEY = "AIRTEL_MONEY",
  BANK_TRANSFER = "BANK_TRANSFER"
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  videoUrl?: string;
  description: string;
  schedule: string[]; // Step-by-step itineraries
  pricingDetails: string;
  featured: boolean;
  guidesAvailable: string[];
}

export interface HotelBooking {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
  featured: boolean;
}

export interface CarRental {
  id: string;
  name: string;
  type: "4x4 Safari Cruiser" | "Luxury Land Rover" | "Extended Overland Truck";
  pricePerDay: number;
  capacity: string;
  features: string[];
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  category: "Tour" | "Hotel" | "Car" | "General";
  targetName: string;
  verified: boolean;
  approved: boolean; // Managed by Customer Support / Admin
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  image: string;
  readTime: string;
  date: string;
  tags: string[];
}

export interface Booking {
  id: string;
  bookingType: "tour" | "hotel" | "car";
  itemId: string;
  itemName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  quantity: number; // e.g., people, nights, or days
  paymentMethod: PaymentMethod;
  smsReference: string; // reference string from mobile money or bank
  status: BookingStatus;
  notes?: string;
  assignedManager?: string;
  pdfReceiptGenerated: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: "photo" | "video" | "pdf";
  url: string; // can be youtube embed, image link, or pdf view path
  pricingInfo?: string;
  scheduleInfo?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  message: string;
  status: "open" | "responded" | "closed";
  response?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: string;
  read: boolean;
}
