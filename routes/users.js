var express = require('express');
var router = express.Router();
var PostgreLib = require('../db/postgreLib');
var HandlerGenerator = require('../handlegenerator');
var middleware = require('../middleware')

HandlerGenerator = new HandlerGenerator()

/* GET users listing. */
router.get('/',middleware.checkToken ,function (req, res, next) {
  PostgreLib.getUserList(data=>{
      res.send(data);
  })
});

/*POST login*/
router.post('/api-auth', HandlerGenerator.login)

/* POST users. */
router.post('/', function (req, res, next) {
  PostgreLib.insertUser(data => {
    res.send(data)
  }, req.body)
  console.log(req.body);      // your JSON
});

/* PUT users listing. */
router.put('/', function (req, res, next) {
  res.send('lista de eventos');
});

/* DELETE users listing. */
router.delete('/', function (req, res, next) {
  res.send('lista de eventos');
});

module.exports = router;
