import React from "react";

const Loader: React.FC<{ width?: string; height?: string }> = ({ width = "100px", height = "100px" }) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000, 
      }}
    >
      <div className="loader"></div> 
    </div>
  );
};

export default Loader;
