import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  MonitorUp,
  MonitorX,
  PhoneMissed,
} from "lucide-react";
import { useState } from "react";

type VideoCallProps = {
  onClose?: () => void;
};

const VideoCall = ({ onClose }: VideoCallProps) => {
  return (
    <div className="fixed left-0 top-0 h-dvh w-dvw bg-background z-50">
      <div className="glass-effect z-50 absolute top-2 left-2 rounded-md sm:h-12 h-16 w-[calc(100%-16px)] flex flex-col sm:flex-row sm:justify-between justify-center sm:items-center px-4 sm:px-10">
        <span>Harry Potter | Duration 1:30</span>
        <div>
          <span>HD Audio</span>
          <span onClick={onClose} className="cursor-pointer">
            Close
          </span>
        </div>
      </div>
      <FullScreenVideo />
      <Control />
    </div>
  );
};

export default VideoCall;

const Control = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenShare, setIsScreenShare] = useState(false);

  return (
    <div className="absolute z-50 flex gap-3 glass-effect bottom-6 left-1/2 -translate-x-1/2 py-2 px-3 rounded-full">
      <Button
        size="icon"
        onClick={() => setIsMuted((p) => !p)}
        variant={isMuted ? "destructive" : "default"}
        className="rounded-full"
      >
        {isMuted ? <MicOff /> : <Mic />}
      </Button>
      <Button
        size="icon"
        onClick={() => setIsVideoOff((p) => !p)}
        variant={isVideoOff ? "destructive" : "default"}
        className="rounded-full"
      >
        {isVideoOff ? <CameraOff /> : <Camera />}
      </Button>
      <Button
        size="icon"
        onClick={() => setIsScreenShare((p) => !p)}
        variant={isScreenShare ? "default" : "destructive"}
        className="rounded-full"
      >
        {isScreenShare ? <MonitorUp /> : <MonitorX />}
      </Button>
      <Button size="icon" variant="destructive" className="rounded-full">
        <PhoneMissed />
      </Button>
    </div>
  );
};

const FullScreenVideo = () => {
  return (
    <div className="w-full h-full z-40">
      <video
        id="myVideo"
        src="https://videos.pexels.com/video-files/2890236/2890236-hd_1920_1080_30fps.mp4"
        controls={false}
        autoPlay
        loop
        playsInline
        className="w-full h-full object-cover"
        onError={(e) => console.error("Video error:", e)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
