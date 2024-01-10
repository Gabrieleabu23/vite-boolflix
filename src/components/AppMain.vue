<script >
import { store } from '../store'
export default {
    name:'AppMain',
    data() {
    return {
      store
    }
  },
}
</script>

<template>
    <ul>
        <li v-for="movie,i in store.listmovie" :key="movie">{{ movie.title }}</li>
    </ul>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;
</style>
