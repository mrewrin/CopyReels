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
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box borderBottom={1} borderColor="grey.200" py={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setIsOpen(!isOpen)}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h6">{question}</Typography>
        <IconButton>{isOpen ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>
      <Collapse in={isOpen}>
        <Typography variant="body2" color="textSecondary" mt={2}>
          {answer}
        </Typography>
      </Collapse>
    </Box>
  );
};

export default FAQItem;
