const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const crawler = async () => {
  try{
    const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1680,1080', '--disable-notifications'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080 });
    await page
    .goto('https://londonlabel.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=3Y6Yey8eI0rmOmXm3jQv6A&state=jaewonks&redirect_uri=https://londonlabel.cafe24.com&scope=mall.read_order,mall.read_product');
    await page.evaluate(() => {
      const id = 'londonlabel';
      const password = 'Mochi1014!';
      document.querySelector('#mall_id').value = id;
      document.querySelector('#userpasswd').value = password;
      document.querySelector('button.btnStrong.large').click();
       /* 
      // peppeteer 라이브러리
      // 키보드로 입력하는 효과

      await page.type('#email', id);
      await page.type('#pass', password);
      await page.waitFor(2000);
      await page.click('#u_0_k');
      await page.hover('#u_0_b');
      await page.waitFor(2000);
      await page.click('#u_0_b');
      await page.waitFor(5000);
      await page.waitForResponse((response) => {
        console.log(response, response.url());
        return response.url().includes('login_attempt')
       });
       //waitForRequest: 요청대기 waitForResponse: 응답대기
      await page.keyboard.press('Escape');
      await page.click("[aria-label='Account']");
      //document.querySelector('[aria-label="Account"]')
      await page.waitFor(1000);
      await page.click('.b20td4e0.muag1w35 >div:last-child >div');
      //document.querySelector('.b20td4e0.muag1w35 >div:last-child >div')
      await page.close(); 
      await browser.close();*/
  })
} catch (err) {
    console.error(err)
  }
}

crawler();