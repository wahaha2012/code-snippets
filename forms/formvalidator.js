'use strict';
//require global.utils
(function(global){
    var formValidator = {
        /**
         * valid form fields
         * @param  {Object} oElement   dom element or jQuery element object or element in other type
         * @param  {String or RegExp} allowEmpty valid type[Number, String, Cell Phone, Telphone, /pattern/, ...]
         * @param  {Boolean} type       whether allow element be empty.
         * @return {Boolean}            valid result
         */
        valid: function(oElement,allowEmpty,type){
            if(!gloal.typeOf(oElement,'object')){return false;}
            
            var o=oElement,val,length,min,max,t,result=false;
            if(global.typeOf(o,'object')&&global.typeOf(o.attr,'function')){
                val=o.val();
                length=o.attr('maxlength')||'n';
                min=o.attr('min'),
                max=o.attr('max'),
                t=type||o.attr('rel');
            }else{
                val=o.value;
                length=o.getAttribute('maxlength')||o.maxlength||'n';
                min=o.getAttribute('min')||o.min;
                max=o.getAttribute('max')||o.max;
                t=type||o.getAttribute('rel')||o.rel;
            }
            
            var reg;
            if(global.typeOf(type,'regexp')){
                reg=type;
            }else if(global.typeOf(allowEmpty,'regexp')){
                reg=allowEmpty;
            }else{
                switch(t){
                    case 'Number':
                        reg=new RegExp("^\\d{1,"+length+"}$");
                    break;
                    case 'Integer':
                        reg=new RegExp("^\\d{1,"+length+"}$");
                    break;
                    case 'Float':
                        reg=new RegExp("^[\\d\\.]{1,"+length+"}$");
                    break;
                    case 'String':
                        reg=new RegExp("^(.|\n|\r){1,"+length+"}$");
                    break;
                    case 'EnString':
                        reg=new RegExp("^[a-zA-Z]{1,"+length+"}$");
                    break;
                    case 'Cellphone':
                        reg=/^\+?(86)?1[3458]\d{9}$/;
                    break;
                    case 'Telphone':
                        reg=/^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
                    break;
                    default:
                        reg=new RegExp("^.{1,"+length+"}$");
                    break;
                }
            }
            
            result=reg.test(val);
            
            //min and max
            if(!global.typeOf(min,'undefined')&&min!==null){
                var vTemp=Number(val);
                if(vTemp!==0&&!vTemp){
                    min<=val?'':result=false;
                }else{
                    min<=vTemp?'':result=false;
                }
            }
            if(!global.typeOf(max,'undefined')&&max!==null){
                var vTemp=Number(val);
                if(vTemp!==0&&!vTemp){
                    max>=val?'':result=false;
                }else{
                    max>=vTemp?'':result=false;
                }
            }
            
            //allow empty
            if(!global.typeOf(allowEmpty,'regexp')&&allowEmpty&&val===''){
                result=true;
            }
            
            return result;
        }
    };

    global.formValidator = utils.extend(global.formValidator || {}, formValidator);
})(this);