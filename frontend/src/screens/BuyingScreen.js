import { getOrders, getProduct, orderInfo, getBuyingInfo } from '../api.js'
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
      const forms = document.getElementsByTagName('form');
      const saveForm = forms[index];
      const order = saveForm.id.replace('form','');
      //console.log(saveForm, saveBtn, order, index);
      saveForm.addEventListener('submit', async (e) => {
        if(saveBtn.textContent === '저장') {
          saveBtn.textContent = '수정';
        }
        e.preventDefault();
        const data = await orderInfo({
          orderId: document.getElementById(`orderId${order}`).value,
          place: document.getElementById(`place${order}`).value,
          detail: document.getElementById(`detail${order}`).value,
          price: Number(document.getElementById(`price${order}`).value),
          date: document.getElementById(`date${order}`).value
        })
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

    const getInfo = async (id,index,idx) => {
      const data = await getProduct(id);
      const img = data.detail_image;
      const ref = data.model_name;
      document.getElementById(`ref${index}_${idx}`).innerText = ref
      document.getElementById(`img${index}_${idx}`).src = img  
    };

    const getBuying = async (id, index, idx) => {
      const data = await getBuyingInfo(id);
      const link = data[0].buyinginfo_link;
      const originalprice = data[0].buyinginfo_originalprice;
      document.getElementById(`ori_price${index}_${idx}`).innerText = 
        '£'+originalprice
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      document.getElementById(`link${index}_${idx}`).innerText = link;
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
          <input type='hidden' id='orderId${index}_${idx}' value='${order.order_id}'/>
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
        <td id='ori_price${index}_${idx}'>${getBuying(order.order_id,index,idx)}</td>  
        <td id='ref${index}_${idx}'>${getInfo(item.product_no,index,idx)}</td>
        <td id='link${index}_${idx}'></td>
      </tr>
      <tr>
        <td>
          <form id='form${index}_${idx}'></form>
          <select id='place${index}_${idx}'>
            <option value='1'>온라인</option>
            <option value='2'>해로드</option>
            <option value='3'>셀브릿지</option>
            <option value='4'>본드스트릿</option>
            <option value='5'>슬론</option>
            <option value='6'>웨스트필드</option>
            <option value='7'>뱅크</option>
          </select>
        </td>  
        <td><input form='form${index}_${idx}' type="text" name='detail${index}_${idx}' id="detail${index}_${idx}" placeholder="주문 상세 사항" /></td>
        <td>£<input form='form${index}_${idx}' type="text" name='price${index}_${idx}' id="price${index}_${idx}" placeholder="구매가격" /></td>
        <td><input form='form${index}_${idx}' type="text" name='date${index}_${idx}' id="date${index}_${idx}" value="${getCurDate}" /></td>
        <td>
          <button type='button' class='status'>바잉중</button>
          <button form='form${index}_${idx}' type='submit' class='save'>저장</button> 
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