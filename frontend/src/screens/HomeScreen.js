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
    })
  },
  render: async () => {
    return `
    <div class='home container'>
      <div><img src='../images/top_logo.png' style='width:100px'></div>
      <div><p>privé, particulier, individuel,personnel, confidentiel, en secret</p></div>
      <div><h3>Buying Management System</h3></div>
      <div>
        <button type='button' id='orderBtn'>Order List</button>
        <button type='button' id='buyingBtn'>Buying List</button>
      </div>
    </div>
    `
  }
}

export default HomeScreen;