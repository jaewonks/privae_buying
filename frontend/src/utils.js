export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase()
  const request = url.split('/')
  return {
    resource: request[1],
  }
}

export const rerender = async (component) => {
  document.getElementById('main-container').innerHTML = 
  await component.render();
  await component.after_render();
}

export const toggleStatusBtn = (statusBtn, index) => {
  const element = document.querySelectorAll('.tr_container');
  if(statusBtn.textContent === '구매완료') {
    statusBtn.textContent = '바잉중';
    element[index].style.opacity = '0.2';
    //statusBtn.classList.add('clicked');
  } else {
    statusBtn.textContent = '구매완료'
    element[index].style.opacity = '1';
    //statusBtn.classList.remove('clicked');
  }
}

export const toggleEditBtn = (editBtn, index) => {
  const element = document.querySelectorAll('.tr_container');
  if(editBtn.textContent === '저장') {
    editBtn.textContent = '수정';
    editBtn.classList.add('clicked');
  } else {
    editBtn.textContent = '수정'
    editBtn.classList.remove('clicked');
  }
}