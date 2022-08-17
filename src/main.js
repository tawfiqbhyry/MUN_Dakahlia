import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import router from "./router";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import store from "./assets/store";

config.autoAddCss = false;
library.add(fas);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon, {});
app.use(store);
app.use(router);

app.mount("#app");
