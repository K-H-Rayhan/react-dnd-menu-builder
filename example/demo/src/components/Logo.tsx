import React from "react";

type Props = {
  collapsed: boolean;
};

function Logo({ collapsed }: Props) {
  return (
    <div
      style={{
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 10,
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
      <p
        style={{
          fontSize: 14,
          fontWeight: "bolder",
          display: collapsed ? "none" : "block",
        }}
      >
        {collapsed ? null : "React DND Menu Builder"}
      </p>
    </div>
  );
}

export default Logo;
