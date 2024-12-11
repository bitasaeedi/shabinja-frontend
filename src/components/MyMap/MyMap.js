import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import MarkerShow from "./MarkerShow";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Button, Typography } from "@mui/material";

const MyMap = ({
  points,
  returnNewPositionOnDrag,
  onPolygonDrawn,
  centerInitial,
}) => {
  const [markers, setMarkers] = useState([]);
  const [standard, setStandard] = useState(true);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [center, setCenter] = useState([36.022227982837855, 51.339111328125]);
  const mapRef = useRef();

  // const center = [36.5972685, 51.3931284];
  // const center = [36.022227982837855, 51.339111328125];

  useEffect(() => {
    setCenter(centerInitial);
  }, [centerInitial]);

  useEffect(() => {
    console.log("Points:", points);
    setMarkers(points);
  }, [points]);

  const handlReturnNewPositionOnDrag = (lat, lng, id) => {
    returnNewPositionOnDrag(lat, lng, id);
  };

  const handleSearchInArea = () => {
    const map = mapRef.current; // Access the map instance
    if (map) {
      const bounds = map.getBounds(); // Get visible map bounds
      const zoom = map.getZoom(); // Get current zoom level
      const visiblePoints = generatePointsWithinBounds(bounds, zoom);
      console.log(visiblePoints, "visiblePoints");
      // onPolygonDrawn(visiblePoints); // لیست سه نقطه برای سرچ
    }
  };

  const generatePointsWithinBounds = (bounds, zoom) => {
    const { _northEast: ne, _southWest: sw } = bounds;

    // Find the center of the bounds
    const centerLat = (ne.lat + sw.lat) / 2;
    const centerLng = (ne.lng + sw.lng) / 2;

    // Adjust triangle size based on zoom level
    const size = zoom > 8 ? 0.4 : 0.3; // Smaller size for higher zoom levels

    // Generate triangle points
    return generateTrianglePoints(centerLat, centerLng, size);
  };

  const generateTrianglePoints = (centerLat, centerLng, size = 0.01) => {
    // Size determines the "radius" of the triangle from the center
    const height = Math.sqrt(3) * size; // Height of an equilateral triangle
    const halfWidth = size;

    return [
      // Top vertex of the triangle
      { lat: centerLat + (2 / 3) * height, lng: centerLng },
      // Bottom-left vertex of the triangle
      { lat: centerLat - (1 / 3) * height, lng: centerLng - halfWidth },
      // Bottom-right vertex of the triangle
      { lat: centerLat - (1 / 3) * height, lng: centerLng + halfWidth },
    ];
  };

  const handleMarkerSelect = (id) => {
    setActiveMarkerId(id);
  };

  const satelliteTileUrl =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const standardMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%", margin: "0", padding: "0" }}
      scrollWheelZoom={false}
    >
      <Button
        variant="contained"
        color="white"
        onClick={handleSearchInArea}
        sx={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <Typography>جستجو در این منطقه</Typography>
      </Button>

      <TileLayer url={standard ? standardMap : satelliteTileUrl} />

      {markers?.length <= 2 ? (
        markers?.map((marker, index) => (
          <MarkerShow
            key={index}
            point={marker}
            marker={{ lat: marker?.lat, lng: marker?.lng }}
            draggableLimit={true}
            returnNewPositionOnDrag={handlReturnNewPositionOnDrag}
            activeMarkerId={activeMarkerId}
            onMarkerSelect={handleMarkerSelect}
          />
        ))
      ) : (
        <MarkerClusterGroup
          disableClusteringAtZoom={12}
          maxClusterRadius={(zoom) => (zoom >= 16 ? 10 : 80)}
        >
          {markers?.map((marker, index) => (
            <MarkerShow
              key={index}
              point={marker}
              marker={{ lat: marker?.lat, lng: marker?.lng }}
              draggableLimit={false}
              returnNewPositionOnDrag={handlReturnNewPositionOnDrag}
              activeMarkerId={activeMarkerId}
              onMarkerSelect={handleMarkerSelect}
            />
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
};

export default MyMap;
