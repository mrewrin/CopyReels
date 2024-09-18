import React from "react";

const History = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">История</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          Все
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          Saved
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          <i className="fab fa-youtube"></i> YouTube
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          <i className="fab fa-instagram"></i> Reels
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          <i className="fab fa-tiktok"></i> Tik-tok
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
          File
        </button>
      </div>
      <div className="flex justify-center items-center h-64 bg-white rounded shadow-sm">
        <img
          src="https://placehold.co/200x200"
          alt="Illustration of documents flying into a folder"
        />
      </div>
    </div>
  );
};

export default History;
