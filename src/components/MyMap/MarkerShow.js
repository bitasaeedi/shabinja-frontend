import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MarkerPopUp from "./MarkerPopUp";

const center = {
  lat: 51.505,
  lng: -0.09,
};

function MarkerShow({
  draggableLimit,
  returnNewPositionOnDrag,
  point,
  activeMarkerId,
  onMarkerSelect,
  dragable = false,
  showArea = false,
  showPopup = true,
}) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const isSelected = activeMarkerId === point.id;

  const togglePopup = useCallback(() => {
    setPopupOpen((prev) => !prev);
    onMarkerSelect(point.id);
  }, [onMarkerSelect, point.id]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef?.current;
        if (marker != null) {
          setPosition(marker?.getLatLng());
          const newLat = marker?.getLatLng()?.lat;
          const newLng = marker?.getLatLng()?.lng;
          if (newLat && newLng) {
            returnNewPositionOnDrag(newLat, newLng, point?.id);
          }
        }
      },
      click: () => {
        togglePopup();
      },
    }),
    [togglePopup, returnNewPositionOnDrag, point.id]
  );

  useEffect(() => {
    if (point?.lat && point?.lng) {
      setPosition({ lat: point.lat, lng: point.lng });
    }
  }, [point]);

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const homeIcon = useMemo(() => {
    return new L.divIcon({
      className: "",
      html: `
        <div 
          style="
            display: flex; 
            align-items: center; 
            justify-content: center; 
            width:${showArea ? "50px" : " 35px"}; 
            height: ${showArea ? "50px" : " 35px"}; 
            border-radius: 50%; 
            background-color: ${
              dragable || showArea
                ? "transparent"
                : isSelected
                ? "black"
                : "white"
            }; 
            color: ${
              dragable ? "rgb(204, 0, 1)" : isSelected ? "white" : "black"
            }; 
            font-size: ${dragable ? "40px" : "18px"};
            position: relative;
            border: ${showArea ? "3px solid blue" : "none"};
          "
        >
        ${
          showArea
            ? `
              <div 
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  background-color: rgba(0, 0, 255, 0.4);
                  z-index: 1;
                "
              ></div>
            `
            : ""
        }
        <i class="${
          showArea ? "" : dragable ? "fas fa-map-marker-alt" : "fas fa-home"
        }" 
        style="
        position: ${dragable ? "absolute" : "flex"}; 
        top: 0; 
        transform:${dragable ? "translateY(-40%)" : "0"} ; 
      "
      ></i>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });
  }, [isSelected]);

  return (
    <Marker
      draggable={dragable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={homeIcon}
    >
      {showPopup && (
        <Popup
          minWidth={"300px"}
          className="custom-popup"
          closeButton={false}
          onClose={() => setPopupOpen(false)} // Handle popup close
        >
          {isSelected && (
            <MarkerPopUp
              point={point}
              draggableLimit={draggableLimit}
              toggleDraggable={toggleDraggable}
              position={position}
              draggable={draggable}
            />
          )}
        </Popup>
      )}
    </Marker>
  );
}

export default MarkerShow;
