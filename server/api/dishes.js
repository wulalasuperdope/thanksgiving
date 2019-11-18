const router = require("express").Router();
const { Dish, Person } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.get("/", (req, res, next) => {
    Dish.findAll()
        .then(dish => res.send(dish))
});

router.post("/", (req, res, next) => {
    Dish.create(req.body)
        .then(() => Dish.findAll())
        .then(dishes => {
            res.send(dishes);
        })
        .catch(next)
})

router.delete("/:id", (req, res, next) => {
    Dish.destroy(req.params.id)
        .then(() => Dish.findAll())
        .then(dishes => {
            res.send(dishes);
        })
        .catch(next);
})

router.put("/:id", (req, res, next) => {
    const { name, description } = req.body;

})

module.exports = router;
