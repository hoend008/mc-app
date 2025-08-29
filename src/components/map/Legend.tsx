import { MAPCOLORS } from "./ColorUtils";

const Legend = () => {
  return (
    <div className={"LegendBox"}>
      {MAPCOLORS.map((c) => (
        <div
          key={c.value}
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
        >
          <div
            key={c.value}
            style={{
              width: "2rem",
              height: "2rem",
              backgroundColor: c.color,
            }}
          ></div>
          <div style={{ fontSize: 14 }}>{c.range}</div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
