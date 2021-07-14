import { getOrders } from '../api.js'

const OrderList = {
  after_render: () => {

  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    console.log(orderdata)
    return `
    ${orderdata.map((order) => 
      `<tr>
        <td>${order.order_id}</td>
        <td>${order.initial_order_amount.order_price_amount
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          .replace('.00','')
        }원</td>
        <td><img src={order.img} width="120px"></td>
        <td>${order.items[0].product_name}</td>
        <td>${order.items[0].option_value}</td>
        <td>${order.items[0].quantity}</td>
        <td>{order.saleprice}</td>
        <td>${order.billing_name}</td>
        <td>${order.receivers[0].phone}</td>
        <td>${order.receivers[0].zipcode}</td>
        <td>${order.receivers[0].address_full}</td>
        <td>
          <select>
            <option>배송준비중</option>
            <option>구매완료</option>
            <option>배송중</option>
            <option>배송완료</option>
          </select>
        </td>
        <td><a href="https://uk.louisvuitton.com/eng-gb/products/luxembourg-trainers-nvprod2480029v#1A8J0X">https://uk.louisvuitton.com/eng-gb/products/luxembourg-trainers-nvprod2480029v#1A8J0X</a></td>
        <td>Louis Vuitton</td>
        <td>£640</td>
        <td>1A8J0X</td>
        <td>
          <select>
            <option>온라인</option>
            <option>해로드</option>
            <option>셀브릿지</option>
            <option>본드스트릿</option>
            <option>슬론</option>
            <option>웨스트필드</option>
            <option>뱅크</option>
          </select>
        <td>오더넘버</td>
        <td>640</td>
        <td>13.07.2021</td>
        <td><button>수정</button></td>
      </tr>`
      ).join('\n')} 
    `
  } 
}

export default OrderList;