import { parseRequestUrl } from "./utils";
import HomeScreen from "./screens/HomeScreen.js"
import OrderScreen from "./screens/OrderScreen.js";
import BuyingScreen from "./screens/BuyingScreen.js";
import Error404Screen from "./screens/Error404Screen";

const routes = {
  '/': HomeScreen,
  '/order' : OrderScreen,
  '/buying' : BuyingScreen
}

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl = request.resource ? `/${request.resource}` : '/';
  const screen = routes[parseUrl]? routes[parseUrl]: Error404Screen;
  const main = document.getElementById('main-container');

  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
