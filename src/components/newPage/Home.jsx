import React from "react";
import HeroSection from "./HeroSection";
import StepsSection from "./StepsSection";
import UseCaseSection from "./UseCaseSection";
import TestimonialSection from "./TestimonialSection";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <UseCaseSection />
      <TestimonialSection />
      <Faq />
      <Footer />
    </>
  );
}
