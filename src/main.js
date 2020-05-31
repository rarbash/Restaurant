import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyBEC0Hx8ku6R9Pf9_1yPenVZONLuzenryc",
  authDomain: "restaurant-35f7b.firebaseapp.com",
  databaseURL: "https://restaurant-35f7b.firebaseio.com",
  projectId: "restaurant-35f7b",
  storageBucket: "restaurant-35f7b.appspot.com",
  messagingSenderId: "316844291720",
  appId: "1:316844291720:web:9d034ed4b1c7a063a7d13d",
  measurementId: "G-S1H0TSV5VN",
};

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
