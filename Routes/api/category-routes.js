const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"]}
  })
  .then(productData => {
    res.status(200).json(productData);
  })
  .catch (err => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"]}
  })
  .then(productData => {
    res.status(200).json(productData);
  })
  .catch (err => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  .then(newCategory => {
    res.status(200).json(newCategory);
  })
  .catch (err => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    id: req.body.id,
    category_name: req.body.category_name
  },
  {where: {id: req.params.id}})
  
  .then(UpdatedCategory => {
    res.status(200).json(UpdatedCategory);
  })
  .catch (err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
  .then(deleteCategory => {
    res.status(200).json(deleteCategory);
  })
  .catch (err => {
    res.status(500).json(err);
  });
});

module.exports = router;
