const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');
const co   = require('co');
var id = 1;

module.exports = {
    get: co.wrap(function * get(ctx, next) {
        ctx.status = 200;
        memcached.get(ctx.params.id, function (err, data) {
            if(data === undefined){
                ctx.status = 404;
            } else {
                ctx.body = data;
            }
        });

        while (ctx.body === undefined && ctx.response.status !== 404) {
            require('deasync').runLoopOnce();
        }
        yield next();
    }),

    post: co.wrap(function * post(ctx, next) {
        memcached.set(id, ctx.request.body, 100, function (err) {
            if(err){
                ctx.status = 400;
            } else {
                ctx.status = 201;
            }
        });
        while (ctx.status !== 400 && ctx.status !== 201) {
            require('deasync').runLoopOnce();
        }
        ctx.body = id;
        ctx.status = 201;
        id++;
        yield next();
    }),

    del: co.wrap(function * del(ctx, next) {
        memcached.del(ctx.params.id, function (err) {
            if(err){
                ctx.status = 400;
            } else {
                ctx.status = 204;
            }
        });
        while (ctx.status !== 400 && ctx.status !== 204) {
            require('deasync').runLoopOnce();
        }
        yield next();
    })
};