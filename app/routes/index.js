/**
 * Main route rules
 * @param {koa} app - Koa appliacation
 * @param {helpers/passport} passport - Adapted passport module
 * @module routes
 */
module.exports = function routes(app, passport) {
    "use strict";

    const
        co   = require('co'),
        Router = require('koa-router'),
        authed = require('../helpers/authedMiddleware'),
        koaBody = require('koa-body'),                                      //-----------------body parser
        
        
    // Controllers
        indexController  = require('../controllers/indexController'),
        loginController  = require('../controllers/loginController'),
        secureController = require('../controllers/secureController'),
        goodsController  = require('../controllers/goodsController');

    var router = new Router();

    router
        .get('/',          indexController.index)
        .get('/users',     indexController.list)
        .get('/users/:id', indexController.getId)
        .get('/goods/:id', goodsController.get)     //200 --- 404
        .post('/goods',    goodsController.post)    //201 --- 400
        .del('/goods/:id', goodsController.del)     //204 --- 400
        .get('/login',     loginController.login)
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/secure',
                failureRedirect: '/login'
            })
        )
        .get('/logout', co.wrap(function*(ctx) {
            ctx.logout();
            ctx.redirect('/login')
        }))
        .get('/secure', authed, secureController.index);

    app.use(koaBody());                                                     //-------------------body parser

    app.use(router.routes());
    app.use(router.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    }));
};