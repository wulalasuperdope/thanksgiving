const router = require("express").Router();
const Sequelize = require('sequelize')
const { Person, Dish } = require("../../db");
const chalk = require('chalk');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get("/", (req, res, next) => {
    if (req.query.is_attending === 'true') {
        Person.findAll({
            attributes: ['name', 'isAttending'],
            where: { isAttending: true }
        })
            .then(people => {
                res.send(people)
            })
            .catch(e => {
                console.log(chalk.green('Error getting all people attending.'), e);
                next(e);
            })
    } else if (req.query.is_attending === 'false') {
        Person.findAll({
            attributes: ['name', 'isAttending'],
            where: { isAttending: false }
        })
            .then(people => {
                res.send(people)
            })
            .catch(e => {
                console.log(chalk.green('Error getting all people not attending.'), e);
                next(e);
            })
    } else if (req.query.include_dishes === 'true') {
        Person.findAll({
            include: [{
                model: Dish,
                where: { personId: { [Sequelize.Op.not]: null } }
            }],
            attributes: ['name', 'isAttending'],

        })
            .then(people => {

                res.send(people)
            })
            .catch(e => {
                console.log(chalk.green('Error getting all people with dishes.'), e);
                next(e);
            })
    }
    else if (req.query.include_dishes === 'false') {
        Person.findAll({
            include: [{
                model: Dish,
                where: { personId: null }
            }],
            attributes: ['name', 'isAttending'],

        })
            .then(people => {

                res.send(people)
            })
            .catch(e => {
                console.log(chalk.green('Error getting all people without dishes.'), e);
                next(e);
            })
    }
    else {
        Person.findAll()
            .then(people => {
                res.send(people)
            })
            .catch(e => {
                console.log(chalk.green('Error getting all people.'), e);
                next(e);
            })
    }
});

router.post("/", (req, res, next) => {
    Person.create(req.body)
        .then(() => Person.findAll())
        .then(people => {
            res.send(people);
        })
        .catch(next)
})

router.delete("/:id", (req, res, next) => {
    Person.destroy(req.params.id)
        .then(() => Person.findAll())
        .then(people => {
            res.send(people);
        })
        .catch(next);
})

router.put("/:id", (req, res, next) => {
    const { name, isAttending } = req.body;

})


module.exports = router;
