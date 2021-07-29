import { getOrders, getProduct, buyingInfo, getBuyingInfo } from '../api.js'
import { getCurrentDate } from '../config.js'
import { toggleStatusBtn } from '../utils.js'

const OrderScreen = {
  after_render: () => {
    const statusBtns = document.getElementsByClassName('status');
    Array.from(statusBtns).forEach((statusBtn, index) => {
      statusBtn.addEventListener('click', () => {
        toggleStatusBtn(statusBtn,index);
      })
    });

    const hideBtns = document.getElementsByClassName('hide');
    Array.from(hideBtns).forEach((hideBtn, index) => {
      hideBtn.addEventListener('click', () => {
        const element = document.querySelectorAll('.tr_container');
        element[index].style.display = "none";
      })
    });

    const saveBtns = document.getElementsByClassName('save');
    Array.from(saveBtns).forEach((saveBtn, index) => {
      const saveForm = document.getElementById(`form${index}`)
      saveForm.addEventListener('submit', async (e) => {
        if(saveBtn.textContent === '저장') {
          saveBtn.textContent = '수정';
        }
        e.preventDefault();
        const data = await buyingInfo({
          orderId: document.getElementById(`orderId${index}`).value,
          place: document.getElementById(`place${index}`).value,
          detail: document.getElementById(`detail${index}`).value,
          price: Number(document.getElementById(`price${index}`).value),
          date: document.getElementById(`date${index}`).value
        })
        console.log(data);
        if(data.message) {
          console.log(data.message)
        }
      })
    });
  },
  render: async () => {
    const orderlist = await getOrders();
    const orderdata = orderlist.data.orders;
    const getCurDate = await getCurrentDate();

    const getBuyingInfo = async (id, index) => {
      const data = await getBuyingInfo(id);
      const link = data.link;
      const originalprice = data.originalprice;
      document.getElementById(`ori_price${index}`).innerText = originalprice;
      document.getElementById(`link${index}`).innerText = link;
    }; 
    
    const getInfo = async (id,index,idx) => {
      const data = await getProduct(id);
      const img = data.detail_image;
      const ref = data.model_name;
      document.getElementById(`ref${index}_${idx}`).innerText = ref
      document.getElementById(`img${index}_${idx}`).src = img  
    };

    return `
    <div class='container'>
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
      order.actual_order_amount.order_price_amount!=="0.00"?
      order.items.map((item,idx) =>
      `<tbody class='tr_container'>
      <tr>
        <td rowspan="3">
          <img id='img${index}_${idx}' src='' width="120px">
        </td>
        <td colspan="5">&nbsp;${item.product_name} (${order.order_id})
          <input type='hidden' id='orderId${index}' value='${order.order_id}'/>
        </td>
      </tr>
      <tr>
        <td>
          ${item.option_value
            .replaceAll(',','<br/>')
            .replaceAll('=','&emsp;')  
          }
        </td>
        <td>${item.quantity}</td>
        <td id='ori_price${index}'>DB에서불러올값</td>  
        <td id='ref${index}_${idx}'>${getInfo(item.product_no,index,idx)}</td>
        <td id='link${index}'>DB에서불러올값</td>
      </tr>
      <tr>
        <td>
          <select name='place${index}' id='place${index}'>
            <option value='1'>온라인</option>
            <option value='2'>해로드</option>
            <option value='3'>셀브릿지</option>
            <option value='4'>본드스트릿</option>
            <option value='5'>슬론</option>
            <option value='6'>웨스트필드</option>
            <option value='7'>뱅크</option>
          </select>
        </td>  
        <td><input form='form${index}' type="text" name='detail${index}' id="detail${index}" placeholder="주문 상세 사항" /></td>
        <td>£<input form='form${index}' type="text" name='price${index}' id="price${index}" placeholder="구매가격" /></td>
        <td><input form='form${index}' type="text" name='date${index}' id="date${index}" value="${getCurDate}" /></td>
        <td>
          <button type='button' class='status'>바잉중</button>
          <button form='form${index}' type='submit' class='save'>저장</button> 
          <button type='button' class='hide'>숨기기</button> 
        </td>
      </tr>
      </tbody>
      `
      ).join('\n'):''
      ).join('\n'):''} 
      </tbody>
      </table>
      </div>
    `
  } 
}

export default OrderScreen;