import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./temp.css";
import App from "./App";
import "@fontsource/inter/500.css"; // وزن 400
import "react-multi-date-picker/styles/colors/purple.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// map styles
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-draw/dist/leaflet.draw.css";


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered: ', reg))
      .catch(err => console.log('SW registration failed: ', err));
  });
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
