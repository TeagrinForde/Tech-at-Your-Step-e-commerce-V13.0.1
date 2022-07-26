const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const category = await Category.findAll({
    include: Product //ask tutor!!!![]
  });
  // be sure to include its associated Products
  return res.json(category);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const category = await Category.findByPk(req.params.id, {
    include: Product
  });
  // be sure to include its associated Products
  return res.json(category);
});

router.post('/', async (req, res) => {
  // create a new category
  const category = await Category.create(req.body);
  return res.json(category);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(category);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(category);
});

module.exports = router;
