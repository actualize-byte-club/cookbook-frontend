<script>
/* global mapboxgl, mapboxSdk */
export default {
  data: function () {
    return {
      address: "Bob's Donuts, San Francisco"
    };
  },
  mounted: function () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
      .forwardGeocode({
        query: "Bob's Donuts, San Francisco",
        autocomplete: false,
        limit: 1
      })
      .send()
      .then((response) => {
        if (
          !response ||
          !response.body ||
          !response.body.features ||
          !response.body.features.length
        ) {
          console.error("Invalid response:");
          console.error(response);
          return;
        }
        const feature = response.body.features[0];

        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: feature.center,
          zoom: 10
        });

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
      });
  },
  methods: {
    forwardGeocode: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
      const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.address,
          autocomplete: false,
          limit: 1
        })
        .send()
        .then((response) => {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }
          const feature = response.body.features[0];

          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: feature.center,
            zoom: 10
          });

          // Create a marker and add it to the map.
          new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        });
    }
  }
};
</script>

<template>
  <div class="geocode-map">
    <h2>Geocode Test</h2>
    <p>
      <input type="text" v-model="address" />
      <button v-on:click="forwardGeocode()">Search</button>
    </p>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
