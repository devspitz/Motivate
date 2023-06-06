const express = require('express');
const router = express.Router();
let i = 0;

router.route('/')
    .get(async (req, res, next) => {
        const theTasks = await global.tasks.find().toArray();
        res.send(theTasks);
    })
    .post(async (req, res, next) => {
        const newTask = {
            id: i++,
            name: req.body.name,
            priority: req.body.priority,
            deadline: req.body.deadline,
            date: new Date()
        };

        await global.tasks.insertOne(newTask);

        res.status(201).send(newTask);
    });

module.exports = router;
