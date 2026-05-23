import React, { useState } from "react";
import { TourPackage, GalleryItem } from "../types";
import { Edit3, Plus, Camera, Video, FileText, Settings, Sparkles, DollarSign, Calendar, Sliders, Check, HelpCircle, AlertCircle } from "lucide-react";

interface TourManagerProps {
  tours: TourPackage[];
  galleryItems: GalleryItem[];
  onUpdateTourPrice: (id: string, newPrice: number) => void;
  onUpdateTourSchedule: (id: string, newSchedule: string[]) => void;
  onUploadMedia: (item: { title: string; type: "photo" | "video" | "pdf"; url: string; pricingInfo?: string; scheduleInfo?: string }) => void;
}

export const DashboardTourManager: React.FC<TourManagerProps> = ({
  tours,
  galleryItems,
  onUpdateTourPrice,
  onUpdateTourSchedule,
  onUploadMedia
}) => {
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempSchedule, setTempSchedule] = useState<string>("");

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState<"photo" | "video" | "pdf">("photo");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadPriceInfo, setUploadPriceInfo] = useState("");
  const [uploadScheduleInfo, setUploadScheduleInfo] = useState("");
  
  // Feedback
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const handleStartEdit = (tour: TourPackage) => {
    setEditingTourId(tour.id);
    setTempPrice(tour.price);
    setTempSchedule(tour.schedule.join("\n"));
  };

  const handleSaveEdit = (id: string) => {
    onUpdateTourPrice(id, tempPrice);
    
    // Parse schedules back by new line splitting
    const parsedSchedule = tempSchedule.split("\n").filter(line => line.trim().length > 0);
    onUpdateTourSchedule(id, parsedSchedule);
    
    setEditingTourId(null);
    setUploadFeedback("Tour Package details updated in local storage database successfully!");
    setTimeout(() => setUploadFeedback(null), 3500);
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadUrl) {
      alert("Please designate a Title and Link URL/Path for your premium media asset!");
      return;
    }

    onUploadMedia({
      title: uploadTitle,
      type: uploadType,
      url: uploadUrl,
      pricingInfo: uploadPriceInfo || undefined,
      scheduleInfo: uploadScheduleInfo || undefined
    });

    setUploadTitle("");
    setUploadUrl("");
    setUploadPriceInfo("");
    setUploadScheduleInfo("");

    setUploadFeedback(`Successfully added premium media asset "${uploadTitle}" to Jioni Shared Gallery datastore!`);
    setTimeout(() => setUploadFeedback(null), 3500);
  };

  return (
    <div className="space-y-6" id="tour-manager-root">
      
      {/* Toast feedback nested */}
      {uploadFeedback && (
        <div className="bg-[#10b981]/15 border border-[#10b981]/30 p-3 rounded-xl text-emerald-400 text-xs flex items-center gap-2 mb-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{uploadFeedback}</span>
        </div>
      )}

      {/* Grid: Package Customizer & Media Uploader */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module A: Interactive Package customizer (Pricing & Schedules) */}
        <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl overflow-hidden shadow-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#e5a91a]" />
              Tariffs & Destination Schedules
            </h3>
            <p className="text-xs text-gray-350">Manage safari pricing, high-altitude levies, and step-by-step itineraries</p>
          </div>

          <div className="space-y-4">
            {tours.map((t) => (
              <div 
                key={t.id} 
                className={`border p-4 rounded-xl transition-all ${editingTourId === t.id ? "border-[#e5a91a] bg-[#071f0f]" : "border-white/5 bg-[#071f0f]/50"}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white font-sans">{t.title}</h4>
                    <p className="text-[10px] text-gray-300 mt-0.5">Duration: {t.duration} • Track: Lemosho/Seronera</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#e5a91a] font-mono font-bold block">
                      TSh {t.price.toLocaleString("en-TZ")}
                    </span>
                    <span className="text-[8px] text-gray-400 uppercase block mt-0.5">Base Fare</span>
                  </div>
                </div>

                {/* Edit Section toggler */}
                {editingTourId === t.id ? (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Standard Base Price (TSh)</label>
                        <div className="relative">
                          <span className="text-[10px] text-[#e5a91a] absolute left-2 top-2.5 font-bold">TSh</span>
                          <input 
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-full bg-[#1b1b22] border border-white/10 rounded px-2.5 py-1.5 pl-10 text-xs text-white focus:outline-none focus:border-[#e5a91a] font-mono"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-end">
                        <span className="text-[9px] text-gray-400 leading-relaxed font-sans">
                          *Adjusting prices updates the storefront booking checkout calculations in real-time.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Itinerary Schedules (One line per day)</label>
                      <textarea 
                        rows={5}
                        value={tempSchedule}
                        onChange={(e) => setTempSchedule(e.target.value)}
                        className="w-full bg-[#1b1b22] border border-white/10 rounded p-2.5 text-xs text-white font-sans focus:outline-none focus:border-[#e5a91a]"
                        placeholder="Day 1: Arrival details..."
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => setEditingTourId(null)}
                        className="px-3 py-1 bg-white/5 text-gray-300 hover:text-white rounded text-[10px]"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleSaveEdit(t.id)}
                        className="px-3 py-1 bg-[#e5a91a] text-black hover:bg-[#ae9148] font-bold rounded text-[10px] cursor-pointer"
                      >
                        Save Allocation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex justify-between items-center text-[10px] text-gray-400 pt-3 border-t border-white/[0.03]">
                    <span className="truncate max-w-[200px] text-gray-300 font-mono">
                      Itinerary lines count: {t.schedule.length}
                    </span>
                    <button
                      onClick={() => handleStartEdit(t)}
                      className="px-2.5 py-1 bg-[#071f0f] hover:bg-[#e5a91a]/10 text-white rounded flex items-center gap-1.5 transition-all cursor-pointer hover:text-[#e5a91a] border border-[#e5a91a]/10 hover:border-[#e5a91a]/30"
                    >
                      <Edit3 className="w-3 h-3" />
                      Configure Pricing & Schedule
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Module B: Interactive Asset Uploader (Photos, Videos, PDFs) */}
        <div className="bg-[#0b2914] border border-[#e5a91a]/20 rounded-xl overflow-hidden shadow-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-[#e5a91a]/20 p-1.5 rounded-lg border border-[#e5a91a]/30 text-[#e5a91a]">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">Premium Media Broadcaster</h3>
                <p className="text-xs text-gray-350">Broadcast package brochures (PDF), drone teasers (Video) & photos</p>
              </div>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-4 mt-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Asset Classification</label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as "photo" | "video" | "pdf")}
                    className="w-full bg-[#071f0f] border border-white/10 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                  >
                    <option value="photo">📸 Landscape Scenic Photo</option>
                    <option value="video">🎥 YouTube / Vimeo Drone Embed</option>
                    <option value="pdf">📄 PDF Tour Schedule / Booklet</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Asset Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Serengeti Great Valley Map Brochure"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Resource Link (URL or Placeholder Asset Path)</label>
                <input 
                  type="text"
                  required
                  placeholder={uploadType === "video" ? "e.g. https://www.youtube.com/embed/v9qM3Y02o_4" : uploadType === "pdf" ? "e.g. https://example.com/safari-itinerary.pdf" : "e.g. https://images.unsplash.com/photo-..."}
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  className="w-full bg-[#071f0f] border border-white/10 rounded px-2.5 py-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-3">
                <div>
                  <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Pricing Note Attachment (Optional)</label>
                  <input 
                    type="text"
                    placeholder="e.g. Includes peak season levy"
                    value={uploadPriceInfo}
                    onChange={(e) => setUploadPriceInfo(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-300 block mb-1 font-mono uppercase">Schedule Info Attachment (Optional)</label>
                  <input 
                    type="text"
                    placeholder="e.g., Weekly departure from Arusha Airport"
                    value={uploadScheduleInfo}
                    onChange={(e) => setUploadScheduleInfo(e.target.value)}
                    className="w-full bg-[#071f0f] border border-white/10 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5a91a]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#e5a91a] hover:bg-[#ae9148] text-black font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              >
                {uploadType === "photo" && <Camera className="w-4 h-4" />}
                {uploadType === "video" && <Video className="w-4 h-4" />}
                {uploadType === "pdf" && <FileText className="w-4 h-4" />}
                Publish Asset to Live Gallery
              </button>

            </form>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#e5a91a] mb-2.5">Live Media Asset Index</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
              <div className="p-2 border border-[#e5a91a]/15 bg-[#071f0f]/50 rounded-lg">
                <span className="text-white font-mono font-black block">{galleryItems.filter(i => i.type === "photo").length}</span>
                <span className="text-[8px] uppercase">Photos</span>
              </div>
              <div className="p-2 border border-[#e5a91a]/15 bg-[#071f0f]/50 rounded-lg">
                <span className="text-white font-mono font-black block">{galleryItems.filter(i => i.type === "video").length}</span>
                <span className="text-[8px] uppercase">Videos Link</span>
              </div>
              <div className="p-2 border border-[#e5a91a]/15 bg-[#071f0f]/50 rounded-lg">
                <span className="text-white font-mono font-black block">{galleryItems.filter(i => i.type === "pdf").length}</span>
                <span className="text-[8px] uppercase">PDF schedules</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
