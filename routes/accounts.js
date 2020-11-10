var express = require('express');
var router = express.Router();
var models = require('../models');


/* middleware */

function requireAdmin(req, res, next) {
    if (!req.user || !req.user.admin) {
        next(new Error("permisson denied"));
        return;
    }
    next(); /*判斷管理員 */
}
/* GET users listing. */
router.get('/create', function(req, res, next) {
    res.render('create_account', { title: 'iRich不愛記帳' });
});

router.post('/create', function(req, res, next) {
    // console.log('新增資料', req.body.title, req.body.type, req.body.cost);
    models.Account.create({
        title: req.body.title,
        type: req.body.type,
        cost: req.body.cost,
    }).then(function() {
        res.redirect('/')
    });

});
router.get('/:account_id/update', function(req, res, next) {
    console.log(req.params);
    console.log(req.query);
    models.Account.findOne({
        where: { id: req.params.account_id }
    }).then(function(account) {
        res.render('update_account', { title: 'iRich不愛記帳', account: account });
    });
});

router.get('/:account_id', function(req, res, next) {
    models.Account.findOne({
        where: {
            id: req.params.account_id
        }
    }).then(function(account) {
        res.render('account', { title: 'iRich不愛記帳', account: account });
    });
});

router.post('/:account_id/update', function(req, res, next) {

    models.Account.findOne({
        where: { id: req.params.account_id }
    }).then(function(account) {
        account.update({
            title: req.body.title,
            type: req.body.type,
            cost: req.body.cost,
        });
    }).then(function() {
        res.redirect('/');
    });
});

router.post('/:account_id/delete', function(req, res, next) {
    models.Account.destroy({
        where: {
            id: req.params.account_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;