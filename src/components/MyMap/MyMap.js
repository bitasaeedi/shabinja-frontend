import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import MarkerShow from "./MarkerShow";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SwitchMapButton from "./SwitchMapButton";

const MyMap = ({
  points = [],
  returnNewPositionOnDrag,
  onPolygonDrawn = () => {},
  centerInitial,
  dragable,
  zoomDefault = 8,
  showSearch = true,
  showArea = false,
  scrollWheelZoomBool = true,
  showPopup = true,
}) => {
  const [markers, setMarkers] = useState([]);
  const [standard, setStandard] = useState(true);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [center, setCenter] = useState([]); //
  const mapRef = useRef();
  const [loadingFindPoint, setLoadingFindPoint] = useState(false);

  // const center = [36.5972685, 51.3931284];
  // const center = [36.022227982837855, 51.339111328125];

  useEffect(() => {
    setCenter(centerInitial);
  }, [centerInitial]);

  useEffect(() => {
    // console.log("Points:", points);
    const updatedPoints = points.map((item) => {
      if (item.loc && typeof item.loc === "string") {
        const [lat, lng] = item.loc.split(",").map(Number); // Safely split and convert to numbers
        return {
          ...item,
          lat,
          lng,
        };
      }
      // Return the item as-is if loc is missing or invalid
      return {
        ...item,
        lat: null, // Optional: Set defaults for missing lat/lng
        lng: null,
      };
    });
    // Find the first point with valid lat and lng
    const firstValidPoint = updatedPoints.find(
      (item) => item.lat !== null && item.lng !== null
    );

    if (!(markers.length > 0)) {
      if (firstValidPoint) {
        setCenter([firstValidPoint.lat, firstValidPoint.lng]);
      } else {
        setCenter([36.022227982837855, 51.339111328125]);
        // console.warn("No valid points with lat and lng found!");
      }
    }

    setMarkers(updatedPoints);
    setLoadingFindPoint(false);
  }, [points]);

  const handlReturnNewPositionOnDrag = (lat, lng, id) => {
    returnNewPositionOnDrag(lat, lng, id);
  };

  const handleSearchInArea = () => {
    setLoadingFindPoint(true);
    const map = mapRef.current; // Access the map instance
    if (map) {
      const bounds = map.getBounds(); // Get visible map bounds
      const zoom = map.getZoom(); // Get current zoom level
      const visiblePoints = generatePointsWithinBounds(bounds, zoom);
      console.log(visiblePoints, "visiblePoints");
      onPolygonDrawn(visiblePoints); // لیست سه نقطه برای سرچ
    }
  };

  const generatePointsWithinBounds = (bounds, zoom) => {
    const { _northEast: ne, _southWest: sw } = bounds;

    // Find the center of the bounds
    const centerLat = (ne.lat + sw.lat) / 2;
    const centerLng = (ne.lng + sw.lng) / 2;

    // Adjust triangle size based on zoom level
    const size = 2; //zoom > 8 ? 0.4 : 0.1; // Smaller size for higher zoom levels

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
    console.log(id, "id handleMarkerSelect");
    setActiveMarkerId(id);
  };

  const satelliteTileUrl =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const standardMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <>
      {center.length == 2 ? (
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={zoomDefault}
          style={{ height: "100%", width: "100%", margin: "0", padding: "0" }}
          scrollWheelZoom={scrollWheelZoomBool}
          className="rounded"
        >
          {!dragable && showSearch && (
            <Button
              variant="contained"
              color="white"
              onClick={handleSearchInArea}
              disabled={loadingFindPoint} // Disable the button when loading
              sx={{
                position: "absolute",
                top: 30,
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "white",
                "&:disabled": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Dim the button when disabled
                },
                minWidth: 100,
              }}
            >
              {loadingFindPoint ? (
                <CircularProgress size={24} sx={{ color: "black" }} /> // Show a loading spinner
              ) : (
                <Typography>جستجو در این منطقه</Typography> // Show the text when not loading
              )}
            </Button>
          )}

          <Box
            variant="contained"
            color="white"
            onClick={handleSearchInArea}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              // transform: "translate(-50%, -50%)",
              zIndex: 1000,
              // backgroundColor: "white",
            }}
          >
            <SwitchMapButton
              callBack={() => setStandard((prev) => !prev)}
              mode={!!standard}
            />
          </Box>

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
                dragable={dragable || false}
                showArea={showArea}
                showPopup={showPopup}
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
                  showArea={showArea}
                  showPopup={showPopup}
                />
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyMap;
