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
import rawJapanMapData from "../../data/gadm41_JPN_1.json"; // Update this path
import L, { Layer } from "leaflet";
import postal_code from "japan-postal-code";
import { translateAndCapitalize } from "../../utils/choroplethUtils.js";

interface JapanGeoJSONFeatureProperties {
  GID_1: string;
  GID_0: string;
  COUNTRY: string;
  NAME_1: string;
  VARNAME_1: string;
  NL_NAME_1: string;
  TYPE_1: string;
  ENGTYPE_1: string;
  CC_1: string;
  HASC_1: string;
  ISO_1: string;
}

interface JapanGeoJSONGeometry {
  type: string;
  coordinates: number[][][] | number[][][][]; // Adjust based on the complexity of the coordinates
}

interface JapanGeoJSONFeature {
  type: "Feature";
  properties: JapanGeoJSONFeatureProperties;
  geometry: JapanGeoJSONGeometry;
}

interface JapanGeoJSON {
  type: "FeatureCollection";
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: JapanGeoJSONFeature[];
}

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
  data: any;
}

interface Address {
  area: String;
  city: String;
  prefecture: String;
  street: String;
}

const Choropleth: React.FC<MyMapProps> = ({ dashboard, data }) => {
  const [color, setColor] = useState<string>("#ffff00");
  const [center, setCenter] = useState<L.LatLngExpression>([36.2048, 138.2529]);
  const [zoom, setZoom] = useState<number>(5);
  const [prefactureData, setPrefactureData] = useState<Object>({});
  const [totalNumberOfCustomers, setTotalNumberOfCustomers] =
    useState<Number>(0);

  const japanMapData = rawJapanMapData as JapanGeoJSON;
  const TotalCustomers = 100; // Example total
  console.log("choropleth zip code data: ", data);

  // const buildPrefactureData = () => {
  //   const prefData = {};
  //   for (let pref in data.zipCodeData) {
  //     let prefactureName = postal_code.get(pref, function (address) {
  //       translateAndCapitalize(address.prefecture, function (prefectureEn) {
  //         return prefectureEn;
  //       });
  //     });
  //     if (prefactureName in prefData) {
  //       prefData[prefactureName] += data.zipCodeData[pref];
  //     } else {
  //       prefData[prefactureName] = data.zipCodeData[pref];
  //     }
  //   }

  //   return prefData;
  // };

  useEffect(() => {
    // postal_code.get("1000004", function (address) {
    //   console.log(address.prefecture); // => "東京都"
    //   console.log(address.city); // => "千代田区"
    //   console.log(address.area); // => "千代田"
    //   console.log(address.street); // => ""
    // });
    // const buildPrefectureData = async (rawData) => {
    //   const prefData = {};
    //   const zipCodes = Object.keys(rawData.zipCodes);

    //   // const zipCodes = [
    //   //   "850804",
    //   //   "856080",
    //   //   "860015",
    //   //   "1000004",
    //   //   "1001621",
    //   //   "1020083",
    //   //   "1030025",
    //   //   "1040032",
    //   //   "1050004",
    //   //   "1350016",
    //   //   "1358701",
    //   //   "1410031",
    //   //   "1410032",
    //   //   "1500002",
    //   //   "1500012",
    //   //   "1520035",
    //   //   "1530051",
    //   // ];
    //   // console.log("Processing zipCodes:", zipCodes);

    //   await Promise.all(
    //     zipCodes.map(async (zipCode) => {
    //       // const getPostalCodeData = (zipCode) => {
    //       //   return new Promise((resolve, reject) => {
    //       //     postal_code.get(zipCode, (data) => {
    //       //       if (data) {
    //       //         resolve(data);
    //       //       } else {
    //       //         reject(new Error("Failed to get postal code data"));
    //       //       }
    //       //     });
    //       //   });
    //       // };
    //       // getPostalCodeData(zipCode)
    //       //   .then((resolvedValue) => {
    //       //     console.log("Resolved value:", resolvedValue);
    //       //   })
    //       //   .catch((error) => console.error(error));

    //       // try {
    //       //   const address = await postal_code.get((zipCode) => zipCode); // Assuming this returns a promise
    //       //   console.log("Processing address:", address);
    //       //   // console.log("Processing zipCodes:", zipCode);
    //       //   if (address && address.prefecture) {
    //       //     console.log("Adress: ", address);
    //       //     const prefectureEn = await translateAndCapitalize(
    //       //       address.prefecture
    //       //     ); // Ensure this returns a promise
    //       //     prefData[prefectureEn] =
    //       //       (prefData[prefectureEn] || 0) + rawData.zipCodes[zipCode];
    //       //   }
    //       // } catch (error) {
    //       //   console.error(`Error processing zip code ${zipCode}:`, error);
    //       // }

    //       // const mockPostalCodeGet = (zipCode) => {
    //       //   // console.log("mockPostalCodeGet called for:", zipCode); // Verify function call
    //       //   return new Promise((resolve) => {
    //       //     setTimeout(() => {
    //       //       // console.log("Resolving mock data for:", zipCode); // Mock response
    //       //       const address: Address = postal_code.get(zipCode, (data) => {
    //       //         console.log("Adress: ", data);
    //       //         return data;
    //       //       });
    //       //       resolve({ prefecture: `Mock Prefecture for ${address}` });
    //       //     }, 100); // Simulate async operation
    //       //   });
    //       // };
    //       // // Call the mock function and log the resolved value
    //       // mockPostalCodeGet(zipCode).then((resolvedValue) => {
    //       //   console.log("Resolved value:", resolvedValue);
    //       // });
    //       // console.log("Processing zipCode:", zipCode);
    //       // try {
    //       //   const address: Address = await new Promise((resolve, reject) => {
    //       //     postal_code.get(zipCode, (data) => {
    //       //       if (data && data.prefecture) {
    //       //         resolve(data);
    //       //       } else {
    //       //         reject(`No data for zipCode: ${zipCode}`);
    //       //       }
    //       //     });
    //       //   });
    //       //   console.log("Address data:", address);
    //       //   const prefectureEn = await translateAndCapitalize(
    //       //     address.prefecture
    //       //   );
    //       //   console.log("Prefecture name:", prefectureEn);
    //       //   prefData[prefectureEn] =
    //       //     (prefData[prefectureEn] || 0) + rawData.zipCodes[zipCode];
    //       // } catch (error) {
    //       //   console.error(`Error processing zip code ${zipCode}:`, error);
    //       // }
    //     })
    //   );

    //   console.log("Final prefData:", prefData);
    //   setPrefactureData(prefData);
    //   setTotalNumberOfCustomers(parseInt(rawData.totalNumberOfZipcodes, 10));
    // };
    // const getPostalCodeData = (zipCode) => {
    //   return new Promise((resolve, reject) => {
    //     postal_code.get(zipCode, (data) => {
    //       if (data) {
    //         resolve(data); // Resolve with the data if it's successful
    //       } else {
    //         reject(new Error(`No data found for zipCode: ${zipCode}`)); // Reject if no data is found
    //       }
    //     });
    //   });
    // };

    // const buildPrefectureData = async (rawData) => {
    //   const prefData = {};
    //   const zipCodes = Object.keys(rawData.zipCodes);

    //   await Promise.all(
    //     zipCodes.map(async (zipCode) => {
    //       try {
    //         const address: any = await getPostalCodeData(zipCode); // Use the wrapped function
    //         if (address && address.prefecture) {
    //           const prefectureEn = await translateAndCapitalize(
    //             address.prefecture
    //           );
    //           prefData[prefectureEn] =
    //             (prefData[prefectureEn] || 0) + rawData.zipCodes[zipCode];
    //         }
    //       } catch (error) {
    //         console.error(`Error processing zip code ${zipCode}:`, error);
    //       }
    //     })
    //   );
    const buildPrefectureData = async (rawData) => {
      const prefData = {};
      const zipCodes = Object.keys(rawData.zipCodes);

      await Promise.all(
        zipCodes.map(async (zipCode) => {
          try {
            const address = await postal_code.get((zipCode) => zipCode); // Assuming this returns a promise
            console.log("Address: ", address);
            if (address && address.prefecture) {
              const prefectureEn = await translateAndCapitalize(
                address.prefecture
              ); // Ensure this returns a promise
              prefData[prefectureEn] =
                (prefData[prefectureEn] || 0) + rawData.zipCodes[zipCode];
            }
          } catch (error) {
            console.error(`Error processing zip code ${zipCode}:`, error);
          }
        })
      );

      setPrefactureData(prefData);
      setTotalNumberOfCustomers(parseInt(rawData.totalNumberOfZipcodes, 10));
    };

    if (data && data.zipCodes) {
      buildPrefectureData(data)
        .then(() => {
          // console.log("In coming data: ", prefactureData)
          console.log("Prefecture data built successfully.", prefactureData);
        })
        .catch((error) => {
          console.error("Error building prefecture data:", error);
        });

      // console.log("Prefecture data built successfully.", prefactureData);
    }
  }, [data, prefactureData]);

  const myRetrievedData = {
    // Example data
    Aichi: 20,
    Osaka: 20,
    Tokyo: 60,
    // ...
  };

  // Adjust the style based on the number of customers
  const getStyle = (feature: any): L.PathOptions => {
    // Assuming properties have the same structure as JapanGeoJSONFeatureProperties
    const properties = feature.properties as JapanGeoJSONFeatureProperties;

    if (properties && properties.NAME_1) {
      const regionName = properties.NAME_1;
      const numberOfCustomers = myRetrievedData[regionName] || 0;

      const fillOpacity = Math.min(numberOfCustomers / TotalCustomers, 1); // Ensuring opacity is between 0 and 1

      return {
        fillColor: "red",
        fillOpacity: fillOpacity,
        color: "black",
        weight: 2,
      };
    } else {
      // Default style if properties are not available
      return {
        fillColor: "red",
        fillOpacity: 0.5,
        color: "black",
        weight: 2,
      };
    }
  };

  const getNumberOfCustomers = (regionName: string) => {
    return myRetrievedData[regionName] || 0;
  };

  const onEachCountry = (
    country: GeoJSON.Feature<GeoJSON.Geometry, GeoJSONFeatureProperties>,
    layer: Layer
  ) => {
    const countryName = country.properties?.NAME_1; // Adjust based on Japan GeoJSON properties
    const numberOfCustomers = getNumberOfCustomers(countryName);
    const fillOpacity = Math.min(numberOfCustomers / TotalCustomers, 1);

    // Bind tooltip
    if (countryName) {
      // console.log(
      //   `Processing: ${countryName}, Customers: ${numberOfCustomers}`
      // );
      layer.bindTooltip(
        `Region: ${countryName}<br>Customers: ${numberOfCustomers}`
      );
    }

    // Mouseover event
    layer.on("mouseover", (e) => {
      const layer = e.target;
      layer.setStyle({
        weight: 5, // Increase border weight
        fillOpacity: 1, // You can adjust opacity if needed
      });
    });

    // Mouseout event
    layer.on("mouseout", (e) => {
      const layer = e.target;
      layer.setStyle({
        weight: 2, // Reset border weight to original
        fillOpacity: fillOpacity, // Reset opacity to original
      });
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
        center={center}
        zoom={zoom}
      >
        <SetView center={center} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          style={getStyle}
          data={japanMapData}
          onEachFeature={onEachCountry as any} // Casting as any to avoid type mismatch
        />
      </MapContainer>
      {/* <input type="color" value={color} onChange={colorChange} /> */}
    </div>
  );
};

export default Choropleth;
