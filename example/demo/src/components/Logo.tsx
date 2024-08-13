import React from "react";

type Props = {};

function Logo({}: Props) {
  return (
    <div
      style={{
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <img
        style={{
          width: 30,
          height: 30,
        }}
        src="/burger.png"
        alt=""
      />
    </div>
  );
}

export default Logo;
