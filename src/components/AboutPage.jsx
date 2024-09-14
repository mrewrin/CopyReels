import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const About = () => {
  return (
    <div className="h-screen">
      <div className="flex h-full">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default About;
