<script>
/* global mapboxgl */
export default {
  data: function () {
    return {};
  },
  mounted: function () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-87.623177, 41.881832], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
    console.log(map);
    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "This is a place in Chicago"
    );
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
      .setLngLat([-87.623177, 41.881832])
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
    console.log(marker1);
    // create the popup
    const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
      "This is a place in San Francisco"
    );
    // Create a default Marker and add it to the map.
    const marker2 = new mapboxgl.Marker()
      .setLngLat([-122.431297, 37.773972])
      .setPopup(popup2) // sets a popup on this marker
      .addTo(map);
    console.log(marker2);
  }
};
</script>

<template>
  <div class="map">
    <h2>MapBox Test</h2>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
