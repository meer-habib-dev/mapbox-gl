import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxDirections from "@mapbox/mapbox-gl-directions";
import MapboxDirections from "@mapbox/mapbox-gl-directions";
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

  var directions = new MapboxDirections({
    accessToken:
      "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w",
    unit: "metric",
    profile: "mapbox/cycling",
  });
  map.addControl(directions, "top-left");
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    })
  );
  // map.addControl(
  //   new MapboxDirections({
  //     accessToken: mapboxgl.accessToken,
  //   }),
  //   "top-left"
  // );
  return (
    <div className="h-screen max-w-5xl mx-auto flex items-center justify-center">
      <div ref={mapContainer} className="h-96 w-screen" />
    </div>
  );
};
export default About;
