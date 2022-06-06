import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
  useControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useState, useRef, useEffect } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w",
// });
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Feature } from "react-mapbox-gl";

export default function Home() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef();
  const GeoCoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w",
      marker: true,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      setLat(coords[1]);
      setLong(coords[0]);
    });
    return null;
  };

  useEffect(() => {
    try {
      if (!long && !lat) {
        fetch("https://ipapi.co/8.8.8.8/json/")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            mapRef.current.flyTo({
              center: [data.longitude, data.latitude],
            });
            setLat(data?.latitude);
            setLong(data?.longitude);
          });
      }
    } catch (error) {
      console.log("getting the error", error);
    }
  });
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [long, lat] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };
  const trackDistance = async () => {
    const data = await fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/-73.98888852642564%2C40.73788453332921%3B-73.99694914880072%2C40.737337993479485?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w"
    );
    console.log("getting data", data);
  };

  return (
    <div className="h-screen max-w-5xl mx-auto flex items-center justify-center">
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibWFwYm94MTIzNDU2NzgiLCJhIjoiY2wzeWkwaHhvMGczcTNjbGRtanl0dHZxcCJ9.F-XAkRsj6nQRwPk08vbw_w"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // onClick={(e) => doSomeThing(e)}
      >
        <Layer
          type="line"
          layout={{ "line-cap": "round", "line-join": "round" }}
          paint={{ "line-color": "#4790E5", "line-width": 12 }}
        >
          <Feature coordinates={[-0.13235092163085938, 51.518250335096376]} />
        </Layer>
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source> */}
        <Marker
          // onClick={trackDistance}
          latitude={lat}
          longitude={long}
          draggable
          onDragEnd={(e) => {
            setLat(e.lngLat.lat);
            setLong(e.lngLat.lng);
          }}
          onClick={() => {
            setShowPopup(true);
            trackDistance();
          }}
          anchor="center"
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          showUserHeading={true}
          onGeolocate={(e) => {
            setLat(e.coords.latitude);
            setLong(e.coords.longitude);
          }}
        />
        {showPopup && (
          <Popup
            latitude={lat}
            longitude={long}
            closeButton={true}
            closeOnClick={false}
            anchor="top-right"
            onClose={() => {
              setShowPopup(false);
            }}
          >
            <div>New york , USA</div>
          </Popup>
        )}
        <FullscreenControl />
        <ScaleControl />

        <GeoCoder />
      </Map>
    </div>
  );
}
