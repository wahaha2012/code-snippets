'use strict';
//require global.utils
(function(global){
    var queryParse = {
        /**
         * get (url)query string value
         * @param  {String} queryKey     query string key wanted
         * @param  {String} searchString string search from
         * @return {String}              query string value
         */
        getQueryString: function(queryKey, searchString){
            if(!queryKey || !global.typeOf(queryKey,'string') || queryKey.replace(/\s+/,'').length<1){
                return '';
            }

            searchString = searchString || window.location.href;

            var pattern = new RegExp(queryKey+'=([^?&=]*)','g'),
                matches = searchString.match(pattern);

            if(matches && global.typeOf(matches,'array') && matches.length>0){
                return decodeURIComponent(matches[0].replace(queryKey+'=', ''));
            }else{
                return '';
            }
        }
    };

    global.queryParse = utils.extend(global.queryParse || {}, queryParse);
})(this);