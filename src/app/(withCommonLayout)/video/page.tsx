import React from "react";
import VideoCall from "@/components/Ui/VideoCall/VideoCall";

const VideoCalling = ({
  searchParams,
}: {
  searchParams: { videoCallingId: string };
}) => {
  const videoCallingId = searchParams.videoCallingId;

  return (
    <div>
      <VideoCall videoCallingId={videoCallingId} />
      <p>Perfect Video Calling Experience</p>
    </div>
  );
};

export default VideoCalling;
