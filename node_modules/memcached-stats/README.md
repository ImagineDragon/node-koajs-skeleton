node-memcached-stats
====================


##Example:
    var stats = require('memcached-stats');
    
    stats.get(function(err,data){
        console.log(data);
    });
    
##Results:
    { pid: '1050',
      uptime: '8382',
      time: '1383326479',
      version: '1.4.14',
      libevent: '2.0.21-stable',
      pointer_size: '64',
      rusage_user: '0.147286',
      rusage_system: '0.195038',
      curr_connections: '5',
      total_connections: '43',
      connection_structures: '6',
      reserved_fds: '20',
      cmd_get: '0',
      cmd_set: '0',
      cmd_flush: '0',
      cmd_touch: '0',
      get_hits: '0',
      get_misses: '0',
      delete_misses: '0',
      delete_hits: '0',
      incr_misses: '0',
      incr_hits: '0',
      decr_misses: '0',
      decr_hits: '0',
      cas_misses: '0',
      cas_hits: '0',
      cas_badval: '0',
      touch_hits: '0',
      touch_misses: '0',
      auth_cmds: '0',
      auth_errors: '0',
      bytes_read: '228',
      bytes_written: '38039',
      limit_maxbytes: '67108864',
      accepting_conns: '1',
      listen_disabled_num: '0',
      threads: '4',
      conn_yields: '0',
      hash_power_level: '16',
      hash_bytes: '524288',
      hash_is_expanding: '0',
      expired_unfetched: '0',
      evicted_unfetched: '0',
      bytes: '0',
      curr_items: '0',
      total_items: '0',
      evictions: '0',
      reclaimed: '0' }