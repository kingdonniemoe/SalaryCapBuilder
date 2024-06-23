import React from "react";

function GradientBackgroundComponent({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        color: "white",
        background: "linear-gradient(to right, #b6c7e3, #1565e6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        paddingTop: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default GradientBackgroundComponent;
