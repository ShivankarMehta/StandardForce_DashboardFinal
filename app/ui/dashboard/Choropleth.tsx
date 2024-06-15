// "use client";
// import React, { useState } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// // import { ViewportProps } from "react-map-gl";
// // interface CustomerLocation {
// //   id: number;
// //   lat: number;
// //   lng: number;
// //   name: string;
// // }

// const MapComponent = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 35.6895,
//     longitude: 139.6917,
//     zoom: 13,
//   });

//   const customerLocations = [
//     { id: 1, lat: 35.6895, lng: 139.6917, name: "Customer 1" },
//     { id: 2, lat: 35.6528, lng: 139.8395, name: "Customer 2" },
//     { id: 3, lat: 35.4437, lng: 139.638, name: "Customer 3" },
//     { id: 4, lat: 35.6894, lng: 139.6917, name: "Customer 4" },
//     { id: 5, lat: 35.6895, lng: 139.7917, name: "Customer 5" },
//     { id: 6, lat: 35.6895, lng: 139.5917, name: "Customer 6" },
//     { id: 7, lat: 35.6895, lng: 139.6917, name: "Customer 7" },
//     { id: 8, lat: 35.7895, lng: 139.6917, name: "Customer 8" },
//     { id: 9, lat: 35.5895, lng: 139.6917, name: "Customer 9" },
//     { id: 10, lat: 35.6895, lng: 139.8917, name: "Customer 10" },
//     { id: 11, lat: 35.6895, lng: 139.4917, name: "Customer 11" },
//     { id: 12, lat: 35.6895, lng: 139.6917, name: "Customer 12" },
//     { id: 13, lat: 35.6895, lng: 139.2917, name: "Customer 13" },
//     { id: 14, lat: 35.6895, lng: 139.6917, name: "Customer 14" },
//     { id: 15, lat: 35.6895, lng: 139.9917, name: "Customer 15" },
//     // Add more customer locations as needed
//   ];

//   return (
//     <ReactMapGL
//       {...viewport}
//       width="100%"
//       height="500px"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       onViewportChange={(newViewport) => setViewport(newViewport)}
//       mapboxApiAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
//     >
//       {customerLocations.map((customer) => (
//         <Marker
//           key={customer.id}
//           latitude={customer.lat}
//           longitude={customer.lng}
//         >
//           <Popup>{customer.name}</Popup>
//         </Marker>
//       ))}
//     </ReactMapGL>
//   );
// };

// export default MapComponent;
// import React, { createContext } from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";

// // Replace this with your actual data.
// const customerData = {
//   Tokyo: 100,
//   Osaka: 75,
//   Hokkaido: 50,
//   // ... more prefectures
// };

// const colorScale = scaleLinear<string>()
//   .domain([0, Math.max(...Object.values(customerData))])
//   .range(["#ffedea", "#ff5233"]);

// const MapChart = () => {
//   return (
//     <ComposableMap>
//       <ZoomableGroup>
//         <Geographies geography="../data/gadm41_JPN_1.json">
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               // Ensure the property used here matches your GeoJSON structure
//               const prefectureName = geo.properties.NAME_1;
//               const customerCount = customerData[prefectureName] || 0;
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={colorScale(customerCount)}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ZoomableGroup>
//     </ComposableMap>
//   );
// };

// export default MapChart;
"use client";
// https://github.com/CodingWith-Adam/geoJson-map-with-react-leaflet/blob/master/src/components/MyMap.jsx
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  GeoJSONProps,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import japanMapData from "../../data/gadm41_JPN_1.json"; // Update this path
import L, { Layer } from "leaflet";

// If necessary, define a type for the properties of your GeoJSON features
type GeoJSONFeatureProperties = {
  NAME_1: string; // Adjust based on your GeoJSON properties
};

const SetView = ({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

interface MyMapProps {
  dashboard: boolean;
}

const Choropleth: React.FC<MyMapProps> = ({ dashboard }) => {
  const [color, setColor] = useState<string>("#ffff00");
  const [center, setCenter] = useState<L.LatLngExpression>([36.2048, 138.2529]);
  const [zoom, setZoom] = useState<number>(5);

  useEffect(() => {
    console.log(japanMapData);
  }, []);

  const countryStyle: L.PathOptions = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  const changeCountryColor = (event: L.LayerEvent) => {
    const layer = event.target as L.Path;
    layer.setStyle({
      color: "green",
      fillColor: color,
      fillOpacity: 1,
    });
  };

  const onEachCountry = (
    country: GeoJSON.Feature<GeoJSON.Geometry, GeoJSONFeatureProperties>,
    layer: Layer
  ) => {
    const countryName = country.properties.NAME_1; // Adjust based on Japan GeoJSON properties
    console.log(countryName);
    layer.bindPopup(countryName);

    layer.options.fillOpacity = Math.random(); // Example randomness, adjust as needed

    (layer as L.Path).on({
      click: changeCountryColor,
    });
  };

  const colorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div>
      {dashboard ? (
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
          Customer Conventration in Regieon
        </h1>
      ) : (
        <></>
      )}

      <MapContainer
        style={{ height: "80vh", borderRadius: "20px" }}
        // center={center}
        // zoom={zoom}
      >
        <SetView center={center} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          style={countryStyle}
          data={japanMapData.features}
          onEachFeature={onEachCountry as any} // Casting as any to avoid type mismatch
        />
      </MapContainer>
      {/* <input type="color" value={color} onChange={colorChange} /> */}
    </div>
  );
};

export default Choropleth;