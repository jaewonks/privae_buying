import { getOrders } from '../api.js'

const OrderList = {
  after_render: () => {

  },
  render: async () => {
    const orders = await getOrders();
    console.log(orders)
    return `
    ${orders.map((order) => 
      `<tr>
        <td>${order.orderdate}</td>
        <td>${order.ordernum}</td>
        <td>${order.paidprice}</td>
        <td><img src=${order.img} width="120px"></td>
        <td>${order.ordername}</td>
        <td>${order.color}</td>
        <td>${order.size}</td>
        <td>${order.tax}</td>
        <td>${order.qty}</td>
        <td>${order.saleprice}</td>
        <td>${order.customername}</td>
        <td>${order.phone}</td>
        <td>28807</td>
        <td>충청북도 청주시 상당구 중고개로 140 (용암동) 칸타빌더테라스1단지</td>
        <td>104동 501호</td>
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
        <td>파운드원가</td>
        <td>1A8J0X</td>
        <td>온라인</td>
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