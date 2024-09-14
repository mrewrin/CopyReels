// import React, { useState } from "react";

// const FaqItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mb-4">
//       <div
//         className="flex items-center mb-2 cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <i
//           className={`fas ${
//             isOpen ? "fa-times-circle" : "fa-plus-circle"
//           } text-xl mr-2`}
//         ></i>
//         <h2 className="text-xl font-semibold">{question}</h2>
//       </div>
//       <div className={`faq-content ${isOpen ? "open" : ""}`}>
//         <p className="text-gray-600">{answer}</p>
//       </div>
//       <hr className="my-4" />
//     </div>
//   );
// };

// export default FaqItem;

import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="text-lg text-gray-500 mr-2">
            {isOpen ? "-" : "+"}
          </span>
          <h2 className="text-lg font-medium text-gray-900">{question}</h2>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
