import OrderList from "./screens/OrderList";

const router = async () => {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = await OrderList.render();
  if(OrderList.after_render) await OrderList.after_render();
}

window.addEventListener('load', router);