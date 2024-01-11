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
      // ESEMPIO DI STAMPA - DEBUG
      // console.log(store.apigeneralUrl+store.typesearch+'?'+store.api_key+'&query=ritorno+al+futuro')
      console.log(store.apigeneralUrl+store.typesearch+'?'+store.api_key+'&query='+store.searchMovieorTv)
      axios
      // MILESTONE 0 - PER PROVA
        // .get(store.apigeneralUrl+store.typesearch+'?'+store.api_key+'&query=ritorno+al+futuro')
        .get(store.apigeneralUrl+store.typesearch+'?'+store.api_key+'&query='+store.searchMovieorTv+'&language=it-IT')
        .then((res) => {
          // DEBUG
          console.log(res.data.results);
          store.listmovie=res.data.results


        })
        
        .catch((err) => {
          console.log("Errori", err)
        });
    }
  },

  created(){
    this.getGeneralObject();
    
  }
}
</script>

<template>
  <AppHeader @search="getGeneralObject"/>
  <AppMain  />
  <AppCard/>
</template>

<style lang="scss">
@use './styles/general.scss' as *;
@use './styles/partials/variables' as *;
</style>
