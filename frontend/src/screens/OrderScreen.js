import { getOrders, getProduct } from '../api.js'

const OrderScreen = {
  after_render: () => {

  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    const getInfo = async (id, index) => {
      const data = await getProduct(id);
      console.log(data)
      document.getElementById(`ref${index}`).innerText = data;
    }; 
    
    return `
    <table class='order' cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <td>주문번호</td>
        <td>상품이미지</td>
        <td>주문상품명</td>
        <td>색상/사이즈/세금납부</td>
        <td>수량</td>
        <td>판매가</td>
        <td>수령인</td>
        <td>수령인연락처</td>
        <td>수령인주소</td>
        <td>개인통관고유번호</td>
        <td>상태</td>
        <td>링크</td>
        <td>파운드원가</td>
        <td>Ref.</td>
        <td>구매처</td>
        <td>오더넘버</td>
        <td>구매가격</td>
        <td>구매일자</td>
      </tr>
    </thead>
    <tbody id='tbody'>
    ${orderdata?orderdata.map((order, index) => 
      `<tr>
        <td>${order.order_id}</td>
        <td><img src='' width="120px"></td>
        <td>${order.items[0].product_name}</td>
        <td>${order.items[0].option_value
          .replaceAll(',','<br/>')
          .replaceAll('=','&emsp;')  
        }
        </td>
        <td>${order.items[0].quantity}</td>
        <td>${order.actual_order_amount.order_price_amount
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          .replace('.00','')
        }원</td>
        <td>${order.billing_name}</td>
        <td>${order.receivers[0].phone !== '--'?
          order.receivers[0].phone:
          order.receivers[0].cellphone}</td>
        <td>${order.receivers[0].address_full}&emsp;${order.receivers[0].zipcode}
        <td>${order.additional_order_info_list[0]?
          order.additional_order_info_list[0].value:
          order.receivers[0].clearance_information
        }
        </td>
        <td>
          <select>
            <option>배송준비중</option>
            <option>구매완료</option>
            <option>배송중</option>
            <option>배송완료</option>
          </select>
        </td>
        <td><a href="https://uk.louisvuitton.com/eng-gb/products/luxembourg-trainers-nvprod2480029v#1A8J0X">https://uk.louisvuitton.com/eng-gb/products/luxembourg-trainers-nvprod2480029v#1A8J0X</a></td>
        <td>£<input type="text" class="ori_price" /></td>
        <td id='ref${index}'>${getInfo(order.items[0].product_no, index)}</td>
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
        <td><input type="text" class="order_num" placeholder="오더넘버"/></td>
        <td>£<input type="text" class="ori_price" /></td>
        <td>13.07.2021</td>
        <td><button>수정</button></td>
      </tr>` 
      ).join('\n'):''} 
      </tbody>
      </table>
      <div class='container'>
        <div>
          <button>저장</button>
        </div>
      </div>
    `
  } 
}

export default OrderScreen;