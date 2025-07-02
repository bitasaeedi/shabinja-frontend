import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import MarkerShow from "./MarkerShow";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SwitchMapButton from "./SwitchMapButton";

const ChangeMapView = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center.length === 2) {
      map.flyTo(center, map.getZoom());
    }
  }, [center]);

  return null;
};

const HandleDoubleClick = ({ onDoubleClick }) => {
  useMapEvent("dblclick", (e) => {
    const { lat, lng } = e.latlng;
    onDoubleClick(lat, lng);
  });
  return null;
};

const SetMapRef = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, [map]);

  return null;
};

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
  const [center, setCenter] = useState([]);
  const mapRef = useRef(null);
  const [loadingFindPoint, setLoadingFindPoint] = useState(false);

  // تغییر موقعیت نقشه هنگام تغییر مرکز
  useEffect(() => {
    if (center.length === 2 && mapRef.current) {
      mapRef.current.flyTo(center, mapRef.current.getZoom(), {
        animate: true,
      });
    }
  }, [center]);

  // دریافت نقاط جدید و تنظیم مرکز
  useEffect(() => {
    const updatedPoints = points.map((item) => {
      if (item.loc && typeof item.loc === "string") {
        const [lat, lng] = item.loc.split(",").map(Number);
        return { ...item, lat, lng };
      }
      return { ...item, lat: null, lng: null };
    });

    const firstValidPoint = updatedPoints.find(
      (item) => item.lat !== null && item.lng !== null
    );

    if (firstValidPoint) {
      setCenter([firstValidPoint.lat, firstValidPoint.lng]);
    } else {
      setCenter([36.022227982837855, 51.339111328125]);
    }

    setMarkers(updatedPoints);
    setLoadingFindPoint(false);
  }, [points]);

  const handlReturnNewPositionOnDrag = (lat, lng, id) => {
    returnNewPositionOnDrag(lat, lng, id);
  };

  //جستجو در این منطقه
  const handleSearchInArea = () => {
    if (!mapRef.current) return;
  
    setLoadingFindPoint(true);
  
    const map = mapRef.current;
    const center = map.getCenter();
    const zoom = map.getZoom();
  
    const trianglePoints = generateTrianglePoints(center.lat, center.lng, zoom);
  
    console.log("tri",trianglePoints);
    
    // ارسال مثلث به والد
    onPolygonDrawn(trianglePoints);
  
    setLoadingFindPoint(false);
  };
  
  
  
  const generateTrianglePoints = (centerLat, centerLng, zoom) => {
    // هر چی زوم بالاتر، مثلث کوچکتر باشه
    const zoomFactor = 0.005 * Math.pow(2, 8 - zoom); // عدد قابل تنظیمه
  
    const height = Math.sqrt(3) * zoomFactor;
    const halfWidth = zoomFactor;
  
    return [
      { lat: centerLat + (2 / 3) * height, lng: centerLng },
      { lat: centerLat - (1 / 3) * height, lng: centerLng - halfWidth },
      { lat: centerLat - (1 / 3) * height, lng: centerLng + halfWidth },
    ];
  };
  
  const generatePointsWithinBounds = (bounds, zoom) => {
    const { _northEast: ne, _southWest: sw } = bounds;
    const centerLat = (ne.lat + sw.lat) / 2;
    const centerLng = (ne.lng + sw.lng) / 2;
    const size = 2;
    return generateTrianglePoints(centerLat, centerLng, size);
  };

  // const generateTrianglePoints = (centerLat, centerLng, size = 0.01) => {
  //   const height = Math.sqrt(3) * size;
  //   const halfWidth = size;

  //   return [
  //     { lat: centerLat + (2 / 3) * height, lng: centerLng },
  //     { lat: centerLat - (1 / 3) * height, lng: centerLng - halfWidth },
  //     { lat: centerLat - (1 / 3) * height, lng: centerLng + halfWidth },
  //   ];
  // };

  const handleMarkerSelect = (id) => {
    setActiveMarkerId(id);
  };

  const satelliteTileUrl =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const standardMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return center.length === 2 ? (
    <MapContainer
      center={center}
      zoom={zoomDefault}
      scrollWheelZoom={scrollWheelZoomBool}
      className="rounded"
      style={{ height: "100%", width: "100%", margin: "0", padding: "0" }}
      // whenCreated={(mapInstance) => { // برای ورژن جدید کار نمی کند
      //   console.log("نقشه ساخته شد:", mapInstance);
      //   mapRef.current = mapInstance;
      // }}
    >
      <SetMapRef mapRef={mapRef} />
      {center.length === 2 && <ChangeMapView center={center} />}
      {dragable && returnNewPositionOnDrag && (
        <HandleDoubleClick
          onDoubleClick={(lat, lng) => returnNewPositionOnDrag(lat, lng)}
        />
      )}

      {!dragable && showSearch && (
        <Button
          variant="contained"
          color="white"
          onClick={handleSearchInArea}
          disabled={loadingFindPoint}
          sx={{
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            "&:disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            },
            minWidth: 100,
          }}
        >
          {loadingFindPoint ? (
            <CircularProgress size={24} sx={{ color: "black" }} />
          ) : (
            <Typography>جستجو در این منطقه</Typography>
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
          zIndex: 1000,
        }}
      >
        <SwitchMapButton
          callBack={() => setStandard((prev) => !prev)}
          mode={!!standard}
        />
      </Box>

      <TileLayer url={standard ? standardMap : satelliteTileUrl} />

      {markers.length <= 2 ? (
        markers.map((marker, index) => (
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
          {markers.map((marker, index) => (
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
  );
};

export default MyMap;
