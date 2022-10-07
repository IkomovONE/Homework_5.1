import "./styles.css";

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";

  const res = await fetch(url);
  const data = await res.json();

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", { minZoom: -3 }).setView([61.5, 28.1], 7);

  let geoJson = L.geoJSON(data, {
    weight: 2
  }).addTo(map);

  let bounds = geoJson.getBounds();

  map.fitBounds(bounds);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);
};

fetchData();
