import React, { useState, useEffect } from "react";
import { 
  BookingStatus, 
  PaymentMethod, 
  TourPackage, 
  HotelBooking, 
  CarRental, 
  Review, 
  BlogPost, 
  Booking, 
  GalleryItem, 
  SupportTicket 
} from "./types";
import { 
  INITIAL_TOURS, 
  INITIAL_HOTELS, 
  INITIAL_CARS, 
  INITIAL_BLOGS, 
  INITIAL_REVIEWS, 
  INITIAL_BOOKINGS, 
  INITIAL_GALLERY 
} from "./data";
import { SavannahMotionBackground } from "./components/SavannahMotionBackground";
import { BookingInvoiceReceipt } from "./components/BookingInvoiceReceipt";
import { EmailSimulator, SimulatedEmail, generateSimulatedEmailPayload } from "./components/EmailSimulator";
import { DashboardSuperAdmin } from "./components/DashboardSuperAdmin";
import { DashboardTourManager } from "./components/DashboardTourManager";
import { DashboardCustomerSupport } from "./components/DashboardCustomerSupport";
import { BackOfficeLogin } from "./components/BackOfficeLogin";
import {
  Sparkles,
  Compass,
  Tent,
  Car,
  FileText,
  Image as ImageIcon,
  Heart,
  Mail,
  Users,
  Search,
  BookOpen,
  DollarSign,
  Calendar,
  X,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Star,
  Phone,
  Video,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Send,
  Download
} from "lucide-react";

export default function App() {
  // Core Platform Database States
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [hotels, setHotels] = useState<HotelBooking[]>([]);
  const [cars, setCars] = useState<CarRental[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  
  // Custom Customer tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TCK-481",
      customerName: "Theresa Webb",
      customerEmail: "t.webb@gmail.com",
      message: "Is a Tanzanian tourist visa pre-arranged online or upon arrival in Arusha on general airfields?",
      status: "open",
      createdAt: "2026-05-22T10:00:00Z"
    }
  ]);

  // Outbound SMTP Email Logs & Local System Logs
  const [mailLogs, setMailLogs] = useState<SimulatedEmail[]>([]);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "2026-05-22 15:35:01 – Jioni Core Engine booting up secure transaction layer...",
    "2026-05-22 15:35:05 – Initialized Lemosho altitude routes mapping...",
    "2026-05-22 15:35:10 – Sync complete: 4 tours, 3 hotels, 2 cars cached.",
  ]);

  // Navigation states
  const [activeRole, setActiveRole] = useState<"customer" | "admin" | "manager" | "support">("customer");
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("jioni_staff_authed") === "true";
  });
  const [staffRole, setStaffRole] = useState<"admin" | "manager" | "support" | null>(() => {
    const role = localStorage.getItem("jioni_staff_role");
    return (role === "admin" || role === "manager" || role === "support") ? role : null;
  });
  const [activeSection, setActiveSection] = useState<"home" | "tours" | "hotels" | "cars" | "blog" | "gallery" | "reviews">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modal focus states
  const [selectedTourDetails, setSelectedTourDetails] = useState<TourPackage | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState<Booking | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<{ type: "tour" | "hotel" | "car"; id: string; name: string; price: number } | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle?: string; description?: string } | null>(null);
  
  // SMTP Panel Toggle
  const [isMailLogsOpen, setIsMailLogsOpen] = useState(false);

  // New Testimonial Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewCategory, setNewReviewCategory] = useState<"Tour" | "Hotel" | "Car" | "General">("General");
  const [newReviewTarget, setNewReviewTarget] = useState("");

  // Customer Inquiries Form State
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportText, setSupportText] = useState("");

  // Booking Checkout wizard states
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookGuests, setBookGuests] = useState(1);
  const [bookPaymentMethod, setBookPaymentMethod] = useState<PaymentMethod>(PaymentMethod.MPESA);
  const [bookSmsRef, setBookSmsRef] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  // Initialize and load from local storage
  useEffect(() => {
    const savedTours = localStorage.getItem("jioni_tours");
    const savedHotels = localStorage.getItem("jioni_hotels");
    const savedCars = localStorage.getItem("jioni_cars");
    const savedBlogs = localStorage.getItem("jioni_blogs");
    const savedReviews = localStorage.getItem("jioni_reviews");
    const savedBookings = localStorage.getItem("jioni_bookings");
    const savedGallery = localStorage.getItem("jioni_gallery");
    const savedTickets = localStorage.getItem("jioni_tickets");
    const savedMailLogs = localStorage.getItem("jioni_maillogs");

    if (savedTours) setTours(JSON.parse(savedTours));
    else {
      setTours(INITIAL_TOURS);
      localStorage.setItem("jioni_tours", JSON.stringify(INITIAL_TOURS));
    }

    if (savedHotels) setHotels(JSON.parse(savedHotels));
    else {
      setHotels(INITIAL_HOTELS);
      localStorage.setItem("jioni_hotels", JSON.stringify(INITIAL_HOTELS));
    }

    if (savedCars) setCars(JSON.parse(savedCars));
    else {
      setCars(INITIAL_CARS);
      localStorage.setItem("jioni_cars", JSON.stringify(INITIAL_CARS));
    }

    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    else {
      setBlogs(INITIAL_BLOGS);
      localStorage.setItem("jioni_blogs", JSON.stringify(INITIAL_BLOGS));
    }

    if (savedReviews) setReviews(JSON.parse(savedReviews));
    else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem("jioni_reviews", JSON.stringify(INITIAL_REVIEWS));
    }

    if (savedBookings) setBookings(JSON.parse(savedBookings));
    else {
      setBookings(INITIAL_BOOKINGS);
      localStorage.setItem("jioni_bookings", JSON.stringify(INITIAL_BOOKINGS));
    }

    if (savedGallery) setGalleryItems(JSON.parse(savedGallery));
    else {
      setGalleryItems(INITIAL_GALLERY);
      localStorage.setItem("jioni_gallery", JSON.stringify(INITIAL_GALLERY));
    }

    if (savedTickets) setTickets(JSON.parse(savedTickets));
    else {
      localStorage.setItem("jioni_tickets", JSON.stringify(tickets));
    }

    if (savedMailLogs) {
      setMailLogs(JSON.parse(savedMailLogs));
    } else {
      // Seed initial SMTP notifications
      const baseMails = generateSimulatedEmailPayload(
        "BK-8025",
        "Eleanor Vance",
        "eleanor.vance@yahoo.com",
        "Ngorongoro Crater Premium Obsidian Expedition",
        4900,
        "BANK TRANSFER",
        "TX_BANK_HB91207D",
        true,
        true
      );
      setMailLogs(baseMails);
      localStorage.setItem("jioni_maillogs", JSON.stringify(baseMails));
    }
  }, []);

  // Save State Utility helper
  const updateLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const notifySuccess = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const addSystemLog = (msg: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    setSystemLogs(prev => [`${timestamp} – ${msg}`, ...prev]);
  };

  // ==========================================
  // MARKETPLACE TRANSACTIONS & BOOKING WIZARD
  // ==========================================
  const handleInitiateCheckout = (type: "tour" | "hotel" | "car", item: any) => {
    const price = type === "tour" ? item.price : type === "hotel" ? item.pricePerNight : item.pricePerDay;
    setCheckoutItem({
      type,
      id: item.id,
      name: type === "tour" || type === "hotel" ? (item.title || item.name) : item.name,
      price
    });
    
    // Autofill simulated random reference so client doesn't get stuck typing
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    setBookSmsRef(`${bookPaymentMethod}_TXID${randomSuffix}`);
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutItem) return;

    if (!bookName || !bookEmail || !bookPhone || !bookDate || !bookSmsRef) {
      alert("Please fulfill all guest information and pay reference vectors!");
      return;
    }

    const totalCalculated = checkoutItem.price * bookGuests;
    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: newBookingId,
      bookingType: checkoutItem.type,
      itemId: checkoutItem.id,
      itemName: checkoutItem.name,
      amount: totalCalculated,
      customerName: bookName,
      customerEmail: bookEmail,
      customerPhone: bookPhone,
      bookingDate: bookDate,
      quantity: bookGuests,
      paymentMethod: bookPaymentMethod,
      smsReference: bookSmsRef,
      status: BookingStatus.PENDING,
      notes: bookNotes || undefined,
      pdfReceiptGenerated: false,
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    updateLocalStorage("jioni_bookings", updatedBookings);

    // Dynamic Outbound emails triggered
    const outgoingEmails = generateSimulatedEmailPayload(
      newBookingId,
      bookName,
      bookEmail,
      checkoutItem.name,
      totalCalculated,
      bookPaymentMethod,
      bookSmsRef,
      false,
      true
    );
    
    const updatedMails = [...outgoingEmails, ...mailLogs];
    setMailLogs(updatedMails);
    updateLocalStorage("jioni_maillogs", updatedMails);

    addSystemLog(`M-Money route triggered. Reservation ${newBookingId} generated under PENDING status.`);
    addSystemLog(`Outbox dispatched: SMTP notifications successfully queued for tourmanager@jionisafaris.com`);

    // Reset wizard
    setBookName("");
    setBookEmail("");
    setBookPhone("");
    setBookNotes("");
    setBookGuests(1);
    setCheckoutItem(null);

    notifySuccess(`Safaris request submitted and SMS logged! Tracking Reference: ${newBookingId}. Outbound confirmation emails sent to live mailbox logs.`);
  };

  // ==========================================
  // SUPER ADMIN WORKFLOWS (Payment & Auditing)
  // ==========================================
  const handleApprovePayment = (id: string, notes?: string) => {
    const matched = bookings.find(b => b.id === id);
    if (!matched) return;

    const updatedBookings = bookings.map(b => {
      if (b.id === id) {
        return { 
          ...b, 
          status: BookingStatus.APPROVED, 
          pdfReceiptGenerated: true,
          notes: notes ? `${b.notes || ""} [Admin Note: ${notes}]` : b.notes 
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    updateLocalStorage("jioni_bookings", updatedBookings);

    // Trigger Success Confirmation Email to Customer
    const approvalEmails = generateSimulatedEmailPayload(
      matched.id,
      matched.customerName,
      matched.customerEmail,
      matched.itemName,
      matched.amount,
      matched.paymentMethod,
      matched.smsReference,
      true, // APPROVED
      false // Is not a brand new booking
    );

    const updatedMails = [...approvalEmails, ...mailLogs];
    setMailLogs(updatedMails);
    updateLocalStorage("jioni_maillogs", updatedMails);

    addSystemLog(`LEDGER AUDIT: Secure administrative confirmation issued for Booking ${matched.id}`);
    addSystemLog(`Outbound dispatched: Boarding voucher with security pass details dispatched to ${matched.customerEmail}`);

    notifySuccess(`Voucher ${matched.id} verified! Digital receipt printed, email with PDF boarding instructions sent.`);
  };

  const handleRejectPayment = (id: string, reason?: string) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === id) {
        return { 
          ...b, 
          status: BookingStatus.REJECTED,
          notes: reason ? `${b.notes || ""} [Decline Reason: ${reason}]` : b.notes 
        };
      }
      return b;
    });
    setBookings(updatedBookings);
    updateLocalStorage("jioni_bookings", updatedBookings);

    addSystemLog(`LEDGER AUDIT: Transaction ${id} DECLINED. Flags raised for reference mismatch.`);
    notifySuccess(`Booking ${id} set to REJECTED. Security flags raised and customer notified.`);
  };

  // ==========================================
  // TOUR MANAGER WORKFLOWS (Pricing & Schedule Itineraries)
  // ==========================================
  const handleUpdateTourPrice = (id: string, newPrice: number) => {
    const updatedTours = tours.map(t => {
      if (t.id === id) {
        return { ...t, price: newPrice };
      }
      return t;
    });
    setTours(updatedTours);
    updateLocalStorage("jioni_tours", updatedTours);
    addSystemLog(`MAPPING CONTEXT: Price tariff modified for package ${id} to TSh ${newPrice.toLocaleString("en-TZ")}`);
  };

  const handleUpdateTourSchedule = (id: string, newSchedule: string[]) => {
    const updatedTours = tours.map(t => {
      if (t.id === id) {
        return { ...t, schedule: newSchedule };
      }
      return t;
    });
    setTours(updatedTours);
    updateLocalStorage("jioni_tours", updatedTours);
    addSystemLog(`MAPPING CONTEXT: Day schedules rewritten and formatted on local datastore for tour: ${id}`);
  };

  const handleUploadGalleryMedia = (item: { title: string; type: "photo" | "video" | "pdf"; url: string; pricingInfo?: string; scheduleInfo?: string }) => {
    const newMedia: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: item.title,
      type: item.type,
      url: item.url,
      pricingInfo: item.pricingInfo,
      scheduleInfo: item.scheduleInfo,
      uploadedBy: "Staff Broadcaster",
      createdAt: new Date().toISOString()
    };

    const updatedGallery = [newMedia, ...galleryItems];
    setGalleryItems(updatedGallery);
    updateLocalStorage("jioni_gallery", updatedGallery);

    addSystemLog(`BROADCASTER: Added ${item.type} media asset "${item.title}" to shared showcase.`);
  };

  const handleAddTourPackage = (newTour: TourPackage) => {
    const updated = [...tours, newTour];
    setTours(updated);
    updateLocalStorage("jioni_tours", updated);
    addSystemLog(`ADMIN STRATEGY: New premier safari package "${newTour.title}" successfully launched on shop front!`);
  };

  // ==========================================
  // CUSTOMER SUPPORT WORKFLOWS (Tickets & Testimonials)
  // ==========================================
  const handleReplyTicket = (id: string, response: string) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === id) {
        return { ...t, status: "closed" as const, response };
      }
      return t;
    });
    setTickets(updatedTickets);
    updateLocalStorage("jioni_tickets", updatedTickets);

    addSystemLog(`SUPPORT DESK: Closed Ticket ${id}. Response forwarded via simulated server SMTP SMTP relay.`);
  };

  const handleApproveReview = (id: string) => {
    const updatedReviews = reviews.map(r => {
      if (r.id === id) {
        return { ...r, approved: true };
      }
      return r;
    });
    setReviews(updatedReviews);
    updateLocalStorage("jioni_reviews", updatedReviews);

    addSystemLog(`MODERATOR: Approved client guest review ${id} for visual showcase grid on landing page.`);
  };

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    setReviews(updatedReviews);
    updateLocalStorage("jioni_reviews", updatedReviews);

    addSystemLog(`MODERATOR: Removed spam client guest review ${id} permanently.`);
  };

  // ==========================================
  // TESTIMONIAL SUBMISSION (CUSTOMER SIDE)
  // ==========================================
  const handleAddReviewFromCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      alert("Please enter your name and some feedback regarding your safari encounter.");
      return;
    }

    const brandReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      category: newReviewCategory,
      targetName: newReviewTarget || "General Safari Package",
      verified: true,
      approved: false, // Must be audited by Customer Support role
      date: new Date().toISOString().substring(0, 10)
    };

    const updatedReviews = [...reviews, brandReview];
    setReviews(updatedReviews);
    updateLocalStorage("jioni_reviews", updatedReviews);

    // Dynamic support alert on logs
    addSystemLog(`MODERATOR: Unaudited testimony submitted by ${newReviewAuthor}. Alerting Customer Support tab.`);

    setNewReviewAuthor("");
    setNewReviewComment("");
    setNewReviewTarget("");

    notifySuccess("Thank you! Your verified safari review was logged and queued for support team approval before showing publicly.");
  };

  // ==========================================
  // CUSTOMER INQUIRY TICKET SUBMISSION
  // ==========================================
  const handleAddSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportText) {
      alert("Please state your name, email, and travel inquiry.");
      return;
    }

    const brandTicket: SupportTicket = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      customerName: supportName,
      customerEmail: supportEmail,
      message: supportText,
      status: "open",
      createdAt: new Date().toISOString()
    };

    const updatedTickets = [...tickets, brandTicket];
    setTickets(updatedTickets);
    updateLocalStorage("jioni_tickets", updatedTickets);

    addSystemLog(`SUPPORT DESK: Brand new ticket ${brandTicket.id} filed by foreign explorer ${supportName}`);

    setSupportName("");
    setSupportEmail("");
    setSupportText("");

    notifySuccess("Inquiry logged successfully! The Jioni safaris crew team has received your ticket in the admin console.");
  };

  // ==========================================
  // SEO & FILTER UTILITIES
  // ==========================================
  const searchToursFiltered = tours.filter(t => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(query) || 
           t.description.toLowerCase().includes(query) || 
           t.duration.toLowerCase().includes(query);
  });

  const verifiedReviewsPublished = reviews.filter(r => r.approved);

  return (
    <div className="min-h-screen bg-[#071f0f] text-gray-100 selection:bg-[#e5a91a] selection:text-[#071f0f] font-sans relative pb-16" id="app-root-workspace">
      
      {/* Dynamic Floating Toast Alerts */}
      {successToast && (
        <div 
          className="fixed bottom-6 left-6 z-50 bg-[#0f3d20] text-white border-2 border-[#e5a91a] rounded-xl shadow-2xl p-4 max-w-md animate-[slide-up_0.3s_ease-out-fit]" 
          id="global-visual-alert-toast"
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#e5a91a] rounded-full p-1 text-black shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs uppercase tracking-widest text-[#e5a91a] block font-mono">System Notice Dispatch</strong>
              <p className="text-[11px] text-gray-200 mt-1 leading-relaxed">{successToast}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mail log handle */}
      <button
        onClick={() => setIsMailLogsOpen(!isMailLogsOpen)}
        className="fixed bottom-6 right-6 z-40 bg-[#e5a91a] text-black hover:bg-[#a8790c] shadow-2xl p-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group font-bold text-xs"
        title="View Outbound SMTP simulator log"
      >
        <Mail className="w-5 h-5 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out inline-block truncate">
          Mailroom ({mailLogs.length})
        </span>
      </button>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/255745110910?text=Habari%20Jioni%20Safaris!%20Ningependa%20kufanya%20mawasiliano%20kuhusu%20kupanga%20safari."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-40 bg-[#25D366] text-black hover:bg-[#1ebd53] hover:text-white shadow-2xl p-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-110 active:scale-95 group font-extrabold text-xs"
        title="Ongea nasi WhatsApp (0745110910)"
        id="floating-whatsapp-action"
      >
        <svg className="w-5 h-5 fill-current text-black group-hover:text-white transition-colors" viewBox="0 0 24 24">
          <path d="M12.004 0C5.372 0 0 5.372 0 12.004c0 2.116.55 4.18 1.596 6.002L0 24l6.135-1.61a11.956 11.956 0 005.867 1.615c6.63 0 12.002-5.372 12.002-12.004C24.004 5.372 18.63 0 12.004 0zm6.115 17.512c-.26.732-1.288 1.34-1.788 1.4-1.37.165-3.076-.328-5.06-1.12-2.126-.85-3.864-2.85-4.87-4.14-.1-.13-.76-.99-.76-1.89s.48-1.35.68-1.57c.2-.22.44-.28.58-.28.14 0 .28.01.4.01.12 0 .28-.05.44.33.16.39.56 1.37.61 1.48.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.12-.23.25-.1.47.13.22.58.95 1.24 1.54.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.1.2.08 1.27.6 1.49.71.22.11.37.17.42.26.06.09.06.52-.2 1.25z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out inline-block truncate">
          WhatsApp Chat
        </span>
      </a>

      {/* RENDER ACTIVE SMTP SCREEN */}
      <EmailSimulator 
        emails={mailLogs} 
        onClear={() => { setMailLogs([]); localStorage.setItem("jioni_maillogs", JSON.stringify([])); }}
        isOpen={isMailLogsOpen}
        onClose={() => setIsMailLogsOpen(false)}
      />

      {/* RENDER EXQUISITE DIGITAL VOUCHER MODAL */}
      {selectedBookingForReceipt && (
        <BookingInvoiceReceipt 
          booking={selectedBookingForReceipt} 
          onClose={() => setSelectedBookingForReceipt(null)}
        />
      )}

      {/* ROLES / STAFF SWITCHER BAR (Exquisite layout) */}
      <div className="bg-[#05140a] border-b border-[#e5a91a]/15 relative z-30 py-2.5 px-4" id="role-switcher-ribbon">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#e5a91a]" />
            <span className="text-[10px] uppercase tracking-widest text-gray-300 font-mono font-bold">Simulator Role Deck:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold">
            <button
              onClick={() => { setActiveRole("customer"); addSystemLog("View switched to customer landing showcase."); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeRole === "customer" ? "bg-[#e5a91a] text-black" : "bg-[#143d22]/50 text-gray-300 hover:text-white border border-[#e5a91a]/10"}`}
            >
              🌍 Traveller View
            </button>
            <button
              onClick={() => { setActiveRole("admin"); addSystemLog("View switched to Super Admin payment reconcile system."); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeRole === "admin" ? "bg-[#e5a91a] text-black" : "bg-[#143d22]/50 text-gray-300 hover:text-white border border-[#e5a91a]/10"}`}
            >
              👑 Super Admin Panel
            </button>
            <button
              onClick={() => { setActiveRole("manager"); addSystemLog("View switched to Tour Manager schedules portal."); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeRole === "manager" ? "bg-[#e5a91a] text-black" : "bg-[#143d22]/50 text-gray-300 hover:text-white border border-[#e5a91a]/10"}`}
            >
              🐆 Tour Manager Hub
            </button>
            <button
              onClick={() => { setActiveRole("support"); addSystemLog("View switched to Customer Support desk."); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeRole === "support" ? "bg-[#e5a91a] text-black" : "bg-[#143d22]/50 text-gray-300 hover:text-white border border-[#e5a91a]/10"}`}
            >
              ☎️ Support & reviews
            </button>
          </div>

          <div className="text-[10px] text-gray-300 font-mono flex items-center gap-3 leading-none">
            {isStaffAuthenticated && (
              <button
                onClick={() => {
                  setIsStaffAuthenticated(false);
                  setStaffRole(null);
                  localStorage.removeItem("jioni_staff_authed");
                  localStorage.removeItem("jioni_staff_role");
                  setActiveRole("customer");
                  addSystemLog("Staff manual sign-out executed. All secure sessions terminated.");
                  notifySuccess("Umetoka kwenye utawala kikamilifu. (Successfully logged out).");
                }}
                className="px-2 py-1 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
              >
                🚪 Ondoka (Log Out)
              </button>
            )}
            <div className="hidden md:flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Clock TZS: 2026-05-22 UTC</span>
            </div>
          </div>

        </div>
      </div>

      {/* CORE HEADER & BRANDING */}
      <header className="bg-[#0b2914] border-b border-[#e5a91a]/15 py-5 px-4 sticky top-0 z-20 backdrop-blur-md bg-opacity-95 shadow-xl" id="main-navigation-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* Brand Logo with Ngorongoro Gold aesthetics */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveSection("home"); setActiveRole("customer"); }}>
            <div className="bg-gradient-to-br from-[#ab4e24] via-[#e5a91a] to-[#f7d070] p-2 rounded-xl text-black font-semibold shadow-lg text-sm tracking-widest font-display flex items-center justify-center font-black">
              JS
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black font-display text-white tracking-widest">JIONI</span>
                <span className="text-lg font-bold font-display text-[#e5a91a] tracking-widest bg-[#e5a91a]/15 px-1.5 py-0.5 rounded border border-[#e5a91a]/20">SAFARIS</span>
              </div>
              <p className="text-[9px] text-[#f7d070] font-mono uppercase tracking-widest mt-0.5">Ngorongoro & Crater Luxury Expedition</p>
            </div>
          </div>

          {/* Client Navigation (Shows only if active role is Customer) */}
          {activeRole === "customer" && (
            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-gray-300 font-display">
              <button onClick={() => setActiveSection("home")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "home" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Home</button>
              <button onClick={() => setActiveSection("tours")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "tours" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Tour Packages</button>
              <button onClick={() => setActiveSection("hotels")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "hotels" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Hotel & Lodges</button>
              <button onClick={() => setActiveSection("cars")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "cars" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1 font-bold" : ""}`}>Car Rental</button>
              <button onClick={() => setActiveSection("blog")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "blog" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Blog</button>
              <button onClick={() => setActiveSection("gallery")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "gallery" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Showcase</button>
              <button onClick={() => setActiveSection("reviews")} className={`hover:text-[#e5a91a] transition-all cursor-pointer ${activeSection === "reviews" ? "text-[#e5a91a] border-b-2 border-[#e5a91a] pb-1" : ""}`}>Reviews</button>
            </nav>
          )}

          {/* Call action Button */}
          <div>
            {activeRole === "customer" ? (
              <button
                onClick={() => {
                  setActiveSection("tours");
                  notifySuccess("Please choose from our high-end packages below and click Book Expedition!");
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] text-white hover:brightness-110 text-xs uppercase tracking-wider rounded-lg transition-all font-bold font-display cursor-pointer shadow-lg"
              >
                Plan Journey
              </button>
            ) : (
              <div className="bg-[#143d22] border border-[#e5a91a]/30 text-[#e5a91a] text-[10px] font-mono px-3 py-1 bg-opacity-40 rounded uppercase font-bold">
                ⚠️ Back-Office Mode
              </div>
            )}
          </div>

        </div>
      </header>


      {/* MAIN CONTAINER PANEL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* =======================================================
            IF ACTIVE ROLE IS BACK-OFFICE STAFF AND NOT AUTHENTICATED
            ======================================================= */}
        {activeRole !== "customer" && !(isStaffAuthenticated && staffRole === activeRole) && (
          <div className="animate-fade-in py-4">
            <BackOfficeLogin 
              selectedRoleAtStart={activeRole}
              onLoginSuccess={(role) => {
                setIsStaffAuthenticated(true);
                setStaffRole(role);
                localStorage.setItem("jioni_staff_authed", "true");
                localStorage.setItem("jioni_staff_role", role);
                addSystemLog(`AUTHORIZATION: Staff session established successfully for role: ${role.toUpperCase()}`);
                notifySuccess(`Karibu! Umeingia kikamilifu kama ${role === "admin" ? "Msimamizi Mkuu" : role === "manager" ? "Mratibu wa Safari" : "Huduma kwa Wateja"}`);
              }}
              onCancel={() => {
                setActiveRole("customer");
                addSystemLog("Staff session request cancelled by user.");
              }}
            />
          </div>
        )}

        {/* =======================================================
            IF ACTIVE ROLE IS SUPER ADMIN (REQUIRES AUTHENTICATION)
            ======================================================= */}
        {activeRole === "admin" && isStaffAuthenticated && staffRole === "admin" && (
          <div className="animate-fade-in py-4">
            <div className="border border-white/5 bg-[#0a0a0c] p-5 rounded-2xl mb-6">
              <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase">Gateway Console Overview (Super Admin)</h2>
              <p className="text-xs text-gray-400 mt-1">Direct verification of tanzanian mobile ledger systems and official voucher outputs.</p>
            </div>
            <DashboardSuperAdmin 
              bookings={bookings}
              onApproveBooking={handleApprovePayment}
              onRejectBooking={handleRejectPayment}
              onShowReceipt={(b) => setSelectedBookingForReceipt(b)}
              systemLogs={systemLogs}
              tours={tours}
              galleryItems={galleryItems}
              onAddTourPackage={handleAddTourPackage}
              onUploadMedia={handleUploadGalleryMedia}
            />
          </div>
        )}

        {/* =======================================================
            IF ACTIVE ROLE IS TOUR MANAGER (REQUIRES AUTHENTICATION)
            ======================================================= */}
        {activeRole === "manager" && isStaffAuthenticated && staffRole === "manager" && (
          <div className="animate-fade-in py-4">
            <div className="border border-white/5 bg-[#0a0a0c] p-5 rounded-2xl mb-6">
              <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase font-bold">Safaris Tariffs & Media Control</h2>
              <p className="text-xs text-gray-400 mt-1">Upload files (Photos, schedules, YouTube promotionals) and edit package cost factors.</p>
            </div>
            <DashboardTourManager 
               tours={tours}
               galleryItems={galleryItems}
               onUpdateTourPrice={handleUpdateTourPrice}
               onUpdateTourSchedule={handleUpdateTourSchedule}
               onUploadMedia={handleUploadGalleryMedia}
            />
          </div>
        )}

        {/* =======================================================
            IF ACTIVE ROLE IS CUSTOMER SUPPORT (REQUIRES AUTHENTICATION)
            ======================================================= */}
        {activeRole === "support" && isStaffAuthenticated && staffRole === "support" && (
          <div className="animate-fade-in py-4">
            <div className="border border-white/5 bg-[#0a0a0c] p-5 rounded-2xl mb-6">
              <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase">Customer Engagement Moderation Desk</h2>
              <p className="text-xs text-gray-400 mt-1">Approve testimonials and answer tourist question tickets.</p>
            </div>
            <DashboardCustomerSupport 
              tickets={tickets}
              reviews={reviews}
              onReplyTicket={handleReplyTicket}
              onApproveReview={handleApproveReview}
              onDeleteReview={handleDeleteReview}
            />
          </div>
        )}


        {/* =======================================================
            IF ACTIVE ROLE IS TRAVELLER (CUSTOMER SHOWCASE)
            ======================================================= */}
        {activeRole === "customer" && (
          <div className="space-y-12">
            
            {/* 1. DYNAMIC HERO WITH LUXURY WILDLIFE MOTION BACKGROUND */}
            {activeSection === "home" && (
              <section className="relative min-h-[500px] rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center border border-[#e5a91a]/15" id="savannah-parallax-showcase">
                
                {/* Embed Savannah motion SVG backdrop */}
                <SavannahMotionBackground />

                {/* Parallax Overlay Glass Content Card */}
                <div className="relative z-10 max-w-2xl bg-black/50 backdrop-blur-[2px] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-[#e5a91a]/20 border border-[#e5a91a]/35 rounded-full px-3 py-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#f7d070]" />
                    <span className="text-[9px] uppercase tracking-widest text-[#faf7f0] font-mono font-bold">Tanzania Noble Wildlife Heritage</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white uppercase leading-tight">
                    JIONI <span className="text-[#e5a91a]">SAFARIS</span>
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed font-sans">
                    Fulfill your lifetime journey to the majestic amphitheater of Ngorongoro Crater and central Serengeti wild plains. 
                    Premium hospitality under private gold-gilded mobile canvas structures.
                  </p>

                  {/* Multi-category Dynamic search filter bar */}
                  <div className="bg-[#05140a] border border-[#e5a91a]/30 rounded-xl p-2.5 flex items-center shadow-lg mt-6">
                    <Search className="w-4 h-4 text-[#faf7f0]/70 mx-2" />
                    <input 
                      type="text" 
                      placeholder="Search Ngorongoro, Serengeti private camps, or car rentals..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-gray-400 font-sans"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="p-1 hover:text-white text-gray-500 text-xs">Clear</button>
                    )}
                  </div>
                  
                  <p className="text-[9px] text-gray-300 font-mono tracking-wider">
                    Instant online booking + mobile payments (M-Pesa, Tigo Pesa, Halopesa, Airtel)
                  </p>
                </div>
              </section>
            )}

            {/* 2. EXQUISITE SAFARIS & TOUR PACKAGES GRID */}
            {(activeSection === "home" || activeSection === "tours") && (
              <section className="space-y-6" id="tours-section-panel">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-[#e5a91a]/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">Select Expedition</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight mt-1">Tour Packages ({searchToursFiltered.length})</h2>
                  </div>
                  <span className="text-xs text-gray-300">All prices include local park levies and luxury field chefs</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchToursFiltered.map((tour) => (
                    <div 
                      key={tour.id} 
                      className="bg-[#0b2914] border border-[#e5a91a]/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#e5a91a]/30 transition-all flex flex-col justify-between group"
                    >
                      {/* Panoramic Header block */}
                      <div 
                        className="relative h-[200px] overflow-hidden select-none cursor-pointer group/img"
                        onClick={() => setLightboxImage({
                          url: tour.image,
                          title: tour.title,
                          subtitle: `${tour.duration} • Tour`,
                          description: tour.description
                        })}
                      >
                        <img 
                          src={tour.image} 
                          alt={tour.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-95 group-hover/img:brightness-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2914] via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="text-white text-[11px] bg-black/70 px-2.5 py-1 rounded-full border border-white/10 font-mono flex items-center gap-1">
                            🔍 Bofya Kukuza (Zoom Image)
                          </span>
                        </div>
                        
                        {/* Rating floating tag */}
                        <div className="absolute top-4 right-4 bg-black/60 border border-[#e5a91a]/30 rounded-md p-1.5 text-xs text-white flex items-center gap-1 backdrop-blur-sm font-mono font-bold z-10" onClick={(e) => e.stopPropagation()}>
                          <Star className="w-3.5 h-3.5 fill-[#e5a91a] text-[#e5a91a]" />
                          {tour.rating}
                        </div>
                      </div>

                      {/* Package contents */}
                      <div className="p-5 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#e5a91a] uppercase bg-[#e5a91a]/10 border border-[#e5a91a]/20 px-2 py-0.5 rounded">
                            {tour.duration}
                          </span>
                          <h3 className="text-sm font-bold text-white tracking-tight mt-2">{tour.title}</h3>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed max-w-md font-sans">
                          {tour.description}
                        </p>

                        <div className="pt-2 flex items-center gap-1.5 text-[10px] text-gray-300">
                          <Users className="w-3.5 h-3.5 text-[#e5a91a]" />
                          Featured naturalists: {tour.guidesAvailable.join(", ")}
                        </div>

                        {/* Interactive itinerary toggle details */}
                        {selectedTourDetails?.id === tour.id ? (
                          <div className="bg-[#071f0f] border border-[#e5a91a]/20 p-4 rounded-xl space-y-3 animate-fade-in mt-3 text-xs">
                            <strong className="text-[#e5a91a] uppercase tracking-wider text-[10px] font-mono block">Complete Day Itinerary:</strong>
                            <ol className="space-y-2 text-gray-200">
                              {tour.schedule.map((line, idx) => (
                                <li key={idx} className="border-l border-[#e5a91a]/30 pl-3 leading-relaxed">
                                  {line}
                                </li>
                              ))}
                            </ol>
                            <p className="text-[10px] text-gray-400 pt-1 border-t border-white/5 italic">
                              <strong>Pricing Policy:</strong> {tour.pricingDetails}
                            </p>
                          </div>
                        ) : null}

                        {/* Cost & buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                          <div>
                            <span className="text-[9px] text-gray-400 uppercase font-mono block">Premium rate</span>
                            <span className="text-base font-mono font-black text-white">
                              TSh {tour.price.toLocaleString("en-TZ")}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                               onClick={() => setSelectedTourDetails(selectedTourDetails?.id === tour.id ? null : tour)}
                               className="px-3 py-2 bg-[#071f0f] hover:bg-white/5 border border-[#e5a91a]/20 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {selectedTourDetails?.id === tour.id ? "Hide details" : "Show Itinerary"}
                            </button>
                            
                            <button
                              onClick={() => handleInitiateCheckout("tour", tour)}
                              className="px-4 py-2 bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] hover:brightness-110 text-white font-bold text-xs rounded-lg cursor-pointer shadow-lg transition-all"
                            >
                              Book Expedia
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. HOTEL & LODGES ACCOMMODATION LIST */}
            {(activeSection === "home" || activeSection === "hotels") && (
              <section className="space-y-6" id="hotels-section-panel">
                <div className="border-b border-[#e5a91a]/10 pb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">Lodges & Camps</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight mt-1">Crater Edge Villas & Private Canopy</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <div 
                      key={hotel.id} 
                      className="bg-[#0b2914] border border-[#e5a91a]/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#e5a91a]/25 transition-all flex flex-col justify-between group"
                    >
                      <div 
                        className="relative h-[160px] overflow-hidden cursor-pointer group/img"
                        onClick={() => setLightboxImage({
                          url: hotel.image,
                          title: hotel.name,
                          subtitle: `${hotel.location} • Lodge`,
                          description: hotel.description
                        })}
                      >
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-95 group-hover/img:brightness-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2914] via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="text-white text-[11px] bg-black/70 px-2.5 py-1 rounded-full border border-white/10 font-mono flex items-center gap-1">
                            🔍 Bofya Kukuza (Zoom Image)
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        <div>
                          <span className="text-[10px] text-[#faf7f0]/80 font-mono italic block">{hotel.location}</span>
                          <h3 className="text-xs font-bold text-white mt-1">{hotel.name}</h3>
                          <p className="text-[11px] text-gray-300 mt-2 leading-relaxed">
                            {hotel.description}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <strong className="text-[9px] uppercase font-mono tracking-wider text-[#e5a91a] block">Luxury Amenities:</strong>
                          <div className="flex flex-wrap gap-1 text-[9px] text-gray-200">
                            {hotel.amenities.map((a, i) => (
                              <span key={i} className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded capitalize">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <div>
                            <span className="text-[9px] text-gray-400 uppercase block">Per night</span>
                            <span className="text-sm font-mono font-black text-[#e5a91a]">TSh {hotel.pricePerNight.toLocaleString("en-TZ")}</span>
                          </div>
                          
                          <button
                            onClick={() => handleInitiateCheckout("hotel", hotel)}
                            className="px-3.5 py-1.5 bg-[#e5a91a]/15 text-[#e5a91a] hover:bg-[#e5a91a] hover:text-black font-semibold text-xs rounded transition-all cursor-pointer border border-[#e5a91a]/30"
                          >
                            Reserve Villa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. CAR RENTALS */}
            {(activeSection === "home" || activeSection === "cars") && (
              <section className="space-y-6" id="cars-section-panel">
                <div className="border-b border-[#e5a91a]/10 pb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">4x4 Fleet Specs</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight mt-1">Rugged Safari Offroad Cruisers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cars.map((car) => (
                    <div 
                      key={car.id} 
                      className="bg-[#0b2914] border border-[#e5a91a]/10 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-5 items-stretch hover:border-[#e5a91a]/20 transition-all"
                    >
                      <div 
                        className="w-full md:w-[40%] rounded-xl overflow-hidden select-none relative shrink-0 cursor-pointer group/img"
                        onClick={() => setLightboxImage({
                          url: car.image,
                          title: car.name,
                          subtitle: `${car.type} • Vehicle`,
                          description: `${car.description} (Equipped with standard off-road snorkel & private guidance)`
                        })}
                      >
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-full object-cover min-h-[140px] transition-all duration-750 group-hover:scale-110 filter brightness-95 group-hover/img:brightness-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="text-white text-[10px] bg-black/75 px-2 py-1 rounded-full border border-white/10 font-mono flex items-center gap-1">
                            🔍 Bofya Kukuza
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[9px] font-mono text-gray-300 capitalize bg-white/5 px-2 py-0.5 rounded">{car.type}</span>
                          <h3 className="text-xs font-bold text-white mt-1.5">{car.name}</h3>
                          <p className="text-[11px] text-gray-300 mt-2">{car.description}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-[#e5a91a] block">Vehicle modifications:</span>
                          <div className="flex flex-wrap gap-1 text-[9px] text-gray-300">
                            {car.features.map((f, i) => (
                              <span key={i} className="bg-white/5 px-1.5 py-0.5 rounded">✓ {f}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                          <div>
                            <span className="text-[9px] text-gray-400 uppercase block">Daily spec rate</span>
                            <span className="text-sm font-mono font-black text-[#e5a91a]">TSh {car.pricePerDay.toLocaleString("en-TZ")}</span>
                          </div>
                          <button
                            onClick={() => handleInitiateCheckout("car", car)}
                            className="px-3.5 py-1.5 bg-[#e5a91a] text-black hover:bg-[#a8790c] font-bold text-xs rounded transition-all cursor-pointer shadow-lg"
                          >
                            Rent Cruiser
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. TRAVEL BLOG & NGORONGORO SECRETS */}
            {(activeSection === "home" || activeSection === "blog") && (
              <section className="space-y-6" id="blog-section-panel">
                <div className="border-b border-[#e5a91a]/10 pb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">Savannah Diaries</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight mt-1">Tourism & Packing Guides</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((blog) => (
                    <article 
                      key={blog.id} 
                      className="bg-[#0b2914] border border-[#e5a91a]/10 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center cursor-pointer hover:border-[#e5a91a]/15 transition-all"
                      onClick={() => setSelectedArticle(blog)}
                    >
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] text-[#e5a91a] font-mono">
                          <span>{blog.date} • {blog.readTime}</span>
                          <span>By {blog.author}</span>
                        </div>
                        <h3 className="text-xs font-bold text-white hover:text-[#e5a91a] transition-all line-clamp-1">{blog.title}</h3>
                        <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                          {blog.summary}
                        </p>
                        <span className="text-[9px] font-mono text-[#e5a91a] hover:underline inline-flex items-center gap-1 font-bold">
                          Read full article <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* 6. MASONRY GALLERY (BROADCASTED PHOTOS, VIDEOS, PDFs ITINERARIES) */}
            {(activeSection === "home" || activeSection === "gallery") && (
              <section className="space-y-6" id="gallery-section-panel">
                <div className="border-b border-[#e5a91a]/10 pb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">Showcase Hub</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight mt-1">Official Safaris Media Broadcaster</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-[#0b2914] border border-[#e5a91a]/10 rounded-2xl overflow-hidden shadow-xl"
                    >
                      {/* Embeds Youtube frame if video, standard image otherwise */}
                      {item.type === "video" ? (
                        <div className="relative aspect-video bg-black">
                          <iframe 
                            src={item.url} 
                            title={item.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div 
                          className="relative h-[180px] overflow-hidden cursor-pointer group/img"
                          onClick={() => setLightboxImage({
                            url: item.url,
                            title: item.title,
                            subtitle: `${item.type} • Showcase`,
                            description: `${item.scheduleInfo || "Official Broadcast"} • ${item.pricingInfo || "Premium Access Provided"}`
                          })}
                        >
                          <img 
                            src={item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-95 group-hover/img:brightness-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="text-white text-[11px] bg-black/75 px-2.5 py-1 rounded-full border border-white/10 font-mono flex items-center gap-1">
                              🔍 Bofya Kukuza (Zoom Image)
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-white shrink-0 truncate max-w-[150px]">{item.title}</h4>
                          <span className="text-[9px] font-mono uppercase bg-[#e5a91a]/10 text-[#e5a91a] border border-[#e5a91a]/20 px-1.5 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>

                        {item.pricingInfo && (
                          <div className="text-[10px] text-gray-300">
                            <strong className="text-white">Price level:</strong> {item.pricingInfo}
                          </div>
                        )}

                        {item.scheduleInfo && (
                          <div className="text-[10px] text-gray-300">
                            <strong className="text-white">Plan details:</strong> {item.scheduleInfo}
                          </div>
                        )}

                        {item.type === "pdf" && (
                          <div className="pt-2">
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-full py-1.5 bg-white/5 hover:bg-[#e5a91a]/15 border border-[#e5a91a]/25 text-[#e5a91a] font-bold text-[10px] rounded-lg flex items-center justify-center gap-1.5 transition-all text-center"
                            >
                              <Download className="w-3 h-3" />
                              Download Plan Booklet (PDF)
                            </a>
                          </div>
                        )}

                        <div className="text-[8px] text-gray-400 font-mono text-right">
                          Published by: {item.uploadedBy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. VERIFIED TESTIMONIAL REVIEWS GRID & INPUT SUBMISSION */}
            {(activeSection === "home" || activeSection === "reviews") && (
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-white/5 pt-12" id="reviews-section-panel">
                
                {/* Visual grid list */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="border-b border-[#e5a91a]/10 pb-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#e5a91a]">Explorer Logs</span>
                    <h3 className="text-lg font-bold text-white font-display uppercase">Client Testimonials</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {verifiedReviewsPublished.map((rev) => (
                      <div key={rev.id} className="bg-[#0b2914] border border-[#e5a91a]/10 p-4 rounded-xl flex flex-col justify-between">
                        <div className="space-y-2">
                          {/* Stars */}
                          <div className="flex gap-0.5 text-[#e5a91a]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#e5a91a]" />
                            ))}
                          </div>

                          <p className="text-xs text-gray-300 italic leading-relaxed">
                            "{rev.comment}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.03] mt-3 flex justify-between items-center text-[9px] text-gray-300 font-mono">
                          <div>
                            <span className="text-white block font-bold">{rev.author}</span>
                            <span className="text-gray-400 block truncate max-w-[140px]">{rev.targetName}</span>
                          </div>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form to let user submit testimony */}
                <div className="bg-[#0b2914] border border-[#e5a91a]/10 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-display">Write Your Safari Testimony</h4>
                    <p className="text-[10px] text-gray-300 mb-4 pb-2 border-b border-white/5">
                      Share your genuine encounters in the Serengeti plains. Your review undergoes support moderation.
                    </p>

                    <form onSubmit={handleAddReviewFromCustomer} className="space-y-3 font-sans">
                      <div>
                        <label className="text-[9px] text-gray-400 block mb-0.5 uppercase font-mono">Your Pen Name & Country</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Liam Foster (Australia)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Category</label>
                          <select
                            value={newReviewCategory}
                            onChange={(e) => setNewReviewCategory(e.target.value as any)}
                            className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Tour">Tour Expedition</option>
                            <option value="Hotel">Lodge / Luxury Hotel</option>
                            <option value="Car">4x4 Offroader</option>
                            <option value="General">General Agency</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Rating Selection</label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white font-mono font-bold"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                            <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                            <option value={3}>⭐⭐⭐ (Fair)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Accommodations / Package Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Serengeti Mobile Canopy"
                          value={newReviewTarget}
                          onChange={(e) => setNewReviewTarget(e.target.value)}
                          className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Testimonial feedback</label>
                        <textarea 
                          rows={3}
                          required
                          placeholder="Describe the hospitality, wildlife encounters, or guide competency..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] hover:brightness-110 text-white font-black text-xs py-2 rounded transition-all cursor-pointer flex items-center justify-center gap-1 mt-4 shadow-lg"
                      >
                        Submit For Moderation
                      </button>
                    </form>
                  </div>
                </div>

              </section>
            )}

            {/* 8. HELP & CORRESPONDENCE TICKETING CENTRE (CUSTOMER SIDE) */}
            <section className="bg-gradient-to-br from-[#0b2914] to-[#071f0f] border border-[#e5a91a]/15 rounded-3xl p-6 sm:p-8" id="inquiry-form-section">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1 bg-[#e5a91a]/10 border border-[#e5a91a]/20 rounded-md p-1.5 text-[9px] text-[#f7d070] font-mono font-bold uppercase tracking-wider">
                    Assistance correspondency
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white uppercase">Consult Jioni Naturalists</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Have questions about the Wildebeest crossing cycles, weather configurations, custom safari layouts, or bank transfer routing codes? 
                    Submit an inquiry ticket — our certified naturalists will reply directly to your inbox.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Phone className="w-4 h-4 text-[#e5a91a]" />
                      <span>Mawasiliano (Arusha HQ Line): <strong className="text-white">255 711 0910</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Mail className="w-4 h-4 text-[#e5a91a]" />
                      <span>Email yetu (Correspondence): <strong className="text-white">kapugilo@gmail.com</strong></span>
                    </div>
                    
                    {/* Beautiful WhatsApp Button inline */}
                    <div className="pt-2">
                      <a 
                        href="https://wa.me/255745110910?text=Habari%20Jioni%20Safaris!%20Ningependa%20kufanya%20mawasiliano%20kuhusu%20kupanga%20safari." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd53] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg transform hover:scale-[1.02]"
                        id="whatsapp-contact-link"
                      >
                        <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                          <path d="M12.004 0C5.372 0 0 5.372 0 12.004c0 2.116.55 4.18 1.596 6.002L0 24l6.135-1.61a11.956 11.956 0 005.867 1.615c6.63 0 12.002-5.372 12.002-12.004C24.004 5.372 18.63 0 12.004 0zm6.115 17.512c-.26.732-1.288 1.34-1.788 1.4-1.37.165-3.076-.328-5.06-1.12-2.126-.85-3.864-2.85-4.87-4.14-.1-.13-.76-.99-.76-1.89s.48-1.35.68-1.57c.2-.22.44-.28.58-.28.14 0 .28.01.4.01.12 0 .28-.05.44.33.16.39.56 1.37.61 1.48.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.12-.23.25-.1.47.13.22.58.95 1.24 1.54.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.1.2.08 1.27.6 1.49.71.22.11.37.17.42.26.06.09.06.52-.2 1.25z"/>
                        </svg>
                        <span>WhatsApp (0745110910)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Interactive ticket form */}
                <form onSubmit={handleAddSupportTicket} className="bg-black/40 border border-[#e5a91a]/15 p-4 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] text-gray-400 block mb-0.5 uppercase font-mono">FullName</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Yuki Tanaka"
                        value={supportName}
                        onChange={(e) => setSupportName(e.target.value)}
                        className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-400 block mb-0.5 uppercase font-mono">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="your@email.com"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-gray-400 block mb-0.5 uppercase font-mono">Message / Inquiry</label>
                    <textarea 
                      rows={3} 
                      required
                      placeholder="e.g. What is the seasonal weather condition around Ngorongoro Crater Rim in mid-July?"
                      value={supportText}
                      onChange={(e) => setSupportText(e.target.value)}
                      className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] hover:brightness-110 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Travel Inquiry
                  </button>
                </form>

              </div>
            </section>

          </div>
        )}

      </main>

      {/* =======================================================
          INTERACTIVE CHECKOUT STEP / WIZARD OVER */}
      {checkoutItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" id="checkout-panel-overlay">
          <div className="relative w-full max-w-xl bg-[#0b2914] border border-[#e5a91a]/35 rounded-2xl overflow-hidden shadow-2xl animate-[scale-up_0.2s_ease-out]">
            
            {/* Ribbon gold header */}
            <div className="h-1.5 bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070]" />
            
            <div className="p-5 flex justify-between items-center border-b border-white/5">
              <div>
                <span className="text-[9px] uppercase font-mono text-[#e5a91a] tracking-widest block font-bold">Secure Marketplace checkout</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Reservation allocation booking Wizard</h3>
              </div>
              <button 
                onClick={() => setCheckoutItem(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteBooking} className="p-5 space-y-4">
              
              {/* Product Info Banner */}
              <div className="bg-[#071f0f] border border-[#e5a91a]/15 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[8px] font-mono text-gray-300 uppercase">Selected Asset</span>
                  <div className="text-xs font-bold text-white mt-0.5">{checkoutItem.name}</div>
                  <div className="text-[10px] text-gray-300 capitalize">Type: {checkoutItem.type} Booking</div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-gray-300 uppercase block">Base Multiplier</span>
                  <span className="text-xs font-mono font-bold text-[#e5a91a]">TSh {checkoutItem.price.toLocaleString("en-TZ")}</span>
                </div>
              </div>

              {/* Step 1: Guest Personal Info details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Guest Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Preferred Travel Date</label>
                  <input 
                    type="date" 
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Contact Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. eleanor@yahoo.com"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Contact Phone (International)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. +1-541-754-3010"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Pax selection & Payment provider selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-3">
                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Number of Guests / Nights / Days</label>
                  <select
                    value={bookGuests}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBookGuests(val);
                    }}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Pax / Quantity</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Mobile Mobile & Bank Provider</label>
                  <select
                    value={bookPaymentMethod}
                    onChange={(e) => {
                      const method = e.target.value as PaymentMethod;
                      setBookPaymentMethod(method);
                      
                      // Regenerate realistic mock SMS reference dynamically based on chosen provider
                      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
                      setBookSmsRef(`${method}_TXID${randomSuffix}`);
                    }}
                    className="w-full bg-[#071f0f] border border-[#e5a91a]/30 rounded p-2 text-xs text-[#e5a91a] font-mono font-black uppercase focus:outline-none"
                  >
                    <option value={PaymentMethod.MPESA}>🔴 m-pesa Vodacom</option>
                    <option value={PaymentMethod.TIGOPESA}>🔵 tigo Pesa</option>
                    <option value={PaymentMethod.HALOPESA}>🟠 Halopesa Halotel</option>
                    <option value={PaymentMethod.AIRTEL_MONEY}>🟡 Airtel Money</option>
                    <option value={PaymentMethod.BANK_TRANSFER}>🏦 Bank Wire (transfer)</option>
                  </select>
                </div>
              </div>

              {/* M-Money routing operational steps */}
              <div className="bg-[#071f0f] border border-[#e5a91a]/15 p-3 rounded-lg text-[10px] space-y-1.5 text-gray-200 font-sans">
                <strong className="text-white uppercase tracking-wider text-[9px] font-mono block">Payment Transfer Procedures:</strong>
                
                {bookPaymentMethod === PaymentMethod.MPESA && (
                  <p>Dial <strong className="text-white">*150*00#</strong> on your Vodacom handset, send <strong className="text-white">TSh {(checkoutItem.price * bookGuests).toLocaleString("en-TZ")}</strong> to Merchant till code <strong className="text-white">JS-9055</strong>, and paste the transaction reference message below.</p>
                )}
                {bookPaymentMethod === PaymentMethod.TIGOPESA && (
                  <p>Dial <strong className="text-white">*150*01#</strong> on your Tigo handset, transfer <strong className="text-white">TSh {(checkoutItem.price * bookGuests).toLocaleString("en-TZ")}</strong> to Merchant code <strong className="text-white">JS-TIGO-819</strong>, and paste the transaction reference message below.</p>
                )}
                {bookPaymentMethod === PaymentMethod.HALOPESA && (
                  <p>Dial <strong className="text-white">*150*88#</strong> on Halotel line, send <strong className="text-white">TSh {(checkoutItem.price * bookGuests).toLocaleString("en-TZ")}</strong> to Merch ID <strong className="text-white">HP-JS-802</strong>, and enter reference below.</p>
                )}
                {bookPaymentMethod === PaymentMethod.AIRTEL_MONEY && (
                  <p>Dial <strong className="text-white">*150*60#</strong> on Airtel line, choose Send Money to till code <strong className="text-white">JS-AIRTEL-41</strong>, and enter reference below.</p>
                )}
                {bookPaymentMethod === PaymentMethod.BANK_TRANSFER && (
                  <p>Wire transfer the total amount to JIONI SAFARIS LTD, Bank: <strong className="text-white">CRDB Bank Tanzania, Arusha Branch</strong>, A/C No: <strong className="text-amber-400">0150-7829-1002</strong>, Swift: <strong className="text-white">CRDBTZTZ</strong>. Input wire tracking sequence below.</p>
                )}
              </div>

              {/* Reference ID Inputs */}
              <div>
                <label className="text-[9px] text-[#e5a91a] block mb-0.5 uppercase font-mono font-bold">M-Cash SMS Receipt Reference ID (Autofilled Spec)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. MPESA_TXID831207"
                  value={bookSmsRef}
                  onChange={(e) => setBookSmsRef(e.target.value)}
                  className="w-full bg-[#071f0f] border border-[#e5a91a]/40 text-xs font-mono font-bold uppercase rounded p-2 text-yellow-300 focus:outline-none"
                />
              </div>

              {/* Special needs */}
              <div>
                <label className="text-[9px] text-gray-300 block mb-0.5 uppercase font-mono">Dietaries, medical needs or special desires (Optional)</label>
                <textarea 
                  rows={2} 
                  placeholder="e.g. Require low-altitude canvas bedding arrangement"
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  className="w-full bg-[#071f0f] border border-[#e5a91a]/25 rounded p-2 text-xs text-white placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-white/5 pt-3.5 flex justify-between items-center bg-[#071f0f] p-3 rounded-lg">
                <div>
                  <span className="text-[9px] text-gray-300 block">Total cost breakdown:</span>
                  <span className="text-[8px] text-gray-400 font-mono">Quantity: {bookGuests} * TSh {checkoutItem.price.toLocaleString("en-TZ")}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-300 uppercase block font-mono">Grand Total Sum</span>
                  <span className="text-sm font-mono font-black text-[#e5a91a]">
                    TSh {(checkoutItem.price * bookGuests).toLocaleString("en-TZ")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setCheckoutItem(null)} 
                  className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] hover:brightness-110 text-white font-bold text-xs rounded-lg cursor-pointer shadow-lg"
                >
                  Submit Payment Reference
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      {/* EXQUISITE VISUAL CORNER OF ARTICLE DIALOG POPUP */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="article-dialog">
          <div className="relative w-full max-w-2xl bg-[#0b2914] border border-[#e5a91a]/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-1.5 bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070] w-full" />
            
            <div className="relative h-[250px]">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2914] via-transparent to-transparent" />
              
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black rounded-full p-1.5 text-white cursor-pointer z-10"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-[#e5a91a] border-b border-[#e5a91a]/10 pb-3">
                <span>By {selectedArticle.author} • {selectedArticle.date}</span>
                <span className="bg-white/5 px-2.5 py-0.5 rounded-full">{selectedArticle.readTime}</span>
              </div>

              <h3 className="text-lg md:text-xl font-black font-display text-white uppercase tracking-tight">{selectedArticle.title}</h3>
              
              <p className="text-xs text-gray-300 leading-relaxed font-sans font-light select-text">
                {selectedArticle.content}
              </p>

              <div className="flex flex-wrap gap-1 pt-4 text-[9px] font-mono">
                {selectedArticle.tags.map((t, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#071f0f] border-t border-white/5 text-right rounded-b-2xl">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-gray-700 text-gray-300 hover:text-white rounded text-xs font-semibold cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}


      {/* EXQUISITE VISUAL LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in" 
          id="image-lightbox-modal"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-[#0b2914] border border-[#e5a91a]/30 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070] w-full" />
            
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black rounded-full p-2 text-[#e5a91a] hover:text-white border border-white/10 transition-all cursor-pointer shadow-lg"
              title="Funga (Close)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-3 bg-black/40 flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.title}
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-[#071f0f] border-t border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">{lightboxImage.title}</h3>
                {lightboxImage.subtitle && (
                  <span className="text-[9px] uppercase font-mono bg-[#e5a91a]/10 text-[#e5a91a] border border-[#e5a91a]/25 px-2.5 py-0.5 rounded-full font-bold self-start sm:self-auto">
                    {lightboxImage.subtitle}
                  </span>
                )}
              </div>
              {lightboxImage.description && (
                <p className="text-xs text-gray-300 font-sans leading-relaxed">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PLATFORM FOOTER */}
      <footer className="border-t border-white/5 bg-[#051a0d]/90 mt-16 py-12 px-4 text-xs" id="platform-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black font-display text-white tracking-widest">JIONI</span>
              <span className="text-sm font-bold font-display text-[#e5a91a] tracking-widest bg-[#e5a91a]/10 px-1 py-0.5 rounded">SAFARIS</span>
            </div>
            <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider leading-relaxed">
              Premium Tourism Showcase, booking marketplace & high altitude conservation agency.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-[#e5a91a] uppercase tracking-wider mb-3">Tanzania Gateways</h5>
            <ul className="space-y-1 text-gray-300 text-[11px]">
              <li>Serengeti Great Migration</li>
              <li>Ngorongoro Crater Floor</li>
              <li>Mount Kilimanjaro Summit</li>
              <li>Zanzibar Spice Island Shores</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#e5a91a] uppercase tracking-wider mb-3">Back-office Roles</h5>
            <ul className="space-y-1.5 text-gray-300 text-[11px] font-mono">
              <li className="cursor-pointer hover:underline text-[#e5a91a] font-sans font-bold flex items-center gap-1" onClick={() => setActiveRole("admin")}>
                🔒 Ingia Mfumo (Staff Login)
              </li>
              <li className="cursor-pointer hover:underline" onClick={() => setActiveRole("admin")}>Super Admin Console</li>
              <li className="cursor-pointer hover:underline" onClick={() => setActiveRole("manager")}>Tour Schedules Portal</li>
              <li className="cursor-pointer hover:underline" onClick={() => setActiveRole("support")}>Inquiry ticketing centre</li>
              <li className="cursor-pointer hover:underline" onClick={() => setIsMailLogsOpen(true)}>Outgoing SMTP Mail logs</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-[#e5a91a] uppercase tracking-wider">Ngorongoro Preservation</h5>
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
              Designed dynamically to align with wild nature preservation code of East Africa. All rights reserved © 2026.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
