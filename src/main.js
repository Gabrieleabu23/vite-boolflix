import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LangFlag from 'vue-lang-code-flags';

const app = createApp(App);

// Registra il componente globalmente
app.component('lang-flag', LangFlag);

// Monta l'app
app.mount('#app');
