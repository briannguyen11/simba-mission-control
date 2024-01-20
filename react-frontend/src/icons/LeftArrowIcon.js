import React from "react";

const LeftArrowIcon = ({ size = 24 }) => (
  <svg
    fill="none"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    id="left-arrow-direction-square"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      id="secondary"
      d="M20,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM12,14.14a1,1,0,0,1-1.5.69L7.38,12.69a.82.82,0,0,1,0-1.38L10.5,9.17a1,1,0,0,1,1.5.69Z"
      style={{
        fill: "none",
        stroke: "rgb(255, 255, 255)",
        strokeWidth: 1.5,
      }}
    ></path>
    <path
      id="primary"
      d="M17,12H12m-4.63.69,3.13,2.14a1,1,0,0,0,1.5-.69V9.86a1,1,0,0,0-1.5-.69L7.38,11.31A.82.82,0,0,0,7.37,12.69ZM20,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3Z"
      style={{
        fill: "none",
        stroke: "rgb(255, 255, 255)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.5,
      }}
    ></path>
  </svg>
);

export default LeftArrowIcon;
