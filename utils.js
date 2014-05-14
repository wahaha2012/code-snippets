'use strict';
(function(global){
    var utils = {
        /**
         * detect type of variables
         * @param  {variables} obj  any javascript variables
         * @param  {String} type vairable type maybe. [Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String]
         * @return {Boolean|String} Boolean(if type is set) or String(type is undefined)
         */
        typeOf: function(obj,type) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
            return type?obj !== undefined && obj !== null && clas === type:clas;
        },

        /**uti
         * extend object
         * @param  {Object} origin   origin object
         * @param  {Object} addition additional object
         * @param  {Object} result   extend temporary result
         * @return {Object}          extend final result
         */
        extend: function(origin, addition, result){
            var _this = this;
            result = result || origin;

            if(_this.typeOf(origin, 'object') && _this.typeOf(addition, 'object')){
                for( var key in addition){
                    if(!_this.typeOf(addition[key], 'object')){
                        origin[key] = addition[key];
                    }else{
                        _this.extend(origin[key], addition[key], origin);
                    }
                }
            }

            return result;
        },


    };

    global.utils = utils.extend(global.utils || {}, utils);
})(this);