/** Promise
 * 1. resolve와 reject를 인자로 가지는 함수를 만든다.
 * 2. 내가 원하는 시점을 resolve로 받아오자
 */
const waitseconds = new Promise((resolve, reject) => {
  // if (true) {
  //   resolve(console.log('실행'));
  // } else {
  //   reject(console.log('에러'));
  // }
});

waitseconds
  .then(() => {
    console.log('프라미스 이행완료');
  })
  .catch((err) => {
    console.log(err);
  });
