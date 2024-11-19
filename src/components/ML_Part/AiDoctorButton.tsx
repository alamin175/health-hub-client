"use client";
import ReactCurvedText from "react-curved-text";
import React, { useEffect, useRef } from "react";
// import "./AiDoctorButton.css"; // Import the CSS file for animation

const AiDoctorButton = () => {
  const textPathRef = useRef(null);

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 1) % 100;
      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offset}%`);
      }
    }, 50); // Adjust speed by changing the interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "120px",
        right: "120px",
        zIndex: 100,
        cursor: "pointer",
      }}
      onClick={() => alert("AI Doctor Button Clicked!")}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle Path */}
        <path
          id="curve"
          d="M50,150 A100,100 0 1,1 150,150"
          fill="transparent"
        />
        {/* Text Along Path */}
        <text fontSize="12" fill="#0070f3">
          <textPath ref={textPathRef} href="#curve" startOffset="0%">
            AI Doctor - Click Me!
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default AiDoctorButton;
