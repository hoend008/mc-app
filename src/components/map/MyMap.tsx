import { MapContainer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Feature } from "geojson";
import { Layer } from "leaflet";
import geodata from "../../data/countries_WH.json";
import "leaflet/dist/leaflet.css";
import "../../styles/MyMap.css";
import { useEffect, useRef, useState } from "react";
import usePrevious from "react-use-previous";
import Legend from "./Legend";
import MapInfoBox from "./MapInfoBox";
import useData from "../../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createSampleCountryQueryOptions from "../../api/queryOptions/sampleCountryQueryOptions";
import useAuth from "../../hooks/useAuth";
import { CircularProgress, Typography } from "@mui/material";

const COLOR_SELECT = "yellow";
const WEIGHT_SELECT = 2;

const MyMap = () => {
  const { selectedFeature, setSelectedFeature, setCountryCode } = useData();

  const geoJsonRef = useRef(null);

  // get user authentication data
  const { auth } = useAuth();

  // get map density data
  const {
    data: mapData,
    error,
    isPending,
    isSuccess,
  } = useQuery(
    createSampleCountryQueryOptions(auth.accessToken, geodata as GeoJsonObject)
  );

  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const previousFeature = usePrevious<any>(selectedFeature);

  const highlightFeature = (e: any) => {
    let layer = e.target;
    setHoveredFeature(layer.feature.properties);
  };

  const resetHighlight = (e: any) => {
    setHoveredFeature(null);
  };

  const selectFeature = (e: any) => {
    let layer = e.target;
    // if no feature has been selected OR if the selected feature differs from the
    // previous selected feature -> setSelectedFeature. Otherwise, reset
    if (
      !previousFeature ||
      previousFeature.current !== layer.feature.properties.iso_a3.toLowerCase()
    ) {
      setSelectedFeature(layer.feature.properties.iso_a3.toLowerCase());
      setCountryCode(layer.feature.properties.iso_a3.toLowerCase());
    } else {
      console.log("resetting...");
      resetSelect();
      setCountryCode("");
    }
  };

  const resetSelect = () => {
    setSelectedFeature(null);
  };

  const onEachCountry = (feature: Feature, layer: Layer) => {
    const countryName = feature.properties?.name;
    const content = countryName + " " + feature.properties?.density;
    //layer.bindPopup(content);
    layer.bindTooltip(content);

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: selectFeature,
    });
  };

  const style = (feature: any) => {
    let mapStyle = {
      fillColor: feature.properties?.color,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.8,
    };

    if (hoveredFeature && feature.properties.iso_a3 === hoveredFeature.iso_a3) {
      mapStyle.fillOpacity = 0.6;
      mapStyle.weight = 3;
    }

    if (
      selectedFeature &&
      feature.properties.iso_a3.toLowerCase() === selectedFeature
    ) {
      mapStyle.fillColor = COLOR_SELECT;
      mapStyle.weight = WEIGHT_SELECT;
    }

    return mapStyle;
  };

  useEffect(() => {
    if (geoJsonRef.current && selectedFeature) {
      const layer: any = geoJsonRef.current;
      let layer2 = layer
        .getLayers()
        .find(
          (layer: any) =>
            layer.feature.properties.iso_a3.toLowerCase() === selectedFeature
        );
      let mapStyle = {
        fillColor: COLOR_SELECT,
        weight: WEIGHT_SELECT,
      };

      if (layer2) {
        layer2.setStyle(mapStyle);
      }
    }
  }, [selectedFeature]);

  // styles
  const defaultDiv = { height: "300px", width: "100%" };
  const extraDiv = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  if (isPending)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <CircularProgress color="success" size="5rem" />
      </div>
    );

  return (
    <div>
      {isSuccess ? (
        <MapContainer
          style={{ height: "75vh", width: "75vw" }}
          zoom={2}
          center={[25, 10]}
        >
          <GeoJSON
            data={mapData as GeoJsonObject}
            style={style}
            onEachFeature={onEachCountry}
            ref={geoJsonRef}
          />
          <div style={{ position: "absolute", bottom: 0, zIndex: 2000 }}>
            <Legend />
            {hoveredFeature ? (
              <MapInfoBox selectedFeature={hoveredFeature} />
            ) : (
              <MapInfoBox selectedFeature={{ density: "", name: "" }} />
            )}
          </div>
        </MapContainer>
      ) : null}
    </div>
  );
};

export default MyMap;
