<script >
import { computed } from 'vue';
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
            <h2 class="logo_boolflix fw-bold">BOOLFLIX</h2>
            <nav class="navbar ">
                <div class="container-fluid">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
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
</style>
