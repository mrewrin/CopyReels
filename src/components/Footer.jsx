import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div>
            <h2 className="text-xl font-bold">CopyReels</h2>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              aut, nesciunt atque quidem magni cum.
            </p>
          </div>

          {/* Секция Features */}
          <div>
            <h3 className="text-lg font-bold mb-4">FEATURES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, magni.
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem ipsum dolor sit.
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem, ipsum.
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem.
                </a>
              </li>
            </ul>
          </div>

          {/* Секция Learning Center */}
          <div>
            <h3 className="text-lg font-bold mb-4">Lorem, ipsum.</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Lorem, ipsum.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
