const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
      console.log(err);
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    }
    )
    .catch((err) => {
      res.status(400).json(err);
    }
    );
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    })
    .then((tag) => {
      res.status(200).json(tag);
    }
    )
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    })
    .then((tag) => {
      res.status(200).json(tag);
    }
    )
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    }
    );
});

module.exports = router;
