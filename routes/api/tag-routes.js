const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [Product], 
    through: ProductTag,
  }); // find all tags
  
  return res.json(tags); // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tags = await Tag.findByPk(req.params.id, {
    include: [Product]
  }); // find a single tag by its `id`

  return res.json(tags); // associated Product data
});

router.post('/', async (req, res) => {
  const tags = await Tag.create(req.body);

  return res.json(tags);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tags = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(tags);  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tags = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(tags);
});

module.exports = router;
