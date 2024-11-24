"use client";
import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Model = () => {
  useGSAP(() => {
    gsap.to("#heading", {
      ScrollTrigger: {
        trigger: "#heading",
        top: "0% 0%",
        y: 0,
        opacity: 1,
      },
    });
  });

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 className="section-heading" id="heading">
          Take a closer look.
        </h1>
      </div>
    </section>
  );
};

export default Model;
