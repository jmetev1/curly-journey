const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  const waitThenClick = ({ selector }) => {
    return page.waitForSelector(selector).then((el) => page.click(selector));
  };

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

  await waitThenClick({
    selector: '#root > nav > button:nth-child(6) > a > span',
  });
  const selectSelector = '#SelectField-1';
  await page.waitForSelector(selectSelector);
  console.log(48);
  // await page.select('select[name=clinic]', '5e016d700afaa520354490b2');
  // await page.select(selectSelector, '5e016d700afaa520354490b2');

  await waitThenClick({
    selector:
      '#root > div > div > div > div > form > div:nth-child(8) > label:nth-child(2) > span',
  });

  await page.click('[name=submitvisit]');
}

run();
