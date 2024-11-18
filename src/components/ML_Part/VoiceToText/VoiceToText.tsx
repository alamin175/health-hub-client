"use client";

import React, { useState } from "react";
import nlp from "compromise";

// Extend Window interface to include SpeechRecognition types
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// Event Interfaces
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const VoiceToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);

  // Type for SpeechRecognition
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening until stopped
  recognition.interimResults = false; // Only finalized text
  recognition.lang = "en-US"; // Language setting

  // Function to correct grammar using Compromise
  const correctGrammar = (text: string): string => {
    const doc = nlp(text);
    return doc.normalize().text(); // Automatically applies grammar corrections
  };

  const startListening = (): void => {
    setListening(true);
    recognition.start();
  };

  const stopListening = (): void => {
    setListening(false);
    recognition.stop();
  };

  recognition.onresult = (event: SpeechRecognitionEvent): void => {
    const speechToText = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    const correctedText = correctGrammar(speechToText);
    setTranscript(correctedText);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
    console.error("Speech recognition error:", event.error);
  };

  return (
    <div className="text-black">
      <h1>Voice to Text</h1>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <p>
        <strong>Transcript:</strong> {transcript}
      </p>
    </div>
  );
};

export default VoiceToText;
