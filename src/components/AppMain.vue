<script >
import { store } from '../store';



export default {
  name: 'AppMain',
  data() {
    return {
      store,
    }
  },
  methods: {
    linguaPaese(lingua) {
      let variabile = false;

      this.store.vet.forEach(item => {
        if (item[lingua]) {
          variabile = true;
        }
      });

      return variabile;
    }
  },
};


</script>

<template>
  <div v-for="el, i in 2" :key="i">
  <ul v-if="i === 0">
    <h4> Film </h4>
    <li v-for="(movie, index) in store.listmovie" :key="movie.id">
      <ul class="mb-4">
        <li>Titolo: {{ movie.title }}</li>
        <li>Titolo Originale: {{ movie.original_title }}</li>
        <li>Lingua Originale: {{ movie.original_language }}</li>
        <lang-flag :iso="linguaPaese(movie.original_language) ? movie.original_language : ''" size="big"
          :squared="false" title="bohasd" class="boh" />
        <!-- Altrimenti, mostra un'immagine di default -->
        <img v-if="!linguaPaese(movie.original_language)" src="https://flagicons.lipis.dev/flags/4x3/xx.svg" alt=""
          class="boh">
        <li>Voto: {{ (movie.vote_average / 2) }}</li>
      </ul>
    </li>
  </ul>
  <ul v-else>
    <h4> serie tv </h4>
    <li v-for="(tv, index) in store.listTvseries" :key="tv.id">
      <ul class="mb-4">
        <li>Titolo: {{ tv.name }}</li>
        <li>Titolo Originale: {{ tv.original_name }}</li>
        <li>Lingua Originale: {{ tv.original_language }}</li>
        <lang-flag :iso="linguaPaese(tv.original_language) ? tv.original_language : ''" size="big" :squared="false"
          title="bohasd" class="boh" />
        <!-- Altrimenti, mostra un'immagine di default -->
        <img v-if="!linguaPaese(tv.original_language)" src="https://flagicons.lipis.dev/flags/4x3/xx.svg" alt=""
          class="boh">
        <li>Voto: {{ (tv.vote_average / 2) }}</li>
      </ul>
    </li>
  </ul>
</div>

  
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;

.boh {
  width: 75px;
  height: 75px;
}

ul {
  list-style-type: none;

  margin-bottom: 20px;
}
</style>
