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
  <div>
  </div>
  <ul>
    <li v-for="movie, i in store.listmovie" :key="movie.id">
      <ul class="mb-4">
        <li> Titolo : {{ movie.title }}</li>
        <li> Titolo Originale : {{ movie.original_title }}</li>
        <li> Lingua Originale : {{ movie.original_language }}</li>
        <lang-flag :iso="linguaPaese(movie.original_language) ? movie.original_language : ''" size="big"
          :squared="false" title="bohasd" class="boh" />

        <!-- Altrimenti, mostra un'immagine di default -->
        <img v-if="!linguaPaese(movie.original_language)" src="https://flagicons.lipis.dev/flags/4x3/xx.svg" alt=""
          class="boh">

        <li> Voto : {{ (movie.vote_average / 2) }}</li>
      </ul>
    </li>
  </ul>
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
