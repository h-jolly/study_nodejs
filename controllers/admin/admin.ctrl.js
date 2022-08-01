const models = require('../../models');

// controller 역할
exports.get_products = (_, res) => {
  // res.render('admin/products.html', {
  //   message: 'hello',
  // });
  models.Products.findAll({}).then((products) => {
    res.render('admin/products.html', { products });
  });
};

exports.get_products_write = (_, res) => {
  res.render('admin/write.html');
};

exports.post_products_write = (req, res) => {
  // res.send(req.body);
  models.Products.create(req.body).then(() => {
    res.redirect('/admin/products');
  });
};
