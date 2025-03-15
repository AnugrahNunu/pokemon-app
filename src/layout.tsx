import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import bgm from "./assets/1-06. The Road To Veridian ~ From Pallet.mp3";

const Layout: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const savedTime = sessionStorage.getItem("audioTime");
    const shouldPlay = sessionStorage.getItem("isPlaying") === "true";

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;

      if (savedTime) {
        audioRef.current.currentTime = parseFloat(savedTime);
      }

      if (shouldPlay) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked, user interaction needed");
        });
        setIsPlaying(true);
      }
    }

    const handleBeforeUnload = () => {
      if (audioRef.current) {
        sessionStorage.setItem(
          "audioTime",
          String(audioRef.current.currentTime)
        );
        sessionStorage.setItem("isPlaying", String(isPlaying));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked, user interaction needed");
        });
      }
      setIsPlaying(!isPlaying);
      sessionStorage.setItem("isPlaying", String(!isPlaying));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <audio ref={audioRef} src={bgm} />
      <button
        onClick={togglePlay}
        className="fixed top-5 md:top-4 right-5 md:right-10 bg-white p-2 rounded-lg z-30"
      >
        {isPlaying ? (
          <h1 className="text-[10px] md:text-base">Paused Music</h1>
        ) : (
          <h1 className="text-[10px] md:text-base">Play Music</h1>
        )}
      </button>
      <Header />
      <div className="grow overflow-y-auto overflow-visible w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
