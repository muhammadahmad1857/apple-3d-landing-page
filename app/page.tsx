import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Highlights from "../components/highlights";
import Model from "../components/model";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model/>
    </main>
  );
}
