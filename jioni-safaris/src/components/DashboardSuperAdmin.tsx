import React, { useState, useRef } from "react";
import { Booking, BookingStatus, PaymentMethod, TourPackage, GalleryItem } from "../types";
import { 
  DollarSign, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  Sliders, 
  Check, 
  Plus, 
  Camera, 
  Image as ImageIcon, 
  Compass, 
  Map, 
  Sparkles, 
  Layers, 
  Tv, 
  BadgeAlert, 
  Trash2, 
  Upload, 
  HardDriveUpload,
  Clock,
  X
} from "lucide-react";

interface SuperAdminProps {
  bookings: Booking[];
  onApproveBooking: (id: string, notes?: string) => void;
  onRejectBooking: (id: string, reason?: string) => void;
  onShowReceipt: (booking: Booking) => void;
  systemLogs: string[];
  
  // Back-office data states passed from App.tsx to support "kuweka baadhi ya vitu kama picha na kadhalika"
  tours: TourPackage[];
  galleryItems: GalleryItem[];
  onAddTourPackage: (tour: TourPackage) => void;
  onUploadMedia: (item: { title: string; type: "photo" | "video" | "pdf"; url: string; pricingInfo?: string; scheduleInfo?: string }) => void;
}

const PRESET_SAFARI_PHOTOS = [
  {
    name: "Serengeti Lions (Simba)",
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    category: "Wildlife"
  },
  {
    name: "Kilimanjaro Peak (Mlima)",
    url: "https://images.unsplash.com/photo-1589553460730-dfbeb39f298f?auto=format&fit=crop&w=1200&q=80",
    category: "Peaks"
  },
  {
    name: "Zanzibar Beaches (Pwani)",
    url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
    category: "Lodges"
  },
  {
    name: "Ngorongoro Crater (Zebras)",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    category: "Wildlife"
  },
  {
    name: "Maasai Plains & Culture",
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80",
    category: "Culture"
  }
];

export const DashboardSuperAdmin: React.FC<SuperAdminProps> = ({
  bookings,
  onApproveBooking,
  onRejectBooking,
  onShowReceipt,
  systemLogs,
  tours,
  galleryItems,
  onAddTourPackage,
  onUploadMedia
}) => {
  const [activeTab, setActiveTab] = useState<"ledgers" | "storefront" | "logs">("ledgers");
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [adminLightbox, setAdminLightbox] = useState<{ url: string; title: string; category?: string; extra?: string } | null>(null);

  // Notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // File Upload states - Simulated Local file
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Photo Catalog Upload states
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState<"Wildlife" | "Peaks" | "Culture" | "Lodges">("Wildlife");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPricingInfo, setPhotoPricingInfo] = useState("");
  const [photoScheduleInfo, setPhotoScheduleInfo] = useState("");

  // 2. Tour Package Creator states
  const [tourTitle, setTourTitle] = useState("");
  const [tourDuration, setTourDuration] = useState("");
  const [tourPrice, setTourPrice] = useState<number>(0);
  const [tourDescription, setTourDescription] = useState("");
  const [tourItinerary, setTourItinerary] = useState("");
  const [tourFeatured, setTourFeatured] = useState(true);
  const [tourImage, setTourImage] = useState("");

  // Reconcile and calculate revenues
  const totalVolume = bookings.reduce((acc, curr) => {
    if (curr.status === BookingStatus.APPROVED) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  const pendingVolume = bookings.reduce((acc, curr) => {
    if (curr.status === BookingStatus.PENDING) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);

  // Method specific collections
  const calculateByMethod = (method: PaymentMethod) => {
    return bookings
      .filter(b => b.paymentMethod === method && b.status === BookingStatus.APPROVED)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const mpesaRev = calculateByMethod(PaymentMethod.MPESA);
  const tigoRev = calculateByMethod(PaymentMethod.TIGOPESA);
  const haloRev = calculateByMethod(PaymentMethod.HALOPESA);
  const airtelRev = calculateByMethod(PaymentMethod.AIRTEL_MONEY);
  const bankRev = calculateByMethod(PaymentMethod.BANK_TRANSFER);

  // Filter pending or general
  const filteredBookings = bookings.filter(b => {
    if (filterPayment === "all") return true;
    if (filterPayment === "pending") return b.status === BookingStatus.PENDING;
    if (filterPayment === "approved") return b.status === BookingStatus.APPROVED;
    return b.paymentMethod === filterPayment;
  });

  const formatCurrency = (amount: number) => {
    return "TSh " + new Intl.NumberFormat("en-TZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  };

  const triggerFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Automated simulated photo uploader when file drops or is chosen
  const handleSimulateLocalUpload = () => {
    const randomSeed = PRESET_SAFARI_PHOTOS[Math.floor(Math.random() * PRESET_SAFARI_PHOTOS.length)];
    setPhotoUrl(randomSeed.url);
    if (!photoTitle) {
      setPhotoTitle(`Premier ${randomSeed.name}`);
    }
    triggerFeedback("Faili limepakiwa kwa mafanikio! (Simulated local file successfully parsed & premium safari image bound).");
  };

  const executePhotoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle) {
      alert("Tafadhali weka jina la picha!");
      return;
    }
    
    // Fallback if empty URL
    const finalUrl = photoUrl || PRESET_SAFARI_PHOTOS[0].url;

    onUploadMedia({
      title: photoTitle,
      type: "photo",
      url: finalUrl,
      pricingInfo: photoPricingInfo || undefined,
      scheduleInfo: photoScheduleInfo || undefined
    });

    triggerFeedback(`Picha "${photoTitle}" imewekwa kwenye duka la wasafiri!`);
    
    // Clear uploader fields
    setPhotoTitle("");
    setPhotoUrl("");
    setPhotoPricingInfo("");
    setPhotoScheduleInfo("");
  };

  const executeTourCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourTitle || !tourDuration || tourPrice <= 0) {
      alert("Tafadhali jaza jina la safari, muda na bei sahihi.");
      return;
    }

    const finalImage = tourImage || PRESET_SAFARI_PHOTOS[1].url;
    const parsedItinerary = tourItinerary 
      ? tourItinerary.split("\n").filter(line => line.trim().length > 0)
      : ["Siku ya 1: Arrival at JMT Kilimanjaro Airport", "Siku ya 2: Full game drive Serengeti National park", "Siku ya 3: Ngorongoro Conservation descent"];

    const brandNewTour: TourPackage = {
      id: `tour-${Date.now()}`,
      title: tourTitle,
      duration: tourDuration,
      price: tourPrice,
      rating: 5,
      image: finalImage,
      description: tourDescription || "Safariland noble excursion tailored securely by chief guides.",
      schedule: parsedItinerary,
      pricingDetails: "Includes entry conservation, 4x4 cruiser navigation, dynamic drivers and three hot wilderness dining protocols daily.",
      featured: tourFeatured,
      guidesAvailable: ["Bwana Eliud Shayo", "Bwana Jackson Mollel"]
    };

    onAddTourPackage(brandNewTour);
    triggerFeedback(`Kifurushi kipya cha safari "${tourTitle}" kimeundwa na kuwekwa sokoni!`);

    // Reset fields
    setTourTitle("");
    setTourDuration("");
    setTourPrice(0);
    setTourDescription("");
    setTourItinerary("");
    setTourImage("");
  };

  return (
    <div className="space-y-6" id="super-admin-root">
      
      {/* Dynamic Toast Feedback inside Component */}
      {successMsg && (
        <div className="bg-[#10b981]/15 border border-[#10b981]/45 p-4 rounded-xl text-emerald-400 text-xs flex items-center justify-between shadow-2xl animate-fade-in z-50">
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-sans font-semibold text-white">{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-gray-400 hover:text-white font-mono text-xs cursor-pointer">X</button>
        </div>
      )}

      {/* 1. Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Confirmed Revenue */}
        <div className="bg-[#0b2914] border border-[#e5a91a]/25 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[#e5a91a]/10 text-[#e5a91a] p-2 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e5a91a]">Kitabu Cha Mapato</p>
          <h3 className="text-2xl font-black text-white mt-1.5 font-mono">{formatCurrency(totalVolume)}</h3>
          <p className="text-[9px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            TSh Verified Safari Funds
          </p>
        </div>

        {/* Pending Auditing Volume */}
        <div className="bg-[#0b2914] border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 p-2 rounded-lg">
            <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-550">Malipo yanayosubiri</p>
          <h3 className="text-2xl font-black text-white mt-1.5 font-mono">{formatCurrency(pendingVolume)}</h3>
          <p className="text-[9px] text-amber-400 mt-2 font-mono">
            Awaiting manual SMS verification
          </p>
        </div>

        {/* Mobile Money counters */}
        <div className="bg-[#0b2914] border border-white/5 rounded-xl p-5 lg:col-span-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-300 mb-3">Tanzanian Providers Breakdown (Approved)</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-red-500/5 border border-red-500/20 p-2 rounded-lg">
              <span className="text-[9px] text-red-400 font-bold block">M-Pesa</span>
              <span className="font-mono text-white font-bold block mt-1">{formatCurrency(mpesaRev)}</span>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 p-2 rounded-lg">
              <span className="text-[9px] text-blue-400 font-bold block">Tigo Pesa</span>
              <span className="font-mono text-white font-bold block mt-1">{formatCurrency(tigoRev)}</span>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 p-2 rounded-lg">
              <span className="text-[9px] text-orange-400 font-bold block">Halopesa</span>
              <span className="font-mono text-white font-bold block mt-1">{formatCurrency(haloRev)}</span>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 p-2 rounded-lg">
              <span className="text-[9px] text-amber-400 font-bold block">Airtel</span>
              <span className="font-mono text-white font-bold block mt-1">{formatCurrency(airtelRev)}</span>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-2 rounded-lg col-span-2 sm:col-span-1">
              <span className="text-[9px] text-emerald-400 font-bold block">Bank Wire</span>
              <span className="font-mono text-white font-bold block mt-1">{formatCurrency(bankRev)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SELECTOR FOR SUPER ADMIN CONTROL */}
      <div className="flex border-b border-white/5 gap-2">
        <button
          onClick={() => setActiveTab("ledgers")}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "ledgers" 
              ? "border-[#e5a91a] text-white bg-[#071f0f]" 
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          📊 Uhakiki wa Fedha (Lodged Bookings)
        </button>
        <button
          onClick={() => setActiveTab("storefront")}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "storefront" 
              ? "border-[#e5a91a] text-white bg-[#071f0f]" 
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          🖼️ Meneja wa Matangazo (Weka Picha / Safari)
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === "logs" 
              ? "border-[#e5a91a] text-white bg-[#071f0f]" 
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          🛡️ Secure Telemetry Audit
        </button>
      </div>

      {/* ======================= TAB 1: BOOKING AND LEDGER AUDIT ======================= */}
      {activeTab === "ledgers" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Main Ledgers List Section */}
          <div className="lg:col-span-2 bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-[#071f0f] border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">Gateway Booking Ledger</h3>
                <p className="text-[11px] text-gray-300">Review SMS reference numbers and approve booking vouchers</p>
              </div>
              
              {/* Filter selectors */}
              <div className="flex gap-2">
                <select 
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="bg-[#071f0f] border border-white/10 text-[10px] px-2.5 py-1.5 rounded text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                >
                  <option value="all">All Statuses / Providers</option>
                  <option value="pending">⏳ Pending Verification</option>
                  <option value="approved">✅ Approved Vouchers</option>
                  <option value="MPESA">🔴 M-Pesa</option>
                  <option value="TIGOPESA">🔵 Tigo Pesa</option>
                  <option value="HALOPESA">🟠 Halopesa</option>
                  <option value="AIRTEL_MONEY">🟡 Airtel Money</option>
                  <option value="BANK_TRANSFER">🏦 Bank Wire</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-white/5 bg-[#071f0f]/40">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-gray-500 text-xs font-mono">
                  No reservation matched filters in secure cache database.
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div key={b.id} className="p-5 flex flex-col md:flex-row justify-between items-start gap-4 hover:bg-white/[0.01] transition-all">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#e5a91a] bg-[#e5a91a]/10 border border-[#e5a91a]/25 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        <span className="text-[10px] font-mono bg-white/5 text-gray-350 border border-white/10 px-2 py-0.5 rounded uppercase">
                          {b.paymentMethod.replace("_", " ")}
                        </span>
                        <span className="text-gray-400 text-xs font-bold">•</span>
                        <span className="text-xs text-white font-bold">{b.itemName}</span>
                        
                        {/* Status indicator badge */}
                        {b.status === BookingStatus.APPROVED ? (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded animate-pulse">
                            APPROVED
                          </span>
                        ) : b.status === BookingStatus.REJECTED ? (
                          <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">
                            REJECTED
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                            AWAITING SMS AUDIT
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-gray-300 font-sans pt-1">
                        <div><strong className="text-white">Customer:</strong> {b.customerName} ({b.customerEmail})</div>
                        <div><strong className="text-white">Phone:</strong> {b.customerPhone}</div>
                        <div><strong className="text-white">SMS Reference:</strong> <span className="font-mono text-amber-350 font-bold">{b.smsReference}</span></div>
                        <div><strong className="text-white">Booking Date:</strong> {b.bookingDate} ({b.quantity} Pax)</div>
                      </div>

                      {b.notes && (
                        <p className="text-[10px] text-[#e5a91a] bg-[#e5a91a]/5 border border-[#e5a91a]/10 p-2 rounded italic font-mono mt-2">
                          Client Memo: "{b.notes}"
                        </p>
                      )}
                    </div>

                    {/* Actions column */}
                    <div className="flex flex-col items-end gap-2 text-right justify-between self-stretch shrink-0">
                      <div className="font-mono text-sm font-black text-white">
                        Total: <span className="text-[#e5a91a]">{formatCurrency(b.amount)}</span>
                      </div>

                      <div className="flex gap-2 items-center mt-2 md:mt-0">
                        {b.status === BookingStatus.PENDING ? (
                          <div className="flex gap-1.5 items-center">
                            <input 
                              type="text" 
                              placeholder="Memo (e.g. Mpesa valid)" 
                              value={adminNotes[b.id] || ""}
                              onChange={(e) => setAdminNotes({...adminNotes, [b.id]: e.target.value})}
                              className="bg-[#071f0f] border border-white/10 text-[10px] px-2 py-1 rounded text-white focus:outline-none focus:border-[#e5a91a]"
                            />
                            <button
                              onClick={() => onApproveBooking(b.id, adminNotes[b.id])}
                              className="p-1 px-2.5 bg-[#e5a91a] hover:bg-[#ae9148] text-black font-bold text-[10px] rounded cursor-pointer transition-all"
                              title="Verify Payment & Approve Voucher"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                onRejectBooking(b.id, adminNotes[b.id]);
                              }}
                              className="p-1 px-2.5 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] rounded cursor-pointer transition-all"
                              title="Decline Booking Voucher"
                            >
                              Decline
                            </button>
                          </div>
                        ) : b.status === BookingStatus.APPROVED ? (
                          <button
                            onClick={() => onShowReceipt(b)}
                            className="px-2.5 py-1 bg-white/[0.03] hover:bg-white/10 text-white border border-white/10 text-[10px] font-semibold rounded flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#e5a91a]" />
                            Print Voucher Receipt
                          </button>
                        ) : (
                          <span className="text-[10px] text-red-400 italic font-mono">Disallowed Ledger</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Quick stats board */}
            <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl p-4 shadow-xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#e5a91a]" />
                Utawala - Quick Guidelines
              </h4>
              <p className="text-[10px] text-gray-300 leading-normal mb-3 font-sans">
                Review payments securely. Approving bookings automatically generates PDF receipts and sends email SMTP notifications.
              </p>
              
              <div className="space-y-2 text-[10px] font-mono">
                <div className="bg-[#071f0f] border border-white/5 p-2 rounded flex justify-between">
                  <span className="text-gray-300">Total Bookings Loaded:</span>
                  <span className="text-white font-bold">{bookings.length}</span>
                </div>
                <div className="bg-[#071f0f] border border-[#e5a91a]/15 p-2 rounded flex justify-between">
                  <span className="text-[#e5a91a]">Approved Safari Vouchers:</span>
                  <span className="text-emerald-400 font-bold">
                    {bookings.filter(b => b.status === BookingStatus.APPROVED).length}
                  </span>
                </div>
                <div className="bg-[#071f0f] border border-white/5 p-2 rounded flex justify-between">
                  <span className="text-amber-505">Pending SMS Audits:</span>
                  <span className="text-amber-400 font-bold">
                    {bookings.filter(b => b.status === BookingStatus.PENDING).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Preset Guide details */}
            <div className="bg-gradient-to-br from-[#0b2914] to-[#071f0f] border border-[#e5a91a]/10 rounded-xl p-4 text-[10px] text-gray-300 font-sans space-y-1">
              <span className="text-white font-bold block mb-1">Administrative Protocols:</span>
              <p>1. Ensure M-Pesa or Bank wire reference matches matches client SMS values perfectly.</p>
              <p>2. Decline transaction if SMS is suspicious or double-posted in active logs.</p>
            </div>
          </div>

        </div>
      )}

      {/* ======================= TAB 2: MATANGAZO NA UPKIAJI (WEKA PICHA/SAFARI) ======================= */}
      {activeTab === "storefront" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" id="storefront-manager-tab">
          
          {/* UPLOADER BLOCK - 1. WEKA PICHA YA GALLERY */}
          <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl p-5 sm:p-6 shadow-2xl space-y-5">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5a91a]/15 text-[#e5a91a] text-[10px] font-mono uppercase font-bold mb-1">
                <Camera className="w-3 h-3" />
                Matangazo Panel
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weka Picha Kwenye Maktaba (Add Gallery Photo)</h3>
              <p className="text-[11px] text-gray-300">Pakia picha nzuri za wanyama na vivutio, ambazo wasafiri wataziona kwenye kitengo cha "Showcase" au "Gallery" papo hapo.</p>
            </div>

            {/* Simulated Drag and Drop File Zone */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleSimulateLocalUpload(); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging 
                  ? "border-[#e5a91a] bg-[#071f0f]/50" 
                  : "border-white/10 hover:border-[#e5a91a]/55 hover:bg-[#071f0f]/30"
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => { if (e.target.files?.length) handleSimulateLocalUpload(); }} 
                className="hidden" 
                accept="image/*"
              />
              <div className="p-3 bg-white/5 rounded-full text-gray-400">
                <HardDriveUpload className="w-6 h-6 text-[#e5a91a]" />
              </div>
              <div>
                <span className="text-xs text-white font-bold block">Kokota na udondoshe Picha hapa au Bofya</span>
                <span className="text-[10px] text-gray-400 font-mono block mt-1">Sura za faili: PNG, JPG (Upeo 15MB)</span>
              </div>
            </div>

            {/* Photo preset shortcuts to quickly try premium landscapes */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Njia ya Haraka: Chagua Picha ya Mfano (Quick Presets)</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_SAFARI_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhotoUrl(p.url);
                      setPhotoTitle(p.name);
                      setPhotoCategory(p.category as any);
                      triggerFeedback(`Preset "${p.name}" imechaguliwa kama kiungo!`);
                    }}
                    className={`px-2 py-1 text-[9px] rounded-lg border transition-all cursor-pointer ${
                      photoUrl === p.url 
                        ? "bg-[#e5a91a] border-[#e5a91a] text-black font-bold" 
                        : "bg-[#071f0f] border-[#e5a91a]/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Form for photo upload */}
            <form onSubmit={executePhotoUpload} className="space-y-4 pt-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Jina la Picha (Photo Title) *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Serengeti Pride of Lions"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Kundi (Category)</label>
                  <select 
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as any)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a] font-mono text-[11px]"
                  >
                    <option value="Wildlife">Wildlife (Wanyamapori)</option>
                    <option value="Peaks">Peaks (Mlima & Horizons)</option>
                    <option value="Culture">Culture (Maasai & Utamaduni)</option>
                    <option value="Lodges">Lodges (Hoteli & Resorts)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Kiungo cha Picha (Image Link / URL)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-600 font-mono text-[10px] focus:outline-none focus:border-[#e5a91a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Taarifa ya bei (Onyesha bei hiari)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. From $420 per night"
                    value={photoPricingInfo}
                    onChange={(e) => setPhotoPricingInfo(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Muda / Ratiba msaada</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dec - March Season"
                    value={photoScheduleInfo}
                    onChange={(e) => setPhotoScheduleInfo(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#e5a91a] hover:bg-[#ae9148] text-black font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer font-mono flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Sajili na Weka Picha (Publish Media Image)
              </button>

            </form>
          </div>

          {/* PACKAGE CREATOR BLOCK - 2. WEKA SAFARI MPYA */}
          <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl p-5 sm:p-6 shadow-2xl space-y-5">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5a91a]/15 text-[#e5a91a] text-[10px] font-mono uppercase font-bold mb-1">
                <Compass className="w-3 h-3" />
                Premium Expeditions
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Anzisha Kifurushi Kipya cha Safari (Add Tour)</h3>
              <p className="text-[11px] text-gray-300">Jaza fomu hii kuongeza doria mpya na itineraries ambapo mgeni anaweza kuweka nafasi (Booking) na kulipia papo hapo.</p>
            </div>

            <form onSubmit={executeTourCreation} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Jina la Safari (Safari Package Title) *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Serengeti Luxury Sunset Odyssey"
                    value={tourTitle}
                    onChange={(e) => setTourTitle(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Muda (Duration)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 5 Days, 4 Nights"
                      value={tourDuration}
                      onChange={(e) => setTourDuration(e.target.value)}
                      className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Bei (Price TSh) *</label>
                    <input 
                      type="number" 
                      required
                      min={100}
                      value={tourPrice || ""}
                      onChange={(e) => setTourPrice(Number(e.target.value))}
                      className="w-full bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#e5a91a]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Picha ya Safari (Image URL / Preset Shortcut)</label>
                  <div className="flex gap-1.5 items-center">
                    <input 
                      type="text" 
                      placeholder="Pasting URL..."
                      value={tourImage}
                      onChange={(e) => setTourImage(e.target.value)}
                      className="flex-1 bg-[#071f0f] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[#e5a91a]"
                    />
                    <button
                      type="button"
                      onClick={() => setTourImage(PRESET_SAFARI_PHOTOS[Math.floor(Math.random() * PRESET_SAFARI_PHOTOS.length)].url)}
                      className="px-2.5 py-1.5 bg-[#071f0f] hover:bg-white/10 border border-white/10 text-[9px] text-white rounded font-mono font-bold cursor-pointer"
                      title="Generate random image link automatically"
                    >
                      🎨 Auto Link
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input 
                    type="checkbox" 
                    id="tourFeatured"
                    checked={tourFeatured}
                    onChange={(e) => setTourFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#e5a91a] focus:ring-[#e5a91a]"
                  />
                  <label htmlFor="tourFeatured" className="text-[11px] text-gray-300 select-none cursor-pointer">
                    Featured (Onyesha kwanza mwanzo wa ukurasa)
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Maelezo fupi ya Safari (Brief Description)</label>
                <textarea 
                  rows={2}
                  placeholder="Summarize the luxury adventure inclusions, key national parks visited..."
                  value={tourDescription}
                  onChange={(e) => setTourDescription(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Ratiba ya Kila Siku / Itinerary (Mfano: Moja kwa kila mstari)</label>
                <textarea 
                  rows={3}
                  placeholder="Siku ya 1: Kufika Kilimanjaro na mapumziko hoteli&#10;Siku ya 2: Kusafiri kwenda doria ya Serengeti National park&#10;Siku ya 3: Game drive kuangalia simba na chui"
                  value={tourItinerary}
                  onChange={(e) => setTourItinerary(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e5a91a] font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#ab4e24] to-[#e5a91a] hover:from-[#e5a91a] hover:to-[#f7d070] text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer font-mono flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Zindua Safari Mpya (Launch Safari Expedition)
              </button>

            </form>
          </div>

          {/* ACTIVE CONTENT PREVIEW LIST FOR VERIFICATION */}
          <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl p-5 lg:col-span-2 shadow-2xl space-y-6">
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Layers className="w-4 h-4 text-[#e5a91a]" />
                  Vivutio na Picha za Showcase Tovuti ({galleryItems.length})
                </h4>
                <span className="text-[10px] text-gray-405 font-mono italic">Bofya picha kuiona kwa ukubwa (Zoom)</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative group rounded-lg overflow-hidden border border-[#e5a91a]/10 bg-black/40 aspect-video cursor-pointer hover:border-[#e5a91a]/50 transition-all"
                    onClick={() => setAdminLightbox({
                      url: item.url,
                      title: item.title,
                      category: item.type,
                      extra: `${item.scheduleInfo || "Kwenye Showcase"} ${item.pricingInfo ? `• ${item.pricingInfo}` : ""}`
                    })}
                  >
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 z-10">
                      <span className="text-[8px] font-bold text-white truncate block">{item.title}</span>
                      <span className="text-[7px] text-[#e5a91a] font-mono block uppercase">{item.type} • {item.uploadedBy}</span>
                    </div>
                    {/* Hover status overlay */}
                    <div className="absolute inset-0 bg-[#e5a91a]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[8px] font-bold bg-black/90 text-[#e5a91a] px-2 py-1 rounded border border-[#e5a91a]/25 uppercase font-mono tracking-wider">
                        🔍 ZOOM PICHA
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-4 font-mono">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#e5a91a]" />
                  Vifurushi vya Safari (Tours) Vivyosajiliwa ({tours.length})
                </h4>
                <span className="text-[10px] text-gray-405 italic">Bofya kuona kitangazaji</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tours.map((t) => (
                  <div 
                    key={t.id} 
                    className="bg-[#071f0f]/50 border border-white/5 rounded-xl p-3 flex gap-3 cursor-pointer hover:border-[#e5a91a]/30 transition-all group animate-fade-in"
                    onClick={() => setAdminLightbox({
                      url: t.image,
                      title: t.title,
                      category: `${t.duration} • Tour Package`,
                      extra: `${t.description} | Bei: TSh ${t.price.toLocaleString("en-TZ")} | Guides: ${t.guidesAvailable.join(", ")}`
                    })}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                      <img 
                        src={t.image} 
                        alt={t.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[8px] font-mono text-[#e5a91a]/90 font-bold uppercase truncate max-w-[80px]">{t.duration}</span>
                        {t.featured && <span className="bg-[#e5a91a]/15 text-[#e5a91a] border border-[#e5a91a]/20 rounded text-[7px] px-1 font-mono uppercase font-bold">Featured</span>}
                      </div>
                      <h5 className="text-[10px] font-bold text-white truncate group-hover:text-[#e5a91a] transition-all leading-tight">{t.title}</h5>
                      <span className="text-[9px] font-mono font-black text-[#e5a91a] block">TSh {t.price.toLocaleString("en-TZ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================= TAB 3: SYSTEM AUDIT LOGS ======================= */}
      {activeTab === "logs" && (
        <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fade-in" id="telemetry-logs-tab">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#e5a91a]" />
              Secure Audit Trail
            </h4>
            <p className="text-[11px] text-gray-300">
              Cryptographic logging stream reflecting reservation allocations, payment confirmation, and gallery update logs securely stored in local storage memory buffers.
            </p>
          </div>

          <div className="bg-black/50 border border-[#e5a91a]/10 p-4 rounded-xl font-mono text-[10px] text-gray-300 space-y-2 h-[400px] overflow-y-auto leading-relaxed">
            {systemLogs.map((log, index) => (
              <div key={index} className="border-b border-white/[0.02] pb-2 last:border-0 flex items-start gap-3">
                <span className="text-[#e5a91a] select-none shrink-0 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#e5a91a]/70 shrink-0" />
                  {log.substring(0, 19)}
                </span>
                <span className="text-gray-200">{log.substring(21) || log}</span>
              </div>
            ))}
            {systemLogs.length === 0 && (
              <div className="text-center text-gray-650 pt-36">Initializing ledger telemetry buffers...</div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN LIGHTBOX MODAL */}
      {adminLightbox && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setAdminLightbox(null)}
        >
          <div className="relative max-w-3xl w-full bg-[#071f0f] border border-[#e5a91a]/30 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070] w-full" />
            
            <button 
              onClick={() => setAdminLightbox(null)}
              className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black rounded-full p-2 text-[#e5a91a] hover:text-white border border-white/10 transition-all cursor-pointer shadow-lg"
              title="Funga (Close)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-3 bg-black/40 flex items-center justify-center min-h-[250px] max-h-[60vh] overflow-hidden">
              <img 
                src={adminLightbox.url} 
                alt={adminLightbox.title}
                className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-[#0b2914] border-t border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">{adminLightbox.title}</h3>
                {adminLightbox.category && (
                  <span className="text-[9px] uppercase font-mono bg-[#e5a91a]/10 text-[#e5a91a] border border-[#e5a91a]/25 px-2.5 py-0.5 rounded-full font-bold self-start sm:self-auto">
                    {adminLightbox.category}
                  </span>
                )}
              </div>
              {adminLightbox.extra && (
                <p className="text-xs text-gray-305 font-sans leading-relaxed">{adminLightbox.extra}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
