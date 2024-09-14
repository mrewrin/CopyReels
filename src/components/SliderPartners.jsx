// import React from "react";

// const partners = [
//   {
//     name: "Paragon",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Paragon_logo.svg/1200px-Paragon_logo.svg.png",
//   },
//   {
//     name: "Harvard",
//     logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Harvard_University_logo.svg/1200px-Harvard_University_logo.svg.png",
//   },
//   {
//     name: "Stanford",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png",
//   },
//   {
//     name: "MIT",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png",
//   },
//   {
//     name: "VISA",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png",
//   },
//   {
//     name: "BCG",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/BCG_Logo.svg/1200px-BCG_Logo.svg.png",
//   },
//   {
//     name: "BrainCorp",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/BrainCorp_Logo.svg/1200px-BrainCorp_Logo.svg.png",
//   },
// ];

// const SliderPartners = () => {
//   return (
//     <div className="overflow-hidden py-8">
//       <div className="animate-marquee whitespace-nowrap flex justify-center">
//         {partners.map((partner, index) => (
//           <div
//             key={index}
//             className="mx-6 flex-shrink-0"
//             style={{ minWidth: "200px" }}
//           >
//             <img
//               src={partner.logo}
//               alt={partner.name}
//               className="h-20 w-auto object-contain"
//             />
//           </div>
//         ))}
//         {/* Повторяем логотипы для бесконечной прокрутки */}
//         {partners.map((partner, index) => (
//           <div
//             key={`copy-${index}`}
//             className="mx-6 flex-shrink-0"
//             style={{ minWidth: "200px" }}
//           >
//             <img
//               src={partner.logo}
//               alt={partner.name}
//               className="h-20 w-auto object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SliderPartners;

import React from "react";

const partners = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png",
  },
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/768px-Facebook_f_logo_%282019%29.svg.png",
  },
  {
    name: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    name: "YouTube",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  },
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
  },
  {
    name: "Slack",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
];

const SliderPartners = () => {
  return (
    <div className="overflow-hidden bg-white py-8">
      {/* Используем 2 блока для создания эффекта бесконечной прокрутки */}
      <div className="marquee whitespace-nowrap flex space-x-8">
        {partners.map((partner, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
        {partners.map((partner, index) => (
          <div key={index + partners.length} className="flex-shrink-0">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderPartners;
