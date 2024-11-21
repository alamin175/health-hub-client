"use client";
const DocButton = () => {
  const text = "TALK WITH AI DOCTOR • ".repeat(2); // Rotating text with separators

  return (
    <div className="fixed bottom-20 right-8 z-10 w-36 h-36 flex items-center justify-center">
      {/* Circular Button */}
      <div className="absolute z-10 w-24 h-24 bg-[#0E82FD] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
        <span className="text-white font-bold text-3xl">AI</span>
      </div>

      {/* Circular Text Animation */}
      <div className="absolute inset-0 w-full h-full circular-text-container">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M100,100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
              fill="none"
            />
          </defs>
          <text
            fill="#ff441c"
            fontWeight="bold"
            fontSize="14"
            letterSpacing="1.5"
          >
            <textPath xlinkHref="#circlePath" startOffset="0%" textLength="565">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Rotation Animation */}
      <style jsx>{`
        .circular-text-container {
          animation: rotate 15s linear infinite; /* Slower speed for readability */
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DocButton;
