import React from "react";
import TabSection from "./Tabs";
import Contact from "./contact";
import Hero from "./hero"; // ou ton composant Hero s'il est séparé

export default function Home() {
  return (
    <>
      <Hero />
      <TabSection />
      <Contact />
    </>
  );
}
