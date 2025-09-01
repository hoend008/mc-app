import { MapContainer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Feature } from "geojson";
import { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/MyMap.css";
import { useEffect, useRef, useState } from "react";
import usePrevious from "react-use-previous";
import Legend from "./Legend";
import MapInfoBox from "./MapInfoBox";
import useData from "../../hooks/useData";
import { CircularProgress, Typography } from "@mui/material";
import { chartMainColor } from "../MapGauge";

const COLOR_SELECT = "yellow";
const WEIGHT_SELECT = 2;

interface Props {
  mapData: GeoJsonObject;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
  chartMainColor: chartMainColor[];
}

const MyMap = ({
  mapData,
  error,
  isPending,
  isSuccess,
  chartMainColor,
}: Props) => {

const mapPolygonColorToDensity = (density: number, MAPCOLORS: chartMainColor[]) => {
  return density > 10000 //0000000
    ? MAPCOLORS[0].color
    : density > 5000 //0000000
    ? MAPCOLORS[1].color
    : density > 2500 //0000000
    ? MAPCOLORS[2].color
    : density > 1000 //0000000
    ? MAPCOLORS[3].color
    : density > 500 //0000000
    ? MAPCOLORS[4].color
    : MAPCOLORS[5].color;
};

const { selectedFeature, setSelectedFeature, setCountryCode } = useData();

  const geoJsonRef = useRef(null);

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
      if (layer.feature.properties.density) {
        setSelectedFeature(layer.feature.properties.iso_a3.toLowerCase());
        setCountryCode(layer.feature.properties.iso_a3.toLowerCase());
      }
    } else {
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
      fillColor: mapPolygonColorToDensity(feature.properties?.density, chartMainColor),
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

  console.log(chartMainColor);
  return (
    <div>
      {isSuccess ? (
        <MapContainer
          style={{ height: "50vh", width: "50vw" }}
          zoom={1}
          center={[35, 20]}
        >
          <GeoJSON
            data={mapData as GeoJsonObject}
            style={style}
            onEachFeature={onEachCountry}
            ref={geoJsonRef}
          />
          <div style={{ position: "absolute", top: 5, right: 5, zIndex: 1000 }}>
            <Legend chartMainColor={chartMainColor} />
          </div>
          <div style={{ position: "absolute", bottom: 0, zIndex: 1000 }}>
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
