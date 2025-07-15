import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
  Polygon,
} from "react-leaflet";
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
  const [polygonPoints, setPolygonPoints] = useState([]);

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
    const polygonPoints = getVisibleMapCorners(map); // 5 points for drawing
    const apiPoints = polygonPoints.slice(0, 4); // 4 unique corners for API

    onPolygonDrawn(apiPoints); // Send only 4 points to API
    setPolygonPoints(polygonPoints); // Draw 5-point polygon on map

    setLoadingFindPoint(false);
  };

  const getVisibleMapCorners = (map) => {
    const bounds = map.getBounds();
    const ne = bounds.getNorthEast();
    const nw = bounds.getNorthWest();
    const sw = bounds.getSouthWest();
    const se = bounds.getSouthEast();

    // Return in order: NW, NE, SE, SW, NW (to close the polygon)
    return [
      { lat: nw.lat, lng: nw.lng },
      { lat: ne.lat, lng: ne.lng },
      { lat: se.lat, lng: se.lng },
      { lat: sw.lat, lng: sw.lng },
      { lat: nw.lat, lng: nw.lng }, // repeat first to close
    ];
  };

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

      {/* show selected area */}
      
      {/* {polygonPoints.length >= 4 && (
        <Polygon
          positions={polygonPoints.map(p => [p.lat, p.lng])}
          pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.3 }}
        />
      )} */}

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
