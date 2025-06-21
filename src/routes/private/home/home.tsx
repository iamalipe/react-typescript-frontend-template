import { Button } from "@/components/ui/button";
import VideoCall from "@/components/video-call/VideoCall";
import { useState } from "react";
import { ChartAreaInteractive } from "./chart-area-interactive";

const Home = () => {
  const [isVideoCall, setIsVideoCall] = useState(false);

  return (
    <>
      <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
        <div className="flex flex-col gap-4">
          <h1>Private Home Page</h1>
          <div>
            <Button onClick={() => setIsVideoCall((p) => !p)}>
              Video Call
            </Button>
          </div>
          <ChartAreaInteractive />
        </div>
      </main>
      {isVideoCall && <VideoCall onClose={() => setIsVideoCall((p) => !p)} />}
    </>
  );
};

export default Home;
