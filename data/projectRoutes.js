const express = require('express');
const router = express.Router();

const projectModel = require('./helpers/projectModel');

function upper(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}
  
router.get('/', (req, res) => {
    projectModel
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});
  
router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectModel
        .get(id)
        .then(projects => {
            if (projects) {
                res.status(200).json(projects);
            } else {
                res.status(404).json({ errMsg: `The project with the id:${id} is not found` });
            }
        })
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.post('/', upper, (req, res) => {
    const { name } = req.body;
    const { description } = req.body;

    if (!name) res.status(400).json({ errMsg: 'Please provide a name' });

    projectModel
        .insert({ name: name }, { description: description })
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectModel
        .remove(id)
        .then(id => {
        if (id) {
            res.status(204).end();
        } else {
            res.status(404).json({ errMsg: `The project with the id:${id} is not found` });
        }
        })
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    projectModel
        .update(id, { name })
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

module.exports = router;