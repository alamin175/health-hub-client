"use client";
import dynamic from "next/dynamic";

const DynamicVoiceToText = dynamic(
  () => import("@/components/ML_Part/VoiceToText/VoiceToText"),
  { ssr: false } // Disable server-side rendering for this component
);

const AiDoctor = () => {
  return (
    <div>
      <DynamicVoiceToText />
    </div>
  );
};

export default AiDoctor;
