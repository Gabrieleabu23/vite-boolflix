import { reactive } from "vue";
export const store= reactive({
    // PER AXIOS
    apigeneralUrl:'https://api.themoviedb.org/3/search/',
    typesearch:'movie',
    api_key:'&api_key=fdc156d015a5d4ef5b560208024b2597',
    // VARIABILI
    listmovie:[]
})