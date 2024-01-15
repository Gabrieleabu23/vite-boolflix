<script >

import { store } from '../store'
export default {
    name: 'AppHeader',
    data() {
        return {
            store
        }
    },
}
</script>

<template>
    <div class="height_header">
        <div class="d-flex w-100 px-4 align-items-center h-100 justify-content-between">
            <a href="" class="text-decoration-none">
                <h2 class="logo_boolflix fw-bold">BOOLFLIX</h2>
            </a>
            <nav class="navbar ">
                <div class="container-fluid">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Cerca Film o Serie Tv" aria-label="Search"
                            v-model.trim="store.searchMovieorTv">
                        <button class="btn btn-outline-success" type="submit" @click.prevent="$emit('search')">Cerca</button>
                    </form>
                </div>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;

.logo_boolflix {
    color: $red_text_boolflix;
}

.form-control:focus {
  border-color: red;
}

.btn-outline-success {
  --bs-btn-color: white;
  --bs-btn-border-color: red;
  --bs-btn-hover-color: #fff;
  --bs-btn-active-color: black;
  --bs-btn-active-bg: red;
  --bs-btn-active-border-color: red;
}



.btn:hover {
 
  color: black;
}



.btn:hover {

  background-color: var(--bs-red);
  border-color: var(--bs-red);
}

</style>
