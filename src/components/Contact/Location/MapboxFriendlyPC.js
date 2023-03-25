import "mapbox-gl/dist/mapbox-gl.css";
import { React, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "react-bootstrap";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "../../../assets/scss/mapbox.scss";
import { Intermediary } from "./Intermediary";

//component

export const MapboxFriendlyPC = (data) => {
  const mapRef = useRef(null);
  const [showbutton, setShowbutton] = useState(false);
  const [selectLocation, setSelectLocation] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: 21.0281908,
    longitude: 105.854319503897,
    zoom: 10,
  });

  useEffect(() => {
    mapRef.current?.on("load", () => {
      mapRef.current.resize();
    });
  }, []);

  const getElementDetail = document.getElementById("Point_Detail");
  const handleClickPoint = (point) => {
    getElementDetail.innerHTML = `
    <div class="branch__detail animation__open__branch__detail">
    <div class="branch__img"></div>
    <div class="branch__detail-content">
      <div class="branch__info-location">
        <span class="info-location-NameBranch">${point.properties.name}</span>
        <div class="info__underline"></div>
        <h2 class="info-location-headingFont">Địa chỉ</h2>
        <p class="info-location-paragFont">${point.properties.text}</p>
      </div>
      <div class="info__underline"></div>
      <div class="branch__info-hotline">
        <h2 class="info-location-headingFont">Hotline</h2>
        <p class="info-location-paragFont">${point.properties.hotline}</p>
      </div>
    </div>
    </div>
    `;
    setSelectLocation(point);
    setShowbutton(true);
    // <i id="test" class="fa-sharp fa-solid fa-circle-xmark btn__close-DetailBranch"></i>
    mapRef.current?.flyTo({
      center: [point.geometry.coordinates[0], point.geometry.coordinates[1]],
      zoom: 15,
    });
  };

  const FindToWAy = () => {
    
  };

  return (
    <>
      <div className="MapboxFriendlyPC">
        <div className="mapOffice">
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <GeolocateControl
              poisition="top-left"
              trackUserLocation
              onGeolocate={(e) =>
                dispatchEvent({
                  payload: e.coords.longitude,
                  lat: e.coords.latitude,
                })
              }
            />
            {!!data.locationFriendlyPC &&
              data.locationFriendlyPC.map((item, index) => (
                <>
                  <Marker
                    key={index}
                    longitude={item.geometry.coordinates[0]}
                    latitude={item.geometry.coordinates[1]}
                    anchor="bottom"
                    onClick={() => handleClickPoint(item)}
                  >
                    <img
                      style={{ width: "48px", height: "48px" }}
                      src="https://i.imgur.com/SBuNpAm.jpg"
                    />
                  </Marker>
                </>
              ))}
          </ReactMapGL>
        </div>
        <div id="Point_Detail"></div>
        <Intermediary getMap={mapRef?.current} />
        {/* <div className="button-find-way">
        {!!showbutton && (
          <Button color="primary" onClick={FindToWAy}>
            Tìm đường đi
          </Button>
        )}
      </div> */}
      </div>
      
    </>
  );
};

export default MapboxFriendlyPC;
