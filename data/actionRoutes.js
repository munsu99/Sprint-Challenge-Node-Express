const express = require('express');
const router = express.Router();

const actionModel = require('./helpers/actionModel');

router.get('/', (req, res) => {
    actionModel
        .get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});
  
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionModel
        .get(id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ errMsg: `The action with the id:${id} is not found` });
            }
        })
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.post('/', (req, res) => {
    const { project_id } = req.body;
    const { description } = req.body;
    const { notes } = req.body;

    if (!project_id) res.status(400).json({ errMsg: 'Please provide a project_id' });
    if (!description) res.status(400).json({ errMsg: 'Please provide a description' });
    if (!notes) res.status(400).json({ errMsg: 'Please provide a notes' });

    actionModel
        .insert({ project_id: project_id, description: description, notes: notes })
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id } = req.body;
    const { description } = req.body;
    const { notes } = req.body;

    actionModel
        .update(id, { project_id, description, notes })
        .then(count => res.status(200).json(count))
        .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    actionModel
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

module.exports = router;