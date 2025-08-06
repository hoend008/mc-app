import { ResponsiveChoropleth } from "@nivo/geo";

import world_features from "../assets/world_countries.json";
import useAuth from "../hooks/useAuth";
import useSampleCountry from "../hooks/useSampleCountry";

const data = [
  {
    id: "AFG",
    value: 579499,
  },
  {
    id: "AGO",
    value: 955129,
  },
  {
    id: "ALB",
    value: 517676,
  },
  {
    id: "ARE",
    value: 426637,
  },
  {
    id: "ARG",
    value: 813444,
  },
  {
    id: "ARM",
    value: 921318,
  },
  {
    id: "ATA",
    value: 862560,
  },
  {
    id: "ATF",
    value: 34765,
  },
  {
    id: "AUT",
    value: 23692,
  },
  {
    id: "AZE",
    value: 357108,
  },
  {
    id: "BDI",
    value: 551294,
  },
  {
    id: "BEL",
    value: 360061,
  },
  {
    id: "BEN",
    value: 383527,
  },
  {
    id: "BFA",
    value: 195783,
  },
  {
    id: "BGD",
    value: 254444,
  },
  {
    id: "BGR",
    value: 152958,
  },
  {
    id: "BHS",
    value: 537331,
  },
  {
    id: "BIH",
    value: 456276,
  },
  {
    id: "BLR",
    value: 301135,
  },
  {
    id: "BLZ",
    value: 920297,
  },
  {
    id: "BOL",
    value: 857760,
  },
  {
    id: "BRN",
    value: 805762,
  },
  {
    id: "BTN",
    value: 305454,
  },
  {
    id: "BWA",
    value: 362472,
  },
  {
    id: "CAF",
    value: 994882,
  },
  {
    id: "CAN",
    value: 589520,
  },
  {
    id: "CHE",
    value: 682876,
  },
  {
    id: "CHL",
    value: 140773,
  },
  {
    id: "CHN",
    value: 944501,
  },
  {
    id: "CIV",
    value: 889855,
  },
  {
    id: "CMR",
    value: 647130,
  },
  {
    id: "COG",
    value: 371607,
  },
  {
    id: "COL",
    value: 89476,
  },
  {
    id: "CRI",
    value: 465945,
  },
  {
    id: "CUB",
    value: 248861,
  },
  {
    id: "-99",
    value: 528774,
  },
  {
    id: "CYP",
    value: 981256,
  },
  {
    id: "CZE",
    value: 583048,
  },
  {
    id: "DEU",
    value: 788771,
  },
  {
    id: "DJI",
    value: 63978,
  },
  {
    id: "DNK",
    value: 96289,
  },
  {
    id: "DOM",
    value: 263205,
  },
  {
    id: "DZA",
    value: 456526,
  },
  {
    id: "ECU",
    value: 934446,
  },
  {
    id: "EGY",
    value: 108231,
  },
  {
    id: "ERI",
    value: 814282,
  },
  {
    id: "ESP",
    value: 365521,
  },
  {
    id: "EST",
    value: 975707,
  },
  {
    id: "ETH",
    value: 40718,
  },
  {
    id: "FIN",
    value: 684685,
  },
  {
    id: "FJI",
    value: 490675,
  },
  {
    id: "FLK",
    value: 649600,
  },
  {
    id: "FRA",
    value: 581751,
  },
  {
    id: "GAB",
    value: 147001,
  },
  {
    id: "GBR",
    value: 412099,
  },
  {
    id: "GEO",
    value: 58168,
  },
  {
    id: "GHA",
    value: 940773,
  },
  {
    id: "GIN",
    value: 13842,
  },
  {
    id: "GMB",
    value: 617467,
  },
  {
    id: "GNB",
    value: 259887,
  },
  {
    id: "GNQ",
    value: 306160,
  },
  {
    id: "GRC",
    value: 646690,
  },
  {
    id: "GTM",
    value: 207792,
  },
  {
    id: "GUY",
    value: 962098,
  },
  {
    id: "HND",
    value: 439143,
  },
  {
    id: "HRV",
    value: 836162,
  },
  {
    id: "HTI",
    value: 991221,
  },
  {
    id: "HUN",
    value: 891108,
  },
  {
    id: "IDN",
    value: 758496,
  },
  {
    id: "IND",
    value: 984764,
  },
  {
    id: "IRL",
    value: 643033,
  },
  {
    id: "IRN",
    value: 626782,
  },
  {
    id: "IRQ",
    value: 714317,
  },
  {
    id: "ISL",
    value: 86961,
  },
  {
    id: "ISR",
    value: 961860,
  },
  {
    id: "ITA",
    value: 844484,
  },
  {
    id: "JAM",
    value: 422878,
  },
  {
    id: "JOR",
    value: 568893,
  },
  {
    id: "JPN",
    value: 218352,
  },
  {
    id: "KAZ",
    value: 191156,
  },
  {
    id: "KEN",
    value: 62229,
  },
  {
    id: "KGZ",
    value: 810120,
  },
  {
    id: "KHM",
    value: 606090,
  },
  {
    id: "OSA",
    value: 510186,
  },
  {
    id: "KWT",
    value: 929031,
  },
  {
    id: "LAO",
    value: 702308,
  },
  {
    id: "LBN",
    value: 770821,
  },
  {
    id: "LBR",
    value: 102439,
  },
  {
    id: "LBY",
    value: 597504,
  },
  {
    id: "LKA",
    value: 849619,
  },
  {
    id: "LSO",
    value: 526383,
  },
  {
    id: "LTU",
    value: 401888,
  },
  {
    id: "LUX",
    value: 756302,
  },
  {
    id: "LVA",
    value: 883691,
  },
  {
    id: "MAR",
    value: 384105,
  },
  {
    id: "MDA",
    value: 475068,
  },
  {
    id: "MDG",
    value: 611320,
  },
  {
    id: "MEX",
    value: 790785,
  },
  {
    id: "MKD",
    value: 983426,
  },
  {
    id: "MLI",
    value: 409257,
  },
  {
    id: "MMR",
    value: 843306,
  },
  {
    id: "MNE",
    value: 422783,
  },
  {
    id: "MNG",
    value: 310316,
  },
  {
    id: "MOZ",
    value: 415521,
  },
  {
    id: "MRT",
    value: 692003,
  },
  {
    id: "MWI",
    value: 150168,
  },
  {
    id: "MYS",
    value: 655177,
  },
  {
    id: "NAM",
    value: 629852,
  },
  {
    id: "NCL",
    value: 184937,
  },
  {
    id: "NER",
    value: 449128,
  },
  {
    id: "NGA",
    value: 814888,
  },
  {
    id: "NIC",
    value: 714390,
  },
  {
    id: "NLD",
    value: 489796,
  },
  {
    id: "NOR",
    value: 848224,
  },
  {
    id: "NPL",
    value: 724001,
  },
  {
    id: "NZL",
    value: 494874,
  },
  {
    id: "OMN",
    value: 439665,
  },
  {
    id: "PAK",
    value: 981427,
  },
  {
    id: "PAN",
    value: 553125,
  },
  {
    id: "PER",
    value: 155795,
  },
  {
    id: "PHL",
    value: 979146,
  },
  {
    id: "PNG",
    value: 610675,
  },
  {
    id: "POL",
    value: 843111,
  },
  {
    id: "PRI",
    value: 843284,
  },
  {
    id: "PRT",
    value: 46437,
  },
  {
    id: "PRY",
    value: 732135,
  },
  {
    id: "QAT",
    value: 840707,
  },
  {
    id: "ROU",
    value: 576667,
  },
  {
    id: "RUS",
    value: 71234,
  },
  {
    id: "RWA",
    value: 886659,
  },
  {
    id: "ESH",
    value: 544295,
  },
  {
    id: "SAU",
    value: 845101,
  },
  {
    id: "SDN",
    value: 976324,
  },
  {
    id: "SDS",
    value: 950442,
  },
  {
    id: "SEN",
    value: 19791,
  },
  {
    id: "SLB",
    value: 159008,
  },
  {
    id: "SLE",
    value: 940895,
  },
  {
    id: "SLV",
    value: 812633,
  },
  {
    id: "ABV",
    value: 64007,
  },
  {
    id: "SOM",
    value: 579458,
  },
  {
    id: "SRB",
    value: 710917,
  },
  {
    id: "SUR",
    value: 935615,
  },
  {
    id: "SVK",
    value: 34217,
  },
  {
    id: "SVN",
    value: 738537,
  },
  {
    id: "SWZ",
    value: 963370,
  },
  {
    id: "SYR",
    value: 705480,
  },
  {
    id: "TCD",
    value: 899655,
  },
  {
    id: "TGO",
    value: 371041,
  },
  {
    id: "THA",
    value: 973494,
  },
  {
    id: "TJK",
    value: 995136,
  },
  {
    id: "TKM",
    value: 911357,
  },
  {
    id: "TLS",
    value: 564756,
  },
  {
    id: "TTO",
    value: 905057,
  },
  {
    id: "TUN",
    value: 591015,
  },
  {
    id: "TUR",
    value: 558733,
  },
  {
    id: "TWN",
    value: 117654,
  },
  {
    id: "TZA",
    value: 744118,
  },
  {
    id: "UGA",
    value: 938250,
  },
  {
    id: "UKR",
    value: 653015,
  },
  {
    id: "URY",
    value: 783947,
  },
  {
    id: "USA",
    value: 137892,
  },
  {
    id: "UZB",
    value: 981438,
  },
  {
    id: "VEN",
    value: 830754,
  },
  {
    id: "VNM",
    value: 99715,
  },
  {
    id: "VUT",
    value: 926846,
  },
  {
    id: "PSE",
    value: 46907,
  },
  {
    id: "YEM",
    value: 467929,
  },
  {
    id: "ZAF",
    value: 539808,
  },
  {
    id: "ZMB",
    value: 575197,
  },
  {
    id: "ZWE",
    value: 777114,
  },
  {
    id: "KOR",
    value: 340614,
  },
];

const ChoroplethSamples = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get sample year data
  const { data, error, isLoading } = useSampleCountry(auth.accessToken);

  return (
    <div style={{ height: 600, width: 1200 }}>
      <ResponsiveChoropleth /* or Choropleth for fixed dimensions */
        data={data}
        features={world_features.features}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
        colors="YlOrRd"
        domain={[0, 40000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionType="equirectangular"
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: true,
            translateX: 20,
            translateY: -20,
            itemsSpacing: 0,
            itemWidth: 74,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
          },
        ]}
      />
    </div>
  );
};

export default ChoroplethSamples;
