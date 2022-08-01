const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ p1_text: 'p1의 텍스트' });
  }, 1000);
});

const p2 = new Promise((resolve, rejet) => {
  setTimeout(() => {
    resolve({ p2_text: 'p2의 텍스트' });
  }, 3000);
});

// promise
p1.then((result) => {
  console.log(`p1 = ${result.p1_text}`);
  return p2;
}).then((result) => {
  console.log(`p2 = ${result.p2_text}`);
});

// promise all
Promise.all([p1, p2])
  .then((result) => {
    console.log('p1 = ' + result[0].p1_text);
    console.log('p1 = ' + result[1].p2_text);
  })
  .reject((err) => {
    console.log(err);
  });
