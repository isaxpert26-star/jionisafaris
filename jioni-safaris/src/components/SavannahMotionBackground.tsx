import React from "react";

export const SavannahMotionBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-[#030d06] via-[#071d0e] to-[#0f3d20]" id="savannah-motion-bg">
      {/* Golden Glowing Horizon Sun */}
      <div 
        className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#e5a91a]/20 via-[#ab4e24]/10 to-transparent blur-3xl opacity-70 animate-pulse" 
        style={{ animationDuration: "8s" }}
        id="savannah-glowing-gold-sun"
      />

      {/* Floating Sparkles / Golden Dust representing magical Serengeti nights */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 12;
          const duration = Math.random() * 10 + 8;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-[#e5a91a]/40"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${Math.random() * 70 + 10}%`,
                animation: `float-sparkle ${duration}s infinite linear`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Background Mountain Gradients (Simulates Ngorongoro Crater Rim Walls) */}
      <svg className="absolute bottom-0 w-full h-[220px] text-[#030e06] opacity-95" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <svg className="absolute bottom-0 w-full h-[160px] text-[#05170a]" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <path fill="currentColor" d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,229.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>

      {/* Foreground Savannah Soil Deck */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#071f0f] border-t border-[#e5a91a]/15" />

      {/* Premium Acacia Tree Silhouettes stand proudly */}
      <div className="absolute bottom-[60px] left-[5%] w-[180px] h-[190px] text-[#020904]/90 select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Detailed iconic African umbrella-shaped Acacia Trunk and flat crown */}
          <path 
            fill="currentColor" 
            d="M 50,95 L 49,70 Q 42,65 35,55 T 20,45 Q 15,48 5,46 T 3,42 Q 15,35 30,35 Q 35,38 43,45 T 48,55 L 51,55 Q 55,42 62,38 T 78,33 Q 85,38 95,36 T 97,42 Q 85,46 76,44 Q 65,48 57,60 L 53,95 Z" 
          />
          {/* Flat horizontal dense leafy crowns */}
          <ellipse cx="20" cy="40" rx="18" ry="4" fill="currentColor" />
          <ellipse cx="35" cy="42" rx="15" ry="3" fill="currentColor" />
          <ellipse cx="50" cy="50" rx="12" ry="3.5" fill="currentColor" />
          <ellipse cx="65" cy="38" rx="20" ry="4" fill="currentColor" />
          <ellipse cx="85" cy="37" rx="14" ry="3" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-[40px] right-[4%] w-[120px] h-[130px] text-[#020904]/90 select-none scale-x-[-1] opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            fill="currentColor" 
            d="M 50,95 L 49,70 Q 42,65 35,55 T 20,45 Q 15,48 5,46 T 3,42 Q 15,35 30,35 Q 35,38 43,45 T 48,55 L 51,55 Q 55,42 62,38 T 78,33 Q 85,38 95,36 T 97,42 Q 85,46 76,44 Q 65,48 57,60 L 53,95 Z" 
          />
          <ellipse cx="20" cy="40" rx="18" ry="4" fill="currentColor" />
          <ellipse cx="35" cy="42" rx="15" ry="3" fill="currentColor" />
          <ellipse cx="68" cy="36" rx="22" ry="5" fill="currentColor" />
        </svg>
      </div>

      {/* ANIMATED ANIMALS SILHOUETTES */}

      {/* 1. Graceful Giraffe (Walking across screen from right to left slowly) */}
      <div 
        className="absolute bottom-[65px] h-[85px] w-[50px] text-black/95 pointer-events-none opacity-80"
        style={{
          animation: "move-left-loop 38s infinite linear",
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full filter scale-x-[-1]">
          {/* Animated legs for walk cycle */}
          <g style={{ transformOrigin: "50px 70px" }}>
            {/* Body */}
            <path 
              fill="currentColor" 
              d="M 40,65 Q 45,55 58,58 Q 63,60 62,68 L 59,75 Q 48,78 40,70 Z" 
            />
            {/* Elegant long neck */}
            <path 
              fill="currentColor" 
              d="M 58,58 L 78,12 Q 80,10 83,12 T 82,18 Z" 
            />
            {/* Head & tiny ears/ossicones */}
            <path 
              fill="currentColor" 
              d="M 80,12 Q 85,12 88,15 L 82,18 Q 80,16 80,12 Z" 
            />
            <path fill="currentColor" d="M 81,8 Q 80,5 79,8 Z" />
            
            {/* Leg Front Left (Moving) */}
            <path 
              fill="currentColor" 
              d="M 58,74 L 62,98 L 60,115" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-[leg-swing-1_3s_infinite_ease-in-out]"
            />
            {/* Leg Front Right (Moving) */}
            <path 
              fill="currentColor" 
              d="M 56,74 L 54,96 L 52,115" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-[leg-swing-2_3s_infinite_ease-in-out]"
            />
            {/* Leg Rear Left */}
            <path 
              fill="currentColor" 
              d="M 43,68 L 41,92 L 39,114" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-[leg-swing-2_3s_infinite_ease-in-out]"
            />
            {/* Leg Rear Right */}
            <path 
              fill="currentColor" 
              d="M 41,68 L 45,91 L 44,114" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-[leg-swing-1_3s_infinite_ease-in-out]"
            />
            {/* Swaying thin tail */}
            <path 
              fill="currentColor" 
              d="M 40,70 C 37,73 35,78 35,84" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="animate-[tail-wag_1s_infinite_alternate_ease-in-out]"
            />
          </g>
        </svg>
      </div>

      {/* 2. Leaping Gazelle / Antelope (Rapid bouncing movement from left to right) */}
      <div 
        className="absolute bottom-[60px] h-[35px] w-[35px] text-[#e5a91a]/95 pointer-events-none"
        style={{
          animation: "move-right-leap-loop 14s infinite linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Gazelle outline */}
          <g className="animate-[gazelle-bound_1.2s_infinite_ease-in-out]">
            {/* Body */}
            <path fill="currentColor" d="M 30,45 Q 45,40 55,42 Q 60,45 58,52 L 48,58 Q 33,56 30,45 Z" />
            {/* Head and long horns pointing back */}
            <path fill="currentColor" d="M 55,42 L 67,25 L 69,27 T 64,36 Z" />
            {/* Horns */}
            <path fill="currentColor" d="M 64,25 Q 67,10 65,5 Q 64,10 61,23 Z" stroke="currentColor" strokeWidth="0.5" />
            {/* Elegant legs folded during jump */}
            <path d="M 33,54 L 28,70 L 22,78" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 55,50 L 59,68 L 62,75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Tail */}
            <path d="M 30,45 L 25,48" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* 3. Lioness on patrol (Wandering quietly with head low in far background shadow) */}
      <div
        className="absolute bottom-[63px] h-[32px] w-[55px] text-[#020904] pointer-events-none opacity-95"
        style={{
          animation: "move-left-slow-loop 48s infinite linear",
          animationDelay: "4s"
        }}
      >
        <svg viewBox="0 0 120 70" className="w-full h-full">
          <g>
            {/* Sleek low body */}
            <path fill="currentColor" d="M 30,35 Q 60,30 80,33 Q 92,36 90,44 L 85,50 Q 55,54 30,48 Z" />
            {/* Head looking forward cautiously */}
            <path fill="currentColor" d="M 85,34 Q 93,31 98,34 T 96,44 Q 92,44 86,40 Z" />
            {/* Ears */}
            <path fill="currentColor" d="M 91,32 Q 92,27 94,30 Z" />
            {/* Legs walking */}
            <path d="M 33,48 L 30,62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-[leg-swing-1_1.5s_infinite_ease-in-out]" />
            <path d="M 40,48 L 42,62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-[leg-swing-2_1.5s_infinite_ease-in-out]" strokeOpacity="0.8" />
            <path d="M 82,45 L 85,61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-[leg-swing-2_1.5s_infinite_ease-in-out]" />
            <path d="M 86,45 L 83,61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-[leg-swing-1_1.5s_infinite_ease-in-out]" strokeOpacity="0.8" />
            {/* Tail with standard curved tuft */}
            <path d="M 30,37 Q 15,36 10,48" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="48" r="1.5" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* 4. Flock of Birds Soaring High in 'V' formation */}
      <div className="absolute top-[12%] right-[10%] w-[150px] h-[60px] pointer-events-none opacity-60">
        <div className="relative w-full h-full">
          {[...Array(4)].map((_, i) => {
            const delay = i * 0.3;
            const size = 10 - i * 1.5;
            const top = i * 12 + 10;
            const left = i * 22;
            return (
              <svg 
                key={i} 
                viewBox="0 0 24 24" 
                className="absolute text-[#e5a91a] animate-[bird-flap_1s_infinite_alternate_ease-in-out]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}px`,
                  left: `${left}px`,
                  animationDelay: `${delay}s`,
                }}
              >
                <path 
                  fill="currentColor" 
                  d="M12,18C8,15 2,12 1,11C2,10.5 4,11 6,12.5C9,14.5 11,16 12,16C13,16 15,14.5 18,12.5C20,11 22,10.5 23,11C22,12 16,15 12,18Z"
                />
              </svg>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for fluid wildlife movement keyframes */}
      <style>{`
        @keyframes float-sparkle {
          0% {
            transform: translateY(100px) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-500px) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }

        /* Standard screen loops */
        @keyframes move-left-loop {
          0% {
            transform: translateX(110vw);
          }
          100% {
            transform: translateX(-150px);
          }
        }

        @keyframes move-left-slow-loop {
          0% {
            transform: translateX(110vw);
          }
          100% {
            transform: translateX(-100px);
          }
        }

        @keyframes move-right-leap-loop {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(110vw);
          }
        }

        /* Leg walk cycles */
        @keyframes leg-swing-1 {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes leg-swing-2 {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-12deg); }
        }

        @keyframes tail-wag {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(10deg); }
        }

        /* Gazelle jumping bounce arc */
        @keyframes gazelle-bound {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }

        /* High soar bird wing cycle */
        @keyframes bird-flap {
          0% {
            transform: scaleY(0.4) rotate(-3deg);
          }
          100% {
            transform: scaleY(1.3) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};
