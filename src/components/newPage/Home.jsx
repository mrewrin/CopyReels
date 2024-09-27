import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import StepsSection from "./StepsSection";
import UseCaseSection from "./UseCaseSection";
import TestimonialSection from "./TestimonialSection";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Home() {
  const location = useLocation();

  // Прокрутка к нужной секции при загрузке страницы
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection id="hero-section" />
      <StepsSection id="steps-section" />
      <UseCaseSection id="usecase-section" />
      <TestimonialSection id="testimonial-section" />
      <Faq id="faq-section" />
      <Footer id="footer" />
    </>
  );
}
