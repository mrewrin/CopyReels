import React from "react";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              type="submit"
            >
              Login
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
