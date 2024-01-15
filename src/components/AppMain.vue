<script >
import { store } from '../store';
import axios from 'axios';


export default {
  name: 'AppMain',
  name: 'App',
  data() {
    return {
      store,
      clickedDescription: 0
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
    },
    CercaGeneri(genreIds) {
      const Generi = genreIds
        .map(genreId => store.listgenres.find(genre => genre.id === genreId)?.name)
        .filter(Boolean) // Rimuove eventuali valori nulli
        .join(', ');

      return Generi !== '' ? Generi : 'Nessun genere disponibile';
    },
    getMovieList() {
      axios.get('https://api.themoviedb.org/3/genre/movie/list?language=it', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGMxNTZkMDE1YTVkNGVmNWI1NjAyMDgwMjRiMjU5NyIsInN1YiI6IjY1OWU3M2ZhNzc3NmYwMDIwMTNiNWE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OJLJqyoO0-Lih-r1kvsLE7trz52UcXnaed0DMtiXNt4'
        }
      })
        .then((res) => {
          // DEBUG
          console.log(res.data.genres);
          store.listgenres = res.data.genres;
        })
        .catch((err) => {
          console.error("Errore:", err);
        });

    },
    ChangeTextDescription() {
      console.log("Clicked");

      let cardDescriptions = document.querySelectorAll(".card-description");

      cardDescriptions.forEach((cardDescription) => {
        if (!this.clickedDescription) {
          cardDescription.style.webkitLineClamp = "initial";
          document.querySelectorAll(".card-description-continue").forEach(element => {
            element.innerHTML = 'Ritrai...'
          });
        }
        else {
          cardDescription.style.webkitLineClamp = "4";
          document.querySelectorAll(".card-description-continue").forEach(element => {
            element.innerHTML = 'Continua...'
          });
        }
      });
      this.clickedDescription = !this.clickedDescription;
    },

    calcVote(numero) {
      return Math.round((numero / 2))
    },

  },
  mounted() {
    this.getMovieList();

  }

}


</script>

<template>
  <div class="container">

    <div v-if="store.listmovie.length && store.movieSearch.length">
      <div v-for="el, i in 2" :key="i">
        <ul v-if="i === 0">
          <h4> Film </h4>
          <div class="row justify-content-start gy-4 ">
            <div class="col-3" v-for="(movie, i) in store.listmovie" :key="movie.id">
              <div class="wrapper">
                <div class="card border-0 front-face ">
                  <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/h632/${movie.poster_path}`"
                    class="rounded-1 shadow" alt="">
                  <img v-else src="../assets/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.png" alt=""
                    class="rounded-1 shadow">
                </div>
                <div class=" card back-face card-back overflow-auto">
                  <div class="image_back_face">
                    <img v-if="movie.backdrop_path" :src="`https://image.tmdb.org/t/p/h632/${movie.backdrop_path}`"
                      class="rounded-1 shadow" alt="">
                    <img v-else src="../assets/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.webp"
                      alt="" class="rounded-1 shadow bandiere">
                  </div>
                  <div class="card-content">
                    <h3 class="fs-6 fw-bold">{{ movie.title }}</h3>
                    <p class="card-description " id="card_description">
                      {{ movie.overview }}
                    </p>
                    <span class="card-description-continue text-danger"
                      @click="ChangeTextDescription()">Continua...</span>
                    <h5 class="fs-6"> Generi associati: {{ CercaGeneri(movie.genre_ids) }}</h5>
                  </div>
                  <h6 v-if="movie.original_title != movie.title">Titolo Originale: {{ movie.original_title }}</h6>
                  <p><lang-flag :iso="linguaPaese(movie.original_language) ? movie.original_language : ''" size="big"
                      :squared="false" :title="movie.original_title" class="bandiere" />
                  <p><font-awesome-icon v-for="(index, i) in 5" :key="i"
                      :icon="i < calcVote(movie.vote_average) ? ['fas', 'star'] : ['far', 'star']" /></p>
                  <img v-if="!linguaPaese(movie.original_language)" src="https://flagicons.lipis.dev/flags/4x3/xx.svg"
                    alt="" class="no_bandiere">
                  </p>
                  <a href="#">Altre Info</a>
                </div>
                <!-- <div class="card back-face">
                  <h3>Titolo: {{ movie.name }}</h3>
                  <div class="d-flex justify-content-center">
                    {{ movie.name }}
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </ul>
        <ul v-if="i === 1">
          <h4> Serie Tv </h4>
          <div class="row justify-content-start gy-4 ">
            <div class="col-3" v-for="(tv, i) in store.listTvseries" :key="tv.id">
              <div class="wrapper">
                <div class="card border-0 front-face ">
                  <img v-if="tv.poster_path" :src="`https://image.tmdb.org/t/p/h632/${tv.poster_path}`"
                    class="rounded-1 shadow" alt="">
                  <img v-else src="../assets/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.png" alt=""
                    class="rounded-1 shadow">
                </div>
                <div class=" card back-face card-back overflow-auto">
                  <div class="image_back_face">
                    <img v-if="tv.backdrop_path" :src="`https://image.tmdb.org/t/p/h632/${tv.backdrop_path}`"
                      class="rounded-1 shadow" alt="">
                    <img v-else src="../assets/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.webp"
                      alt="" class="rounded-1 shadow bandiere">
                  </div>
                  <div class="card-content">
                    <h3 class="fs-6 fw-bold">{{ tv.name }}</h3>
                    <p class="card-description ">
                      {{ tv.overview }}
                    </p>
                    <span class="card-description-continue text-danger"
                      @click="ChangeTextDescription()">Continua...</span>
                    <h5 class="fs-6"> Generi associati: {{ CercaGeneri(tv.genre_ids) }}</h5>
                  </div>
                  <h6>Titolo Originale: {{ tv.original_name }}</h6>
                  <p><lang-flag :iso="linguaPaese(tv.original_language) ? tv.original_language : ''" size="big"
                      :squared="false" :title="tv.original_title" class="bandiere" />
                  <p><font-awesome-icon v-for="(index, i) in 5" :key="i"
                      :icon="i < calcVote(tv.vote_average) ? ['fas', 'star'] : ['far', 'star']" /></p>
                  <img v-if="!linguaPaese(tv.original_language)" src="https://flagicons.lipis.dev/flags/4x3/xx.svg" alt=""
                    class="no_bandiere">
                  </p>
                  <a href="#">Altre Info</a>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div v-else class="text-light mt-4">
      <div class="d-flex justify-content-center">
        <h4> Nessun Film/ Serie Tv Trovata! </h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss' as *;
@use '../styles/partials/variables' as *;

.poster_no_found {
  background-color: #111111;
}

.image_back_face {
  height: 150px;

  img {
    object-fit: cover;
    object-fit: center;
  }
}

.bandiere {
  width: 75px;
  height: 75px;
}

.card-back .no_bandiere {
  /* La tua regola CSS qui */
  height: 75px;
  width: 75px;
  object-fit: none;
}


.card-back {
  width: 100%;
  background-color: #333;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-align: center;
  color: #fff;
}

.card-back img {
  width: 100%;
  height: auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-content {
  padding: 16px;

}

.full-description {
  -webkit-line-clamp: none;
}

.card-description-continue {
  cursor: pointer;
}

.card-description {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.card-back p {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 8px;
}

.card-back a {
  color: #e50914;
  text-decoration: none;
  font-weight: bold;
}

.card-back a:hover {
  text-decoration: underline;
}


.wrapper {
  height: 450px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;

  .back-face {
    display: flex;
    flex-direction: column;
    transform: rotateY(180deg);
    color: #fff;
    background: #333;
    /* Colore di sfondo per il back-face */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    h3 {
      margin-bottom: 10px;
      font-size: 24px;
    }
  }
}

.wrapper {
  .card {
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translateY(0deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);

  }
}

.wrapper:hover {
  .front-face {
    transform: rotateY(-180deg);
  }

  .back-face {
    transform: rotateY(0deg);
  }
}







.card {
  img {
    height: 100%;
    object-fit: cover;

  }
}



ul {
  list-style-type: none;

  margin-bottom: 20px;
}
</style>