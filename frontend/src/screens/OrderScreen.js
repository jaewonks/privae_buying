import { getOrders, getProduct, buyingInfo, getOrderInfo } from '../api.js'
import { getCurrentDate } from '../config.js'

const OrderScreen = {
  after_render: () => {
    const saveBtns = document.getElementsByClassName('save');
      Array.from(saveBtns).forEach((saveBtn,index) => {
      const forms = document.getElementsByTagName('form');
      const saveForm = forms[index];
      const order = Number(saveForm.id.replace('form',''));
      console.log(saveBtn,index,saveForm);
      saveForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('clicked!')
        if(saveBtn.textContent === '저장') {
          saveBtn.textContent = '수정';
        }
        const data = await buyingInfo({
          orderId: document.getElementById(`orderId${order}`).value,
          link: document.getElementById(`link${order}`).value,
          originalprice: Number(document.getElementById(`ori_price${order}`).value),
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
      if(idx) {
        document.getElementById(`ref${index}_${idx}`).innerText = ref
        document.getElementById(`img${index}_${idx}`).src = img  
      } else {
      document.getElementById(`ref${index}`).innerText = ref
      document.getElementById(`img${index}`).src = img
      }
    };


    const getOrder = async (id) => {
      const data = await getOrderInfo(id);
      console.log(data);
    }; 

    return `
    <table class='order' cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th>주문번호</th>
        <th>상품이미지</th>
        <th>주문상품명</th>
        <th>Ref.</th>
        <th>색상/사이즈/세금납부</th>
        <th>수량</th>
        <th>판매가</th>
        <th>상태</th>
        <th>링크</th>
        <th>파운드원가</th>
        <th>구매처</th>
        <th>구매상세</th>
        <th>구매가격</th>
        <th>구매일자</th>
        <th>수령인</th>
        <th>수령인연락처</th>
        <th>수령인주소</th>
        <th>개인통관고유번호</th>
      </tr>
    </thead>
    <tbody id='tbody'>
    ${orderdata?orderdata.map((order, index) => 
      order.actual_order_amount.order_price_amount!=="0.00"?
      `<tr>
        <td rowspan=${order.items.length}>${order.order_id}
        <input type='hidden' id='orderId${index}' value='${order.order_id}'/>
        </td>
      ` +
        order.items.map((item,idx) => 
          idx===0? 
          ` <td>
              <img id='img${index}' src='' width="120px">
            </td>
            <td>${item.product_name}</td>
            <td id='ref${index}'>${getInfo(order.items[0].product_no,index)}</td>
            <td>${item.option_value
              .replaceAll(',','<br/>')
              .replaceAll('=','&emsp;')  
            }
            </td>
            <td>${item.quantity}</td>
            <td>${(parseInt(item.product_price) + parseInt(item.option_price))
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }원</td>
            <td>
            <select>
              <option>배송준비중</option>
              <option>구매완료</option>
              <option>배송중</option>
              <option>배송완료</option>
            </select>
            </td>
            <td>
              <form id='form${index}'></form>
              <input form='form${index}' type="text" name="link${index}" id="link${index}" placeholder='공식사이트 링크' />
              </td>
            <td>£<input form='form${index}' type="text" name="ori_price${index}" id="ori_price${index}" /></td>
            <td>
              <select id='place${index}'>
                <option value='1'>온라인</option>
                <option value='2'>해로드</option>
                <option value='3'>셀브릿지</option>
                <option value='4'>본드스트릿</option>
                <option value='5'>슬론</option>
                <option value='6'>웨스트필드</option>
                <option value='7'>뱅크</option>
              </select>
            <td id="detail${index}">${getOrder(order.order_id,index,idx)}</td>
            <td id="price${index}">buyingDB에서가져올값</td>
            <td id="date${index}">buyingDB에서가져올값</td>
            <td rowspan=${order.items.length}>${order.billing_name}</td>
            <td rowspan=${order.items.length}>${order.receivers[0].phone !== '--'?
              order.receivers[0].phone:
              order.receivers[0].cellphone}</td>
            <td rowspan=${order.items.length}>${order.receivers[0].address_full}&emsp;${order.receivers[0].zipcode}
            <td rowspan=${order.items.length}>${order.additional_order_info_list[0]?
              order.additional_order_info_list[0].value:
              order.receivers[0].clearance_information
            }
            </td>
            <td rowspan=${order.items.length}>
              <button form='form${index}' type='submit' class='save'>저장</button>
            </td>
          </tr>
          ` :
          ` <tr>
            <td> 
              <img id='img${index}_${idx}' src='' width="120px">
            </td>
            <td>${item.product_name}</td> <!--getInfo 부분 고쳐야함-->
            <td id='ref${index}_${idx}'>${getInfo(item.product_no, index, idx)}</td>
            <td>${item.option_value
              .replaceAll(',','<br/>')
              .replaceAll('=','&emsp;')  
            }
            </td>
            <td>${item.quantity}</td>
            <td>${(Number(item.product_price)+Number(item.option_price))
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }원</td>
            <td>
            <select>
              <option>배송준비중</option>
              <option>구매완료</option>
              <option>배송중</option>
              <option>배송완료</option>
            </select>
            </td>
            <td><input type="text" id="link${index}_${idx}" placeholder='공식사이트 링크' /></td>
            <td>£<input type="text" id="ori_price${index}_${idx}" /></td>
            <td>
              <select id='place${index}_${idx}'>
                <option value='1'>온라인</option>
                <option value='2'>해로드</option>
                <option value='3'>셀브릿지</option>
                <option value='4'>본드스트릿</option>
                <option value='5'>슬론</option>
                <option value='6'>웨스트필드</option>
                <option value='7'>뱅크</option>
              </select>
            <td><input type="text" id="detail${index}_${idx}" placeholder="주문 상세 사항" /></td>
            <td>£<input type="text" id="price${index}_${idx}" placeholder="구매가격" /></td>
            <td><input type="text" id="date${index}_${idx}" value="${getCurDate}" /></td>
          </tr>`
          ).join('\n'):''
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