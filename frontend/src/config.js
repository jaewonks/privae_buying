export const apiUrl = document.location.href.startsWith('http://localhost')
  ? 'http://localhost:5000'
  : '';

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  
  return year + month + day;
} 
  

 