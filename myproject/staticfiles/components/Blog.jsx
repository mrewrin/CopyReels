import React from "react";
import Image3 from "../images/image-3.png";

const Blog = () => {
  const blogs = [
    {
      title:
        "AI for Marketing: Top Tips and Tools from Marketing Experts [2024]",
      description:
        "Cofilm's AI Marketing Guide: Learn from the experts, build your AI strategy, and leverage tools for success.",
      image: { Image3 },
    },
    {
      title: "What is AI rewriter",
      description:
        "Perfect your writing anywhere with the most advanced AI models",
      image: "https://placehold.co/400x300",
    },
    {
      title: "Video to text transcription",
      description:
        "Cofilm works best for TALKING videos. Support video links of Instagram, TikTok and YouTube shorts",
      image: "https://placehold.co/400x300",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <img
              src={Image3}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
