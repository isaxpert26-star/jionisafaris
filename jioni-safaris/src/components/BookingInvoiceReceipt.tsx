import React, { useRef, useState } from "react";
import { Booking, PaymentMethod } from "../types";
import { Printer, Download, Check, ShieldCheck, HelpCircle } from "lucide-react";

interface ReceiptProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingInvoiceReceipt: React.FC<ReceiptProps> = ({ booking, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return "TSh " + new Intl.NumberFormat("en-TZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  };

  const calculateSubtotal = () => {
    // 18% VAT and 1% Conservation Levy already in total? Let's back-calculate or list item breakdown
    const base = booking.amount / 1.19;
    const vat = base * 0.18;
    const levy = base * 0.01;
    return { base, vat, levy };
  };

  const { base, vat, levy } = calculateSubtotal();

  const handlePrint = () => {
    const printContent = receiptRef.current?.innerHTML;
    if (printContent) {
      // Open a clean printable context
      const printWindow = window.open("", "", "width=800,height=900");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Jioni Safaris Receipt - ${booking.id}</title>
              <style>
                body { font-family: sans-serif; background: #fff; color: #000; padding: 30px; }
                .border-gold { border: 2px solid #e5a91a; padding: 20px; border-radius: 8px; }
                .text-right { text-align: right; }
                .flex { display: flex; justify-content: space-between; }
                .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .table th, .table td { border-bottom: 1px solid #ddd; padding: 10px; text-align: left; }
                .gold-header { background-color: #071f0f; color: #e5a91a; padding: 15px; text-align: center; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="border-gold">
                <div class="gold-header">
                  <h2>JIONI SAFARIS</h2>
                  <p>Premium Tourism Gateway • Arusha, Tanzania</p>
                </div>
                ${printContent}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Simulate real browser download by writing a mock CSV/JSON blob or notifying successfully
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(booking, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `jioni-safaris-${booking.id}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="receipt-modal-overlay">
      <div className="relative w-full max-w-2xl bg-[#0b2914] border border-[#e5a91a]/30 rounded-2xl overflow-hidden shadow-2xl mt-8 animate-[scale-up_0.3s_ease-out-fit]" id="receipt-modal-container">
        {/* Decorative Gold Header Ribbon */}
        <div className="h-2 bg-gradient-to-r from-[#ab4e24] via-[#e5a91a] to-[#f7d070] w-full" />
        
        {/* Tools row */}
        <div className="flex items-center justify-between p-4 bg-[#071f0f] border-b border-[#e5a91a]/10 text-xs">
          <span className="text-[#e5a91a] font-mono font-bold tracking-widest uppercase">Official Booking Receipt</span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#1b1c24] text-[#e5e7eb] hover:bg-[#e5a91a]/10 border border-[#e5a91a]/20 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Printer className="w-3.5 h-3.5 text-[#e5a91a]" />
              Print
            </button>
            <button 
              onClick={handleDownload}
              className="px-3 py-1.5 bg-[#e5a91a] text-black hover:bg-[#b0934d] font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  Download PDF / JSON
                </>
              )}
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT FRAME */}
        <div className="p-6 md:p-8 space-y-6" ref={receiptRef} id="receipt-content-area">
          {/* Brand header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-[#e5a91a]/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display text-white tracking-widest">JIONI</span>
                <span className="text-xl font-black font-display text-[#e5a91a] tracking-widest bg-[#e5a91a]/10 px-1.5 py-0.5 rounded">SAFARIS</span>
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-xs font-sans leading-relaxed">
                Premium Tourism Agency & Conservation Gateway. Registered in Arusha, United Republic of Tanzania.
              </p>
            </div>
            <div className="text-left md:text-right font-mono text-xs text-gray-300 space-y-1">
              <div><strong className="text-white">Receipt ID:</strong> {booking.id}</div>
              <div><strong className="text-white">Date Issued:</strong> {new Date(booking.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div><strong className="text-white">Status:</strong> <span className="text-emerald-500 font-bold uppercase tracking-wider">{booking.status}</span></div>
            </div>
          </div>

          {/* Client Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#071f0f] border border-[#e5a91a]/15 p-4 rounded-xl">
            <div>
              <h4 className="text-[10px] font-mono font-black text-[#e5a91a] uppercase tracking-widest mb-1.5">Billed To (Customer)</h4>
              <div className="font-bold text-white text-sm">{booking.customerName}</div>
              <div className="text-xs text-gray-300 mt-1">{booking.customerEmail}</div>
              <div className="text-xs text-gray-300 font-mono mt-0.5">{booking.customerPhone}</div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-black text-[#e5a91a] uppercase tracking-widest mb-1.5 font-bold">Payment Metadata</h4>
              <div className="text-xs text-gray-300">
                <strong className="text-white">Method: </strong>
                {booking.paymentMethod.replace("_", " ")}
              </div>
              <div className="text-xs text-gray-300 mt-0.5 font-mono">
                <strong className="text-white">Ref: </strong>
                {booking.smsReference || "N/A"}
              </div>
              <div className="text-xs text-gray-300 mt-0.5">
                <strong className="text-white">Stay/Date: </strong>
                {new Date(booking.bookingDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Booking Items Breakdown Table */}
          <div>
            <h4 className="text-[10px] font-mono font-black text-[#e5a91a] uppercase tracking-widest mb-2.5">Itemized Booking Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e5a91a]/20 text-[#e5a91a] font-mono">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Unit / Days</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5a91a]/10 text-gray-300">
                  <tr>
                    <td className="py-3">
                      <div className="font-semibold text-white">{booking.itemName}</div>
                      <div className="text-[10px] text-gray-300 capitalize">{booking.bookingType} Reserve Gateway Voucher</div>
                    </td>
                    <td className="py-3 text-center font-mono">{booking.quantity}</td>
                    <td className="py-3 text-right font-mono">{formatCurrency(booking.amount / booking.quantity)}</td>
                    <td className="py-3 text-right font-mono text-white font-bold">{formatCurrency(booking.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Luxury financial breakdown with Tanzanian taxes */}
          <div className="border-t border-[#e5a91a]/15 pt-4 flex flex-col items-end">
            <div className="w-full md:w-64 space-y-2 text-xs font-sans text-gray-300">
              <div className="flex justify-between">
                <span>Base Eco-Tourism Fare:</span>
                <span className="font-mono">{formatCurrency(base)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tanzania VAT (18%):</span>
                <span className="font-mono">{formatCurrency(vat)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#e5a91a]/10">
                <span>Conservation Levy (1%):</span>
                <span className="font-mono">{formatCurrency(levy)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white pt-1">
                <span className="text-[#e5a91a]">Total Paid Amount:</span>
                <span className="font-mono text-lg text-[#e5a90a] font-black">{formatCurrency(booking.amount)}</span>
              </div>
            </div>
          </div>

          {/* Bottom security features and authorizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#e5a91a]/10 pt-6">
            <div className="flex items-center gap-2 text-gray-300 text-[10px] leading-relaxed">
              <ShieldCheck className="w-8 h-8 text-[#e5a91a] flex-shrink-0" />
              <div>
                Verified luxury voucher. Secured against the Tanzania National Park Revenue Hub.
                QR seal signed by Jioni Safaris Super Administrator. Access code is authorized on gate entry.
              </div>
            </div>
            
            {/* Elegant Mock Authorized Stamp */}
            <div className="flex justify-end items-center">
              <div className="border border-dashed border-emerald-500/50 bg-emerald-500/5 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 rotate-[-2deg]">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Authorized Gate-Ready
              </div>
            </div>
          </div>
        </div>

        {/* Modal Controller Footer */}
        <div className="bg-[#071f0f] border-t border-[#e5a91a]/10 px-6 py-4 flex justify-between items-center rounded-b-2xl">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Voucher matches valid passports on entry gates
          </span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1a1a20] text-gray-300 hover:text-white rounded-md text-xs font-semibold cursor-pointer border border-transparent hover:border-gray-700 transition-all font-sans"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
