import React from "react";

const DownArrowIcon = ({ size = 24 }) => (
  <svg
    fill="none"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    id="down-arrow-direction-square"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      id="secondary"
      d="M20,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM14.83,13.5l-2.14,3.12a.82.82,0,0,1-1.38,0L9.17,13.5A1,1,0,0,1,9.86,12h4.28A1,1,0,0,1,14.83,13.5Z"
      style={{
        fill: "none",
        stroke: "rgb(255, 255, 255)",
        strokeWidth: 1.5,
      }}
    ></path>
    <path
      id="primary"
      d="M12,7v5m.69,4.63,2.14-3.13a1,1,0,0,0-.69-1.5H9.86a1,1,0,0,0-.69,1.5l2.14,3.12A.82.82,0,0,0,12.69,16.63ZM3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4Z"
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

export default DownArrowIcon;
