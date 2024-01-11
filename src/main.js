import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LangFlag from 'vue-lang-code-flags';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(far,fas);

// Configura il componente globale FontAwesomeIcon
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

// Registra il componente globalmente
app.component('lang-flag', LangFlag);

// Monta l'app
app.mount('#app');
