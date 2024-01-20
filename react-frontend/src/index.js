import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

// create the containtner
const container = document.getElementById("root");

// create a root
const root = ReactDOMClient.createRoot(container);

// intial render: Render an element to the Root
root.render(<App />);
