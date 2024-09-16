import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const About = () => {
  return (
    <div className="h-screen">
      <div className="h-full">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default About;
