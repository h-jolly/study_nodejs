const models = require('./models');

async function getProducts() {
  try {
    // 프라미스 객체를 받아온다.
    const product1 = await models.Products.findByPk(1);
    const product3 = await models.Products.findByPk(2);

    // 데이터 정보 확인(*.dataValues)
    console.log(product1.dataValues);
    console.log(product3.dataValues);
  } catch (err) {
    console.log(err);
  }
}

getProducts();
