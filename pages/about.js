import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Script from "next/script";
// import MapboxDirections from "@mapbox/mapbox-gl-directions";
// import MapboxDirections from "@mapbox/mapbox-gl-directions";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w";

const About = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // var directions = new MapboxDirections({
  //   accessToken:
  //     "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w",
  //   unit: "metric",
  //   profile: "mapbox/cycling",
  // });
  // map.addControl(directions, "top-left");
  // map.addControl(
  //   new MapboxDirections({
  //     accessToken: mapboxgl.accessToken,
  //   }),
  //   "top-left"
  // );
  return (
    <div className="h-screen max-w-5xl mx-auto flex items-center justify-center">
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></Script>
      <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js" />
      <div id="map" ref={mapContainer} className="h-96 w-screen" />
    </div>
  );
};
export default About;
