// "use client";

// import React, { useState } from "react";
// import nlp from "compromise";

// // Extend Window interface to include SpeechRecognition types
// interface Window {
//   SpeechRecognition: any;
//   webkitSpeechRecognition: any;
// }

// // Event Interfaces
// interface SpeechRecognitionEvent extends Event {
//   results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   error: string;
// }

// const VoiceToText: React.FC = () => {
//   const [transcript, setTranscript] = useState<string>("");
//   const [listening, setListening] = useState<boolean>(false);

//   // Type for SpeechRecognition
//   const SpeechRecognition =
//     (window as any).SpeechRecognition ||
//     (window as any).webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     return <p>Your browser does not support speech recognition.</p>;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true; // Keep listening until stopped
//   recognition.interimResults = false; // Only finalized text
//   recognition.lang = "en-US"; // Language setting

//   // Function to correct grammar using Compromise
//   const correctGrammar = (text: string): string => {
//     const doc = nlp(text);
//     return doc.normalize().text(); // Automatically applies grammar corrections
//   };

//   const startListening = (): void => {
//     setListening(true);
//     recognition.start();
//   };

//   const stopListening = (): void => {
//     setListening(false);
//     recognition.stop();
//   };

//   recognition.onresult = (event: SpeechRecognitionEvent): void => {
//     const speechToText = Array.from(event.results)
//       .map((result) => result[0].transcript)
//       .join("");
//     const correctedText = correctGrammar(speechToText);
//     setTranscript(correctedText);
//   };

//   recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
//     console.error("Speech recognition error:", event.error);
//   };

//   return (
//     <div className="text-black m-10">
//       <h1>Voice to Text</h1>
//       <button
//         className="p-3 bg-orange-600 text-white font-bold rounded-md mr-3 m-6"
//         onClick={startListening}
//         disabled={listening}
//       >
//         Start Listening
//       </button>
//       <button
//         className="p-3 bg-orange-600 text-white font-bold rounded-md mr-3 m-6"
//         onClick={stopListening}
//         disabled={!listening}
//       >
//         Stop Listening
//       </button>
//       <p>
//         <strong>Transcript:</strong> {transcript}
//       </p>
//     </div>
//   );
// };

// export default VoiceToText;

"use client";

import React, { useState } from "react";
import nlp from "compromise";

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const VoiceToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">
          Your browser does not support speech recognition.
        </p>
      </div>
    );
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const correctGrammar = (text: string): string => {
    const doc = nlp(text);
    return doc.normalize().text();
  };

  const startListening = (): void => {
    setListening(true);
    recognition.start();
  };

  const stopListening = (): void => {
    setListening(false);
    recognition.stop();
  };

  const clearTranscript = (): void => {
    setTranscript("");
  };

  recognition.onresult = (event: SpeechRecognitionEvent): void => {
    const speechToText = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    const correctedText = correctGrammar(speechToText);
    setTranscript((prev) => `${prev} ${correctedText}`);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
    console.error("Speech recognition error:", event.error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Chat & Voice-to-Text
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`p-3 rounded-md text-white font-semibold ${
              listening
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={startListening}
            disabled={listening}
          >
            Start Listening
          </button>
          <button
            className={`p-3 rounded-md text-white font-semibold ${
              !listening
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={stopListening}
            disabled={!listening}
          >
            Stop Listening
          </button>
          <button
            className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
            onClick={clearTranscript}
          >
            Clear Transcript
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-inner h-64 overflow-y-auto">
          <p className="whitespace-pre-line">
            <strong className="text-gray-600">Transcript:</strong>
            {transcript || " Your text will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceToText;
