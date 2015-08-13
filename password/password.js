'use strict';
//require global.utils
(function(global){
    var password = {
        /**
         * check password strength
         * @param  {String} password     password content
         * @param  {Integer} minLength   password minimum length required
         * @return {Integer}             check result
         */
        checkStrength: function(password, minLength){
            if(typeof password !== "number" && typeof password !== "string"){
                password = '';
            }else{
                password = String(password);
            }
            minLength = minLength || 6;

            /**
             * strength
             * 1: too short
             * 2: pure string
             * 3: normal
             * 4: strong
             * 5: stronger
             */
            var strength = 1,
                numberPattern = /\d+/,
                stringLowPattern = /[a-z]+/,
                stringUpPattern = /[A-Z]+/,
                otherStrPattern = /\W+/;

            if(password.length >= 6){
                if(numberPattern.test(password)){
                    strength += 1;
                }

                if(stringLowPattern.test(password)){
                    strength += 1;
                }

                if(stringUpPattern.test(password)){
                    strength += 1;
                }

                if(otherStrPattern.test(password)){
                    strength += 1;
                }
            }

            return strength;
        }
    };

    global.password = utils.extend(global.password || {}, password);
})(this);