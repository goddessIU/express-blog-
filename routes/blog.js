var express = require('express');
var router = express.Router();


const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel } = require('../model/resModel')


/* GET home page. */
router.get('/list', function (req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    if (req.query.isadmin) {
        if (req.session.username === null) {
            res.json(
                new ErrorModel('未登录')
            )
        }
        author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
    // if (method === 'GET' && req.path === '/api/blog/list') {

    //     // const listData = getList(author, keyword)
    //     // return new SuccessModel(listData)

    //     // if (req.query.isadmin) {
    //     //     // 管理员界面
    //     //     const loginCheckResult = loginCheck(req)
    //     //     if (loginCheckResult) {
    //     //         // 未登录
    //     //         return loginCheckResult
    //     //     }
    //     //     // 强制查询自己的博客
    //     //     author = req.session.username
    //     // }


    // }
});



router.get('/detail',  (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})


router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update',  loginCheck,(req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})
module.exports = router;
