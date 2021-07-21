import { getOrders, getProduct } from '../api.js'

const OrderScreen = {
  after_render: () => {

  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    const getInfo = async (id, index) => {
      const data = await getProduct(id);
      const img = data.detail_image;
      const ref = data.model_name;
      document.getElementById(`ref${index}`).innerText = ref;
      document.getElementById(`img${index}`).src = img;
    }; 
    
    return `
    <table class='order' cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th>주문번호</th>
        <th>상품이미지</th>
        <th>주문상품명</th>
        <th>색상/사이즈/세금납부</th>
        <th>수량</th>
        <th>판매가</th>
        <th>수령인</th>
        <th>수령인연락처</th>
        <th>수령인주소</th>
        <th>개인통관고유번호</th>
        <th>상태</th>
        <th>링크</th>
        <th>파운드원가</th>
        <th>Ref.</th>
        <th>구매처</th>
        <th>오더넘버</th>
        <th>구매가격</th>
        <th>구매일자</th>
      </tr>
    </thead>
    <tbody id='tbody'>
    ${orderdata?orderdata.map((order, index) => 
      `<tr>
        <td>${order.order_id}</td>
        <td><img id='img${index}' src='' width="120px"></td>
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