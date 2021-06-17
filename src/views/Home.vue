`
<template>
  <div class="home">
    <div v-for="apartment in apartmentList" :key="apartment.id">
      <p>{{ apartment.daily_rate }}</p>
      <p>{{ apartment.description }}</p>
      <p>{{ apartment.distance }}</p>
    </div>

    <div>
      <p>
        <label for="search-bar">Description, country, city: </label>
        <input
            id="search-bar"
            v-model="formData.search_bar"
            type="text">
      </p>
      <p>
        <label for="daily-rate">Max daily rate: </label>
        <input
            id="daily-rate"
            v-model="formData.daily_rate"
            type="number">
      </p>
      <p>
        <label for="square-area">Minimal square area: </label>
        <input
            id="square-area"
            v-model="formData.square_area"
            type="number">
      </p>
      <p>
        <label for="room-amount">Desired room amount: </label>
        <select id="room-amount" v-model="formData.room_amount">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">More than four</option>
        </select>
      </p>
      <p>
        <label for="bedroom-amount">Choose a desired bedroom amount: </label>
        <select id="bedroom-amount" v-model="formData.bedroom_amount">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">More than four</option>
        </select>
      </p>
      <p>
        <label for="rating">Minimal rating: </label>
        <select id="rating" v-model="formData.rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>
      <p>Convenience items: </p>
      <ul>
        <li>
          <input type="checkbox" id="WIFI" value="WIFI" v-model="formData.convenience_items">
          <label for="WIFI">WiFi</label>
        </li>
        <li>
          <input type="checkbox" id="COND" value="COND" v-model="formData.convenience_items">
          <label for="COND">Conditioner</label>
        </li>
        <li>
          <input type="checkbox" id="WSHM" value="WSHM" v-model="formData.convenience_items">
          <label for="WSHM">Waching machine</label>
        </li>
        <li>
          <input type="checkbox" id="DSHW" value="DSHW" v-model="formData.convenience_items">
          <label for="DSHW">Dishwasher</label>
        </li>
        <li>
          <input type="checkbox" id="HRDR" value="HRDR" v-model="formData.convenience_items">
          <label for="HRDR">Hairdryer</label>
        </li>
        <li>
          <input type="checkbox" id="MNBR" value="MNBR" v-model="formData.convenience_items">
          <label for="MNBR">Minibar</label>
        </li>
        <li>
          <input type="checkbox" id="LLPH" value="LLPH" v-model="formData.convenience_items">
          <label for="LLPH">Landline phone</label>
        </li>
        <li>
          <input type="checkbox" id="CLLN" value="CLLN" v-model="formData.convenience_items">
          <label for="CLLN">Clean linen</label>
        </li>
      </ul>
      {{formData}}

      <Map ref="map" @markerCreation="onMapUpdate"/>
      <input type="button"
             value="Submit"
             @click="getApartments">
    </div>
  </div>
  <Pagination :total="total" :items="apartmentList.length" @page-changed="getApartments"/>
</template>


<script>
import Pagination from "@/components/Pagination";
import axios from "axios";
import Map from "@/components/Map";


export default {
  name: 'Home',
  data() {
    return {
      homeURL: `${axios.defaults.baseURL}home/`,
      apartmentList: [],
      total: 0,
      formData: {
        search_bar: '',
        location: '',
        daily_rate: '',
        square_area: '',
        room_amount: '',
        bedroom_amount: '',
        convenience_items: [],
        rating: '',
        page: 1,
      },
    }
  },
  components: {
    Pagination,
    Map,
  },
  mounted() {
    this.getApartments()
  },
  methods: {
    getApartments() {
      axios.get(
          this.homeURL,
          {
            params: this.formData,
          }
      ).then(
          response => {
            this.total = response.data['count'];
            this.apartmentList = response.data['results'];
          }
      ).catch(err => console.log(err))
    },
    onMapUpdate(value) {
      this.formData.location = value
    },
  }
}
</script>

<style scoped>

</style>


`