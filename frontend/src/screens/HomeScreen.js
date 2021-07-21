const HomeScreen = {
  after_render: () => {
    //orderBtn
    document.getElementById('orderBtn')
    .addEventListener('click', () => {
      document.location.hash = '/order';
    })
    
    //buyingBtn
    document.getElementById('buyingBtn')
    .addEventListener('click', () => {
      document.location.hash = '/buying';
      console.log('buying clicked!'); 
    })
  },
  render: async () => {

    return `
    <div class='container'>
      <div><h2>Privae Purchase Management App</h2></div>
      <div><button type='button' id='orderBtn'>Order List</button></div>
      <div><button type='button' id='buyingBtn'>Buying List</button></div>
    </div>
    `
  }
}

export default HomeScreen;