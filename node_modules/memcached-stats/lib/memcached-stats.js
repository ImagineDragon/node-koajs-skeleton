var exec = require('child_process').exec;
var child;

exports.get = function(cb){

    function out(callback){
        child = exec('echo "stats" | nc 127.0.0.1 11211', function (error, stdout, stderr) {

            var result = {};

            var data = stdout.split('\n');
            var pos = 2;

            data.forEach( function( item ){
                pos++;

                if(  pos <= data.length ){
                    var item_split = item.split(' ');

                    result[item_split[1]] = item_split[2].replace('\r','');
                }
            });
            callback( error, result )
        });

    }

    out(cb);

}


