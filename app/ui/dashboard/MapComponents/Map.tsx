"use client";
import { useState, useEffect } from "react";

import * as React from "react";
import Map, { Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

export default function MapComponent({ data, token }: any) {
  console.log(token);
  const mapRef: any = React.useRef(null);

  const onClick = (event) => {
    const feature: any = event.features[0];
    console.log(feature);
    const clusterId: any = feature.properties.cluster_id;

    const mapboxSource: any = mapRef.current.getSource("customers");

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  const [geoJson, setGeoJson] = useState(null);
  useEffect(() => {
    setGeoJson({
      type: "FeatureCollection",
      features: data.map((location) => ({
        type: "Feature",
        properties: {
          cluster: false,
          id: location.id,
        },
        geometry: {
          type: "Point",
          coordinates: [location.longitude_world, location.latitude_world],
        },
      })),
    });
  }, []);
  return (
    <div className="w-auto h-96">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: 129.9579,
          latitude: 32.9,
          zoom: 12,
        }}
        ref={mapRef}
        onClick={onClick}
        interactiveLayerIds={[clusterLayer.id]}
        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <Source
          id="customers"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          type="geojson"
          data={geoJson}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </div>
  );
}
