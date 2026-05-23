import React, { useState } from "react";
import { Mail, ShieldAlert, Award, Inbox, Sparkles, Send, X, ExternalLink, Calendar, HelpCircle } from "lucide-react";

export interface SimulatedEmail {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  bodyHtml: string;
  receivedAt: string;
  category: "admin" | "customer";
  bookingId: string;
}

interface SimulatorProps {
  emails: SimulatedEmail[];
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailSimulator: React.FC<SimulatorProps> = ({ emails, onClear, isOpen, onClose }) => {
  const [selectedEmail, setSelectedEmail] = useState<SimulatedEmail | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "customer" | "admin">("all");

  const filtered = emails.filter(email => {
    if (activeFilter === "all") return true;
    return email.category === activeFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg bg-[#0b2914] border border-[#e5a91a]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] animate-[slide-up_0.3s_ease-out-fit]" id="email-simulator-panel">
      
      {/* Premium Header */}
      <div className="bg-[#071f0f] px-4 py-3 border-b border-[#e5a91a]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#e5a91a]/20 p-1.5 rounded-lg border border-[#e5a91a]/30 text-[#e5a91a]">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-display tracking-wider uppercase flex items-center gap-1.5">
              Jioni Mail Engine
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-gray-300">Live outbound SMTP notification log</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {emails.length > 0 && (
            <button 
              onClick={onClear}
              className="text-[10px] text-[#e5a91a] hover:underline font-semibold cursor-pointer"
            >
              Clear Logs
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Mail Framework Split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left mail column list */}
        <div className="w-[45%] border-r border-[#e5a91a]/10 overflow-y-auto flex flex-col bg-[#071f0f]">
          {/* Email category selector tabs */}
          <div className="flex border-b border-[#e5a91a]/10 text-[9px] font-bold">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`flex-1 py-2 text-center border-b transition-all cursor-pointer ${activeFilter === "all" ? "border-[#e5a91a] text-[#e5a91a]" : "border-transparent text-gray-450"}`}
            >
              All ({emails.length})
            </button>
            <button 
              onClick={() => setActiveFilter("customer")}
              className={`flex-1 py-2 text-center border-b transition-all cursor-pointer ${activeFilter === "customer" ? "border-[#e5a91a] text-[#e5a91a]" : "border-transparent text-gray-450"}`}
            >
              Customer
            </button>
            <button 
              onClick={() => setActiveFilter("admin")}
              className={`flex-1 py-2 text-center border-b transition-all cursor-pointer ${activeFilter === "admin" ? "border-[#e5a91a] text-[#e5a91a]" : "border-transparent text-gray-450"}`}
            >
              Admins
            </button>
          </div>

          {/* Email Item Row Loop */}
          {filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center text-gray-400">
              <Inbox className="w-8 h-8 opacity-30 mb-2" />
              <p className="text-[10px]">No outbound emails triggered yet.</p>
              <p className="text-[8px] text-gray-400 mt-1 leading-relaxed">Book a package to send live notification dispatches.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#e5a91a]/10 flex-1">
              {filtered.map((mail) => (
                <button
                  key={mail.id}
                  onClick={() => setSelectedEmail(mail)}
                  className={`w-full text-left p-2.5 transition-all text-xs block cursor-pointer ${selectedEmail?.id === mail.id ? "bg-[#e5a91a]/10 border-l-2 border-[#e5a91a]" : "hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <div className="flex justify-between items-center text-[9px] mb-0.5 text-gray-300 font-mono">
                    <span className="truncate max-w-[70px]">To: {mail.recipient.split("@")[0]}</span>
                    <span>{new Date(mail.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  </div>
                  <div className="font-bold text-gray-100 truncate pr-1">{mail.subject}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">
                    {mail.category === "admin" ? "⚠️ Admin Alert" : "✉️ Client Memo"} • Code: {mail.bookingId}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right mail screen detail */}
        <div className="w-[55%] flex flex-col bg-[#0b2914] overflow-y-auto">
          {selectedEmail ? (
            <div className="p-4 space-y-4 text-xs h-full flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="space-y-1 font-mono text-[10px] border-b border-[#e5a91a]/10 pb-2.5 mb-2">
                  <div><strong className="text-gray-400">From:</strong> <span className="text-[#e5a91a]">{selectedEmail.sender}</span></div>
                  <div><strong className="text-gray-400">To:</strong> <span className="text-white">{selectedEmail.recipient}</span></div>
                  <div><strong className="text-gray-400">Subject:</strong> <span className="text-[#e5a91a] font-sans font-bold">{selectedEmail.subject}</span></div>
                </div>

                {/* Email Body HTML renderer */}
                <div 
                  className="text-gray-300 text-[11px] leading-relaxed font-sans bg-[#071f0f] p-3 rounded-lg border border-[#e5a91a]/5 select-text overflow-x-hidden"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                />
              </div>

              {/* Verified seal */}
              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#e5a91a]" />
                  SMTP-Secure Pass
                </span>
                <span>ID: {selectedEmail.id}</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500">
              <Sparkles className="w-10 h-10 text-[#e5a91a]/30 mb-2 animate-bounce" />
              <p className="text-[11px] font-bold text-gray-405">Select an Email Dispatch</p>
              <p className="text-[9px] text-gray-400 max-w-xs mt-1 leading-relaxed">
                Click any dispatched record on the side panel to view real generated email structures.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// HELPER FUNCTION: Generator of premium HTML emails for the simulator lists
export const generateSimulatedEmailPayload = (
  bookingId: string,
  customerName: string,
  customerEmail: string,
  itemName: string,
  amount: number,
  paymentMethod: string,
  smsRef: string,
  isApproved: boolean,
  isNewBooking: boolean = false
): SimulatedEmail[] => {
  const timestamp = new Date().toISOString();
  const formatVal = "TSh " + new Intl.NumberFormat("en-TZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  const emails: SimulatedEmail[] = [];

  // 1. If it's a new booking, we must trigger:
  // A) Admin notification message
  // B) Customer pending receipt confirmation
  if (isNewBooking) {
    emails.push({
      id: `mail-adm-${Date.now()}-1`,
      sender: "alerts@jionisafaris.com",
      recipient: "tourmanager@jionisafaris.com",
      subject: `⚠️ [NEW BOOKING] ${bookingId} placed by ${customerName}`,
      category: "admin",
      bookingId,
      receivedAt: timestamp,
      bodyHtml: `
        <div style="font-family:sans-serif;color:#e5e7eb;">
          <h3 style="color:#e5a91a;border-bottom:1px solid #e5a91a;padding-bottom:5px;margin-top:0;">CRITICAL ADVISORY</h3>
          <p>A new tour and luxury hospitality booking is filed on the gateway. Immediate staff engagement required:</p>
          <ul style="padding-left:15px;line-height:1.6;">
            <li><strong>Booking Code:</strong> ${bookingId}</li>
            <li><strong>Client Name:</strong> ${customerName}</li>
            <li><strong>Selected Experience:</strong> ${itemName}</li>
            <li><strong>Amount Filed:</strong> ${formatVal}</li>
            <li><strong>Provider:</strong> ${paymentMethod.replace("_", " ")}</li>
            <li><strong>M-Money Ref Code:</strong> <span style="font-family:monospace;color:#e5a91a;font-weight:bold;">${smsRef}</span></li>
          </ul>
          <p style="font-size:10px;color:rgba(255,255,255,0.4)">Action Required: Log into the Jioni Safaris Tour Manager Dashboard to verify payment and issue formal approval signature.</p>
        </div>
      `
    });

    emails.push({
      id: `mail-client-${Date.now()}-2`,
      sender: "no-reply@jionisafaris.com",
      recipient: customerEmail,
      subject: `✈️ Jioni Safaris - Booking Favour Received (${bookingId})`,
      category: "customer",
      bookingId,
      receivedAt: timestamp,
      bodyHtml: `
        <div style="font-family:sans-serif;color:#d1d5db;">
          <h2 style="color:#e5a91a;margin-top:0;">Greeting from Arusha, ${customerName}!</h2>
          <p>We have successfully received your luxury tour reservation request for <strong>${itemName}</strong>.</p>
          <div style="background:#071f0f;border:1px solid #e5a91a;padding:12px;border-radius:6px;margin:15px 0;">
            <p style="margin:0 0 6px 0;"><strong>Reservation Status:</strong> <span style="color:#e5a91a;font-weight:bold;">PENDING PAYMENT AUDIT</span></p>
            <p style="margin:0;"><strong>Reference Submitted:</strong> <span style="font-family:monospace;color:#e5a91a;">${smsRef}</span></p>
          </div>
          <p>Our designated Tour Manager is actively reconciling your payment through <strong>${paymentMethod.replace("_", " ")}</strong>. You will receive an immediate boarding voucher and PDF invoice as soon as the ledger finishes confirmation.</p>
          <p>Thank you for choosing Jioni Safaris — The premier gateway to Ngorongoro crater conservation.</p>
        </div>
      `
    });
  }

  // 2. If it is an Approval transaction, trigger:
  // A) Customer booking Success notification with the security ticket
  if (isApproved && !isNewBooking) {
    emails.push({
      id: `mail-client-app-${Date.now()}-3`,
      sender: "bookings@jionisafaris.com",
      recipient: customerEmail,
      subject: `✅ [CONFIRMED VOUCHER] Jioni Safaris Official Acceptance - Code ${bookingId}`,
      category: "customer",
      bookingId,
      receivedAt: timestamp,
      bodyHtml: `
        <div style="font-family:sans-serif;color:#e5e7eb;">
          <h2 style="color:#10b981;margin-top:0;">PAYMENT VERIFIED & APPROVED</h2>
          <p>Congratulations, ${customerName}! Your payment of <strong>${formatVal}</strong> has been fully validated.</p>
          <p>Your luxury Tanzanian journey to <strong>${itemName}</strong> is now officially locked and ready for departure.</p>
          
          <div style="background:#071f0f;border:1.5px solid #e5a91a;padding:15px;border-radius:8px;margin:15px 0;text-align:center;">
            <span style="font-size:24px;font-family:monospace;letter-spacing:4px;color:#e5a91a;font-weight:bold;">${bookingId}</span>
            <p style="font-size:10px;color:#10b981;margin:6px 0 0 0;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Official Gate-Entry Voucher Code</p>
          </div>

          <p><strong>Next Steps:</strong></p>
          <ol style="padding-left:15px;line-height:1.6;">
            <li>Download your attached <strong>PDF Invoice Receipt</strong> to show at Arusha airport and safari gates.</li>
            <li>Pack elegant neutral safari layers (khaki/tan/green colors are ideal).</li>
            <li>Verify your private Maasai driver details available in your account.</li>
          </ol>
          <p style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:10px;font-size:10px;color:rgba(255,255,255,0.4);">This is high-altitude conservation approved document. Registration ID: Safaris-Tz-2026</p>
        </div>
      `
    });
  }

  return emails;
};
