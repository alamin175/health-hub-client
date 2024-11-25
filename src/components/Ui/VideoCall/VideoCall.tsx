"use client";

import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Button, Stack, Typography, Box } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
  const [startVideoCall, setStartVideoCall] = useState(false);

  const router = useRouter();

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_VIDEO_CALL_APP_ID || "test", // Replace 'test' with your App ID
    channel: videoCallingId, // Unique channel ID
    token: null, // Use a valid token in production
    enableAudio: true, // Enable audio
    videoEncoderConfig: {
      width: 1920, // Full HD resolution
      height: 1080,
      frameRate: 30, // Smooth playback
      bitrate: 2500, // Higher bitrate for clearer video
      orientationMode: "FixedPortrait", // Maintain fixed portrait orientation
    },
    bandwidthProfile: {
      video: {
        mode: "HD", // Enforce high-quality video
        maxBitrate: 2500,
      },
    },
    dualStreamMode: "Dynamic", // Auto switch between high/low streams
    enableAutoBitrate: false, // Fix the bitrate for consistent quality
    codec: "h264", // Use H.264 codec for better compatibility and performance
  };

  const callbacks = {
    EndCall: () => {
      setStartVideoCall(false);
      router.push("/dashboard");
    },
  };

  return startVideoCall ? (
    <div
      style={{
        display: "flex",

        width: "100vw",
        height: "100vh",
        // background: "linear-gradient(to bottom, #6A11CB, #2575FC)",
      }}
    >
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(to bottom, #e96443, #904e95)",
        color: "#fff",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          mb: 4,
          fontSize: { xs: "1.8rem", md: "2.5rem" },
        }}
      >
        Ready for Your Video Call?
      </Typography>
      <Button
        onClick={() => setStartVideoCall(true)}
        endIcon={<VideoCallIcon />}
        sx={{
          borderRadius: "25px",
          padding: "10px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #6a11cb, #2575fc)",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          "&:hover": {
            background: "linear-gradient(45deg, #2575fc, #6a11cb)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
          },
        }}
      >
        Start Call
      </Button>
      <Box sx={{ mt: 6 }}>
        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
          width={400}
          height={400}
          alt="video call gif"
          style={{
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        />
      </Box>
    </Box>
  );
};

export default VideoCall;
