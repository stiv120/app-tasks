import Vue from 'vue';
import Vuex from 'vuex';
import TaskList from './components/TaskList.vue';
import store from './store';
import axios from 'axios';
import vSelect from 'vue-select';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Vuex);
Vue.use(Toast);
// Esto hace que $toast esté disponible globalmente
Vue.prototype.$toast = Vue.$toast;
Vue.component("v-select", vSelect);
// Configuración global de Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Cambia esto a tu URL base si es necesario
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const app = new Vue({
    el: '#app',
    store, // Agrega el store a la instancia de Vue
    components: { TaskList },
});
