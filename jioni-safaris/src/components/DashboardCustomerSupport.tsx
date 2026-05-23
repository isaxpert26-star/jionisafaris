import React, { useState } from "react";
import { Review, SupportTicket } from "../types";
import { MessageSquare, ThumbsUp, Check, X, ShieldAlert, BadgeHelp, CheckCircle } from "lucide-react";

interface CustomerSupportProps {
  tickets: SupportTicket[];
  reviews: Review[];
  onReplyTicket: (id: string, response: string) => void;
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

export const DashboardCustomerSupport: React.FC<CustomerSupportProps> = ({
  tickets,
  reviews,
  onReplyTicket,
  onApproveReview,
  onDeleteReview
}) => {
  const [ticketReplies, setTicketReplies] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleReplySubmit = (id: string) => {
    const reply = ticketReplies[id];
    if (!reply) return;
    onReplyTicket(id, reply);
    setTicketReplies({ ...ticketReplies, [id]: "" });
    setFeedback("Response dispatched and emailed to client successfully!");
    setTimeout(() => setFeedback(null), 3500);
  };

  const pendingReviews = reviews.filter(r => !r.approved);
  const activeTickets = tickets.filter(t => t.status !== "closed");

  return (
    <div className="space-y-6" id="customer-support-root">
      
      {feedback && (
        <div className="bg-[#10b981]/15 border border-[#10b981]/30 p-3 rounded-xl text-emerald-400 text-xs flex items-center gap-2 mb-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module A: Review Moderation Center */}
        <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl overflow-hidden shadow-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-[#e5a91a]" />
              Guest Testimonial Moderation ({pendingReviews.length})
            </h3>
            <p className="text-xs text-gray-300">Review newly submitted client logs before publishing live on home page</p>
          </div>

          <div className="space-y-4">
            {pendingReviews.length === 0 ? (
              <div className="p-8 text-center text-gray-405 text-xs font-sans">
                🟢 All inbound testimonials have been moderated. Empty queue.
              </div>
            ) : (
              pendingReviews.map((r) => (
                <div key={r.id} className="bg-[#071f0f]/50 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="font-bold text-white text-xs block">{r.author}</span>
                      <span className="text-[9px] text-[#e5a91a] font-mono capitalize">{r.category} Testimony • For: {r.targetName}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                      Pending Audit
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 italic">
                    "{r.comment}"
                  </p>

                  <div className="flex gap-2 justify-end pt-2 border-t border-white/[0.03]">
                    <button
                      onClick={() => onDeleteReview(r.id)}
                      className="px-2.5 py-1 text-red-400 hover:bg-red-500/10 text-[10px] rounded transition-all cursor-pointer font-semibold border border-red-500/20"
                    >
                      Decline & Trash
                    </button>
                    <button
                      onClick={() => onApproveReview(r.id)}
                      className="px-2.5 py-1 bg-[#e5a91a] text-black hover:bg-[#b59a54] text-[10px] font-bold rounded transition-all cursor-pointer"
                    >
                      Approve & Publish Live
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Module B: Client Support & Enquiries Ticket Queue */}
        <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl overflow-hidden shadow-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#e5a91a]" />
              Tourist Assistance Center ({activeTickets.length})
            </h3>
            <p className="text-xs text-gray-400">Handle general inquiries regarding Tanzania VISA requirements, flights, or bookings</p>
          </div>

          <div className="space-y-4 mt-4 flex-1 overflow-y-auto max-h-[350px]">
            {activeTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-405 text-xs font-sans">
                🎉 No open customer tickets. Great job!
              </div>
            ) : (
              activeTickets.map((t) => (
                <div key={t.id} className="bg-[#071f0f] border border-white/5 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <strong className="text-white block">{t.customerName}</strong>
                      <span className="text-[10px] text-gray-300 font-mono">{t.customerEmail}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-405">
                      ID: {t.id}
                    </span>
                  </div>

                  <p className="text-xs text-gray-350 bg-black/20 p-2.5 rounded border border-white/5">
                    "{t.message}"
                  </p>

                  {t.response ? (
                    <div className="text-[11px] text-[#e5a91a] bg-[#e5a91a]/5 p-2 rounded border border-[#e5a91a]/20">
                      <strong>Agency Reply:</strong> "{t.response}"
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2 border-t border-white/[0.03]">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Draft helpful support answer..."
                          value={ticketReplies[t.id] || ""}
                          onChange={(e) => setTicketReplies({ ...ticketReplies, [t.id]: e.target.value })}
                          className="flex-1 bg-[#1b1b22] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e5a91a]"
                        />
                        <button
                          onClick={() => handleReplySubmit(t.id)}
                          className="bg-[#e5a91a] text-black hover:bg-[#b0934d] font-bold text-xs px-3 rounded cursor-pointer transition-all"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
