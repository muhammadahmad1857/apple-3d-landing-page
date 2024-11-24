"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../app/utils";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 760px)" });
  const [videoSrc, setVideoSrc] = useState(
    isSmallScreen ? smallHeroVideo : heroVideo,
  );
  console.log("hi", isSmallScreen);

  const handleVideoChange = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };
  useEffect(() => {
    handleVideoChange();
    console.log("I mounted");
  }, [isSmallScreen]);
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);
  return (
    <section className="nav-height relative w-full bg-black">
      <div className="flex-center h-5/6 w-full flex-col">
        <p id="hero" className="hero-title">
          Iphone 15 pro
        </p>
        <div className="flex max-h-[calc(100%-100px)] w-9/12 items-center justify-center border border-red-500 md:w-10/12">
          <video
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            className="pointer-events-none h-full"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <Link href={"#highlights"} className="btn transition-all duration-500">
          Buy
        </Link>
        <p className="text-center font-normal">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
