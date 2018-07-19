var stats = require('../lib/memcached-stats');

stats.get(function(err,data){
    console.log(data);
});