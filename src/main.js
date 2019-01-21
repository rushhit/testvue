import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import * as VueGoogleMaps from "vue2-google-maps";
import VueRouter from 'vue-router';
import store from './store';
//import axios from 'axios';
//import VueAxios from 'vue-axios';
 
//Vue.use(VueAxios, axios);

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import prompt from 'vue-prompt';
Vue.use(prompt);

Vue.use(Loading);


Vue.use(VueRouter);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCQ8Dzk0JB_yp2oCGQp0U5fxRXjuayNIGg",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true


new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
