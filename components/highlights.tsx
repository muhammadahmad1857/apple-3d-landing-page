"use client";
import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import Image from "next/image";
import { rightImg, watchImg } from "../app/utils";
import Link from "next/link";
import VideoCarousel from "./videoCarousel";
const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  });
  return (
    <section
      id="highlights"
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <Link href={"#"} className="link">
              Watch the film{" "}
              <Image
                src={watchImg}
                alt="Watch"
                height={18}
                width={18}
                className="ml-2"
              />
            </Link>
            <Link href={"#"} className="link">
              Watch the event{" "}
              <Image
                src={rightImg}
                alt="Watch"
                height={12}
                width={12}
                className="ml-2"
              />
            </Link>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
