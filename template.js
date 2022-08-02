const puppeteer = require('puppeteer');

// 입력할 텍스트
const insert_name = `insert_${Math.random().toString(36).substring(2, 15)}`;
const insert_description = `insert_${Math.random()
  .toString(36)
  .substring(2, 15)}`;

// 수정할 텍스트
const modi_name = `update_${Math.random().toString(36).substring(2, 15)}`;
const modi_description = `update_${Math.random()
  .toString(36)
  .substring(2, 15)}`;

async function run() {
  // 브라우저 열기
  const browser = await puppeteer.launch({
    headless: false, // true(웹 브라우저가 안 뜸)
  });
  const page = await browser.newPage();

  page.on('dialog', (dialog) => {
    // confirm 등 무조건 yes로 하라!!
    dialog.accept();
  });

  // 웹사이트 로딩
  await page.goto('http://localhost:3000/admin/products', {
    time: 0,
    waitUnit: 'documentloaded',
  });
  //   await page.goto('주소/', {
  //     time: 0,
  //     waitUnit: 'documentloaded',
  //   });

  // 어느 돔이 활성화될때까지 기다려야 함! - 클릭하기 위해!
  await page.waitForSelector('.btn-default');
  await page.click('.btn-default');

  // 다음으로 넘어가서 기다리는 시점이 중요!
  await page.waitForSelector('.btn-primary');

  await page.evaluate(
    (a, b) => {
      // 값을 input에 넣기
      document.querySelector('input[name=name]').value = a;
      document.querySelector('input[name=price]').value = 1000;
      document.querySelector('input[name=description]').value = b;

      document.querySelector('.btn-primary').click();
    },
    insert_name,
    insert_description
  );

  // 상세조회
  await page.waitForSelector('.btn-default');
  await page.click('table tr:nth-child(2) td:nth-child(1) a');

  // 수정하기
  await page.waitForSelector('.btn-primary');
  await page.click('.btn-primary');
  await page.waitForSelector('.btn-primary');
  await page.evaluate(
    (a, b) => {
      document.querySelector('input[name=name]').value = a;
      document.querySelector('input[name=price]').value = 2000;
      document.querySelector('input[name=description]').value = b;

      document.querySelector('.btn-primary').click();
    },
    modi_name,
    modi_description
  );

  // 삭제하기
  // 목록보기 기다리기
  await page.waitForSelector('.btn-default');
  await page.click('.btn-default');
  await page.waitForSelector('.btn-default');
  await page.click('.btn-danger');

  // 상단 테이블의 th 제목을 가져오고 싶은 경우
  //   const tdName = await page.$eval('.spt_con strong', (th) =>
  //     th.textContent.trim()
  //   );
  //   console.log(tdName);

  // 브라우저 닫기
  await browser.close();
}

run();
