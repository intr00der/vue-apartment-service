<template>
  <div class="map" ref="map"></div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: null,
      marker: null,
      location: null,
    }
  },
  mounted() {
    window.initMap = () => {
      this.map = new google.maps.Map((this.$refs.map), {
        center: {lat: 55.8, lng: 37.6},
        zoom: 8,
      });
      this.map.addListener("click", (e) => {
        this.placeMarkerAndPanTo(e.latLng);
      });
    };


    const googleMapScript = document.createElement('script');
    googleMapScript.setAttribute('id', 'googleMap');
    googleMapScript.setAttribute(
        'src',
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPDWxN99vf4GeODTmPFUlJNjQFe-KDyEQ&callback=initMap&libraries=places&v=weekly"
    );
    document.body.appendChild(googleMapScript);
  },
  unmounted() {
    document.getElementById('googleMap').remove()
  },
  methods: {
    placeMarkerAndPanTo(latLng) {
      if (this.marker === null) {
        this.marker = new google.maps.Marker({position: latLng, map: this.map});
      }
      this.marker.setPosition(latLng)
      this.marker.setMap(this.map)
      this.location = `${this.marker.getPosition().lat()},${this.marker.getPosition().lng()}`
      this.$emit('markerCreation', this.location)
    },
  },
}

</script>

<style scoped>
.map {
  height: 500px;
  width: 100%;
}
</style>