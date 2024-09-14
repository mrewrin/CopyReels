import React, { useState } from "react";
import Image2 from "../images/image-2.png";
import MainImage from "../images/mainimage.png";

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState("Gmail AI");

  const renderContent = () => {
    switch (activeTab) {
      case "Gmail AI":
        return (
          <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-1/2">
              <img
                src={Image2}
                alt="Gmail interface"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-1/2 pl-6">
              <h2 className="text-3xl font-bold">Gmail AI Integration</h2>
              <p className="mt-4 text-gray-600">
                Improve your emails with AI suggestions right inside your Gmail
                account.
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
                Learn more
              </button>
            </div>
          </div>
        );
      case "Video-to-text":
        return (
          <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-1/2">
              <img
                src={MainImage}
                alt="Video to text"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-1/2 pl-6">
              <h2 className="text-3xl font-bold">
                Video-to-text Transcription
              </h2>
              <p className="mt-4 text-gray-600">
                Easily transcribe videos into text with our AI-powered tool.
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
                Learn more
              </button>
            </div>
          </div>
        );
      case "AI Paraphraser":
        return (
          <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-1/2">
              <img
                src={Image2}
                alt="AI Paraphraser"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-1/2 pl-6">
              <h2 className="text-3xl font-bold">AI Paraphraser Tool</h2>
              <p className="mt-4 text-gray-600">
                Paraphrase your text easily with the power of AI.
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
                Learn more
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("Gmail AI")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "Gmail AI"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Gmail AI
        </button>
        <button
          onClick={() => setActiveTab("Video-to-text")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "Video-to-text"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Video-to-text
        </button>
        <button
          onClick={() => setActiveTab("AI Paraphraser")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "AI Paraphraser"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          AI Paraphraser
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ContentSection;
