const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

async function run() {
  let page;
  const waitThenClick = ({ selector }) => {
    return page.waitForSelector(selector).then((el) => page.click(selector));
  };

  const login = async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });

    page = await browser.newPage();

    page.setDefaultTimeout(5000);

    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    await page.goto('http://localhost:3001/login');

    const USERNAME_SELECTOR = 'input[name=username]',
      PASSWORD_SELECTOR = 'input[name=password',
      BUTTON_SELECTOR = '#root > div > div > form > button';

    await waitThenClick({ selector: USERNAME_SELECTOR });

    const options = await page.evaluate(() => {
      window.pglOptions.validate = false;
      window.pglOptions.prefill = true;
      return Promise.resolve(JSON.stringify(window.pglOptions));
    });

    await page.keyboard.type('test');

    await waitThenClick({ selector: PASSWORD_SELECTOR });
    await page.keyboard.type('wonderboy');

    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();
  };

  const submitAVisit = async () => {
    await waitThenClick({
      selector: '#root > nav > button:nth-child(6) > a > span',
    });
    const selectSelector = '#SelectField-1';
    await page.waitForSelector(selectSelector);
    // await page.select('select[name=clinic]', '5e016d700afaa520354490b2');
    // await page.select(selectSelector, '5e016d700afaa520354490b2');

    await waitThenClick({
      selector:
        '#root > div > div > div > div > form > div:nth-child(8) > label:nth-child(2) > span',
    });

    await page.click('[name=submitvisit]');
  };

  await login();
  // await fetchPicture();
  // await submitAVisit();
}
const fetchPicture = async (filename) => {
  await fetch('http://localhost:3001/api/receipt/' + filename)
    .then((result) => {
      console.log({ result });
      if (result.status === 200) return Promise.resolve('i guess it worked');
      return result.json().then(Promise.reject);
    })
    .then(console.log)
    .catch((error) => {
      console.log('did not work', error);
    });
};

fetchPicture('s30.54161459063557'); //test with invalid s3 filename
// fetchPicture('0.54161459063557'); //test with mongo filename that throws objectid error;
// fetchPicture('5e3065bef43200248c5053c8'); //test with mongo filename that is valid objectid but does not exist

// fetchPicture('s30.541641459063557'); //test with valid s3 filename
// fetchPicture('5e3065bef43200248c5053c9'); //test with valid mongo filename
// if it's a picture it's not json!
// run();
