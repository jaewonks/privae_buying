import { getOrders, getProduct } from '../api.js'
import { getCurrentDate } from '../config.js'

const OrderScreen = {
  after_render: () => {
    document.getElementById('completed')
    .addEventListener('click', async () => {
      const element = document.querySelector('.tr_container');
      element.style.opacity = '0.2';
    })

  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    const getCurDate = await getCurrentDate();
    const getInfo = async (id, index) => {
      const data = await getProduct(id);
      const img = data.detail_image;
      const ref = data.model_name;
      document.getElementById(`ref${index}`).innerText = ref;
      document.getElementById(`img${index}`).src = img;
    }; 

    return `
    <div class = 'container'>
    <table class='buying' cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th rowspan="3">이미지</th>
        <th colspan="5">제품명(오더넘버)</th>
      </tr>
      <tr>
        <th>색상/사이즈/세금납부</th>
        <th>수량</th>
        <th>원가</th>
        <th>Ref.</th>
        <th>링크</th>
      </tr>
      <tr>
        <th>구매처</th>
        <th>오더넘버</th>
        <th>구매가격</th>
        <th>구매일자</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id='tbody'>
    ${orderdata?orderdata.map((order, index) => 
      `<tbody class='tr_container'>
      <tr>
        <td rowspan="3">
          <img id='img${index}' src='' width="120px">
        </td>
        <td colspan="5">${order.items[0].product_name} (${order.order_id})</td>
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
        <td id='ref${index}'>${getInfo(order.items[0].product_no, index)}</td>
        <td><input type="text" class="lu_link" placeholder='루이비통 링크'/></td>
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
        <td>
          <button type='button' id='completed'>구매완료</button>
          <button type='button' id='hide'>숨기기</button> 
        </td>
      </tr>
      </tbody>
      `
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