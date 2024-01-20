import React from "react";

const UpArrowIcon = ({ size = 24 }) => (
  <svg
    fill="none"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    id="up-arrow-direction-square"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      id="secondary"
      d="M20,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3Zm-5.86,9H9.86a1,1,0,0,1-.69-1.5l2.14-3.12a.82.82,0,0,1,1.38,0l2.14,3.12A1,1,0,0,1,14.14,12Z"
      style={{ fill: "none", stroke: "rgb(255, 255, 255)", strokeWidth: 1.5 }}
    ></path>
    <path
      id="primary"
      d="M12,17V12m-.69-4.63L9.17,10.5A1,1,0,0,0,9.86,12h4.28a1,1,0,0,0,.69-1.5L12.69,7.38A.82.82,0,0,0,11.31,7.37ZM21,20V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20Z"
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

export default UpArrowIcon;
