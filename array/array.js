'use strict';
//require global.utils
(function(global){
    var array = {
        /**
         * [createArrayList create array list]
         * @param  {[Object]} options {start:, end:, prefix:, subfix:, list:, step:}
         * @return {[Array]}         [new Array list]
         */
        createArrayList: function(options){
            var start = parseFloat(options.start) || 0,
                end = parseFloat(options.end) || 0,
                step = parseFloat(options.step) || 1,
                prefix = String(typeof options.prefix=='undefined'? '' : options.prefix),
                subfix = String(typeof options.subfix=='undefined'? '' : options.subfix),
                list = options.list || [];

            if(Object.prototype.toString.call(list).slice(8,-1)!=='Array' || list.length < 1 ){
                for(var i=start; i<=end; i+=step){
                    list.push(i);
                }
            }

            list = list.map(function(item){
                return prefix + item + subfix;
            });

            return list;
        }
    };

    global.array = utils.extend(global.array || {}, array);
})(this);