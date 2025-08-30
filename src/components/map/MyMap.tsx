import { MapContainer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Feature } from "geojson";
import { Layer } from "leaflet";
import geodata from "../../data/countries_WH.json";
import "leaflet/dist/leaflet.css";
import "../../styles/MyMap.css";
import { useEffect, useRef, useState } from "react";
import usePrevious from "react-use-previous";
import createMapData from "../../hooks/useGeoDensityData";
import Legend from "./Legend";
import MapInfoBox from "./MapInfoBox";
import useData from "../../hooks/useData";
//import densityData from "../../data/testdata.json";
import { useQuery } from "@tanstack/react-query";
import createSampleCountryQueryOptions from "../../api/queryOptions/sampleCountryQueryOptions";
import useAuth from "../../hooks/useAuth";

const COLOR_SELECT = "yellow";
const WEIGHT_SELECT = 2;

//interface Density {
//  iso_a3: string;
//  density: number;
//}

const MyMap = () => {
  const { selectedFeature, setSelectedFeature, setCountryCode } = useData();

  const geoJsonRef = useRef(null);

  // get user authentication data
  const { auth } = useAuth();

  // get density data
  const {
    data: densityData,
    error,
    isPending,
  } = useQuery(createSampleCountryQueryOptions(auth.accessToken));

  // update geodata with density data
  createMapData(geodata, densityData);

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
      //setSelectedFeature(layer.feature.properties);
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
      feature.properties.iso_a3.toLowerCase() ===
        //selectedFeature.iso_a3.toLowerCase()
        selectedFeature
    ) {
      mapStyle.fillColor = COLOR_SELECT;
      mapStyle.weight = WEIGHT_SELECT;
    }

    return mapStyle;
  };

  useEffect(() => {
    if (geoJsonRef.current && selectedFeature) {
      const layer: any = geoJsonRef.current;
      let layer2 = layer.getLayers().find(
        (layer: any) =>
          layer.feature.properties.iso_a3.toLowerCase() ===
          //selectedFeature.iso_a3.toLowerCase()
          selectedFeature
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

  return (
    <div>
      <MapContainer
        style={{ height: "75vh", width: "75vw" }}
        zoom={2}
        center={[25, 10]}
      >
        <GeoJSON
          data={geodata as GeoJsonObject}
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
    </div>
  );
};

export default MyMap;
