interface Props {
  selectedFeature: any;
}

const MapInfoBox = ({ selectedFeature }: Props) => {
  const opacity = selectedFeature.name ? 1 : 0;

  return (
    <div className={"MapInfoBox"}>
      <h2 style={{ margin: "0 0 5px" }}>Corruption Index</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "2rem",
            width: "2rem",
            backgroundColor: selectedFeature.color,
            marginRight: "0.5rem",
            opacity: opacity,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "8.5rem",
          }}
        >
          <div style={{ fontSize: 14 }}>
            {selectedFeature.name ? selectedFeature.name : "Hover for score"}
          </div>
          {selectedFeature.name ? (
            <div
              style={{
                display: "flex",
                width: "5rem",
                height: "5rem",
                backgroundColor: "#E0E0E0",
                opacity: 1,
                borderRadius: "50%",
              }}
            >
              <div
                style={{
                  color: "black",
                  opacity: 1,
                  fontSize: 20,
                  margin: "auto",
                }}
              >
                {selectedFeature.density}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MapInfoBox;
