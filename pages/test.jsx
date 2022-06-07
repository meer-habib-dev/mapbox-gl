import Script from "next/script";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!isMapLoaded) {
      const startChecking = setInterval(() => {
        if (
          typeof window.mapboxgl != "undefined" &&
          typeof window.MapboxDirections != "undefined" &&
          isMapLoaded == false
        ) {
          setIsMapLoaded((prev) => !prev);
        }
      }, 1000);

      return () => clearInterval(startChecking);
    } else {
      window.mapboxgl.accessToken =
        "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w";

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.4512, 43.6568],
        zoom: 13,
      });
      map.addControl(
        new window.MapboxDirections({
          accessToken:
            "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w",
        }),
        "top-left"
      );
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
      map.addControl(new mapboxgl.NavigationControl());
    }
  }, [isMapLoaded]);

  useEffect(() => {
    // mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w';
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-74.5, 40], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });
  }, []);
  return (
    <>
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js" />
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"
        strategy="lazyOnload"
      />
      <div className="h-screen max-w-5xl mx-auto flex items-center justify-center">
        <div id="map" className="w-full h-96"></div>
      </div>
    </>
  );
};

export default Test;
