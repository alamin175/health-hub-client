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

const ChatVoiceAndText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const [conversation, setConversation] = useState<
    { sender: "User" | "AI"; message: string }[]
  >([]);

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
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

  const clearChat = (): void => {
    setTranscript("");
    setConversation([]);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!messageInput.trim()) return;

    const userMessage = messageInput.trim();
    setConversation((prev) => [
      ...prev,
      { sender: "User", message: userMessage },
    ]);
    setMessageInput("");

    // Simulate AI response (replace this with your actual AI API call)
    const aiResponse = await getAIResponse(userMessage);
    setConversation((prev) => [...prev, { sender: "AI", message: aiResponse }]);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Mock AI response (replace with real API integration)
    return `You asked: "${userMessage}". Here's some detailed AI information...`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg p-8 transform transition duration-500">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          AI Doctor
        </h1>

        {/* Chat Display */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner h-[500px] overflow-y-auto mb-6 space-y-4">
          {conversation.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-md ${
                  chat.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input and Controls */}
        <div className="flex flex-col space-y-4">
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-20 p-4 border text-black rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
          <div className="flex justify-between items-center">
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
            >
              📤 Send Message
            </button>
            <button
              onClick={clearChat}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
            >
              🧹 Clear Chat
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className={`p-4 w-40 rounded-lg text-white font-semibold shadow-lg transition duration-300 ${
                listening
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              }`}
              onClick={startListening}
              disabled={listening}
            >
              🎤 Start Voice
            </button>
            <button
              className={`p-4 w-40 rounded-lg text-white font-semibold shadow-lg transition duration-300 ${
                !listening
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              }`}
              onClick={stopListening}
              disabled={!listening}
            >
              🛑 Stop Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatVoiceAndText;
