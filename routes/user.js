var express = require('express');
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
      if (data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        res.json(
          new SuccessModel()
        )
        return
      }
      res.json(
        new ErrorModel('登录失败')
      )
  })
});

module.exports = router;
