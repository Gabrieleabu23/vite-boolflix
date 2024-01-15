<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue'
import AppCard from './components/AppCard.vue'
import AppMain from './components/AppMain.vue'

import { store } from './store'
export default {
  components: {
    AppHeader,
    AppMain,
    AppCard
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getGeneralObject() {
      let typesearch;

      for (let i = 0; i < 2; i++) {
        switch (i) {
          case 0:
            typesearch = store.movieSearch;
            break;
          case 1:
            typesearch = store.tvseriesSearch;
            break;
        }

        axios
          .get(store.apigeneralUrl + typesearch + '?&' + store.api_key + '&query=' + store.searchMovieorTv + '&language=it-IT')
          .then((res) => {
            if (i === 0) {
              store.listmovie = res.data.results;
            } else if (i === 1) {
              store.listTvseries = res.data.results;
            }
          })
          .catch((err) => {
            console.log("Errori", err);
          });
        
      }
      console.log("Film: ",store.listmovie)
      console.log("Serie tv: ",store.listTvseries)
    }
  },
  created() {
    this.getGeneralObject();

  }
}
</script>

<template>
  <AppHeader @search="getGeneralObject" />
  <AppMain />
  <AppCard />
</template>

<style lang="scss">
@use './styles/general.scss' as *;
@use './styles/partials/variables' as *;
</style>
