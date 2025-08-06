import Plot from 'react-plotly.js';

const PlotlyChart = () => {
  return (
    <Plot
      data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: ['MEXICO', 'CANADA', 'EL SALVADOR', 'FRANCE'],
            z: [1, 2, 3, 4],
            text: ['MEXICO', 'CANADA', 'EL SALVADOR', 'FRANCE'],
          },
        ]}
        layout={{
          margin: {t:10, b:10, l: 10, r: 10},
          paper_bgcolor: 'white',
          hoverlabel: {
            bordercolor: 'white',
          },
          geo: {
            scope: 'world',
            projection: {
              type: 'robinson',
            },
          },
          width: 1200, height: 500,
        }}
    />
  );
};

export default PlotlyChart;
