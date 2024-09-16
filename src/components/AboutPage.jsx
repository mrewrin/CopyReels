import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent"; // Adjust if named export
import Subscription from "./Subscription"; // Adjust if named export
import YouTubeContent from "./YouTubeContent"; // Adjust if named export
import ImproveText from "./ImproveText"; // Adjust if named export

const About = () => {
  const [activeContent, setActiveContent] = useState("videoToText");

  const renderActiveContent = () => {
    switch (activeContent) {
      case "videoToText":
        return <MainContent />;
      case "subscription":
        return <Subscription />;
      case "youtube":
        return <YouTubeContent />;
      case "improveText":
        return <ImproveText />;
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full">
        <Sidebar onMenuItemClick={setActiveContent} />
        <div className="flex-grow">{renderActiveContent()}</div>
      </div>
    </div>
  );
};

export default About;
