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
