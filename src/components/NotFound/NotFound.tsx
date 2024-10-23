import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white ">
      <h1 className="text-[100px] font-extrabold">404</h1>
      <p className="text-[30px] mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-lg mt-2 text-gray-300">
        The page might have been moved or deleted.
      </p>
    </div>
  );
};

export default NotFound;
