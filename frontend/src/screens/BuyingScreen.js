import { getOrders } from '../api.js'
import { getCurrentDate } from '../config.js'

const OrderScreen = {
  after_render: () => {

  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    const getCurDate = await getCurrentDate();

    return `
    <div class = 'container'>
    <table class='buying' cellspacing="0" cellpadding="0">
    <thead>
      <td rowspan="4">이미지</td>
      <tr>
        <td colspan="4">오더넘버</td>
        <td>제품명</td>
      </tr>
      <tr>
        <td>색상/사이즈/세금납부</td>
        <td>수량</td>
        <td>원가</td>
        <td>Ref.</td>
        <td colspan='2'>링크</td>
      </tr>
      <tr>
        <td>구매처</td>
        <td>오더넘버</td>
        <td>구매가격</td>
        <td>구매일자</td>
        <td>Status</td>
      </tr>
    </thead>
    <tbody id='tbody'>
    ${orderdata?orderdata.map((order) => 
      `
      <tr>
        <td rowspan="4"><img src=https://privae.co.kr/web/product/big/202103/b47e8046de6f2498bf9f1d25756cdd5e.jpg width="120px"></td>
        <tr>
          <td colspan="4">${order.order_id}</td>
          <td>${order.items[0].product_name}</td>
        </tr>
        <tr>
          <td>
            ${order.items[0].option_value
              .replaceAll(',','<br/>')
              .replaceAll('=','&emsp;')  
            }
          </td>
          <td>${order.items[0].quantity}</td>
          <td>£1280</td>  
          <td>다른API</td>
          <td colspan="2"><input type="text" class="lu_link" placeholder='루이비통 링크'/></td>
        </tr>
        <tr>
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
          </td>  
          <td><input type="text" class="order_num" placeholder="오더넘버"/></td>
          <td>£<input type="text" class="ori_price" /></td>
          <td>${getCurDate}</td>
          <td><button>구매완료</button></td>
        </tr>`
        ).join('\n'):''} 
      </tbody>
      </table>
      </div>
      <div class='container'>
        <div>
          <button>저장</button>
          <button>수정</button>
        </div>
      </div>
    `
  } 
}

export default OrderScreen;