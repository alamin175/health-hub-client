import React from "react";
import VideoCall from "@/components/Ui/VideoCall/VideoCall";
import { Box, Typography } from "@mui/material";

const VideoCalling = ({
  searchParams,
}: {
  searchParams: { videoCallingId: string };
}) => {
  const videoCallingId = searchParams.videoCallingId;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #2193b0, #6dd5ed)",
        color: "#fff",
        textAlign: "center",
        padding: 0,
        overflow: "hidden", // Prevent scrolling and ensure the video takes full viewport
      }}
    >
      {/* Fullscreen Video Call */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          flexGrow: 1,
        }}
      >
        <VideoCall videoCallingId={videoCallingId} />
      </Box>

      {/* Footer Text */}
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          bottom: 20,
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        Perfect Video Calling Experience
      </Typography>
    </Box>
  );
};

export default VideoCalling;
