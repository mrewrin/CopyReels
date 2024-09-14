import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between mt-10 max-w-lg mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Still have questions?
        </h2>
        <p className="text-gray-600 mt-2 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sequi?
        </p>
      </div>
      <button className="bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition duration-300 text-base">
        Contact Us
      </button>
    </div>
  );
};

export default ContactUs;
