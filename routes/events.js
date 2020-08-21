var express = require('express');
var router = express.Router();
var PostgreLib = require('../db/postgreLib')
var middleware = require('../middleware')


/* GET event listing. */
router.get('/', middleware.checkToken, function (req, res, next) {
    PostgreLib.getEventList(data => {
        res.send(data);
    })
});

/* POST event. */
router.post('/', middleware.checkToken, function (req, res, next) {
    PostgreLib.insertEvent(data => {
        res.send(data)
    }, req.body, 1)
});

/* DELETE event. */
router.delete('/:id', middleware.checkToken, function (req, res, next) {
    PostgreLib.deleteEvent(data => {
        res.send(data)
    }, req.params.id)
});

/* PUT event. */
router.put('/:id', middleware.checkToken, function (req, res, next) {
    PostgreLib.updateEvent(data => {
        res.send(data)
    }, req.body, req.params.id)
});

/* GET event detail*/
router.get('/:id', middleware.checkToken, function (req, res, next) {
    PostgreLib.getEventById(data=> {
        res.send(data)
    }, req.params.id)
})


module.exports = router;
