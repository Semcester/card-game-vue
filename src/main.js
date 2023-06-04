import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/arya-orange/theme.css";

createApp(App).use(PrimeVue).use(store).mount("#app");
