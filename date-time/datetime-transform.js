'use strict';
//require global.utils
(function(global){
    var dateTransform = {
        /**
         * create Date Object from Date/String/Number
         * @param  {dateTime} dateTime Date Object/DateTime String/number of milliseconds since midnight Jan 1, 1970
         * @return {Date Object}          Date Object
         */
        createDate: function(dateTime){
            var resultDate = new Date();

            if(global.typeOf(dateTime,'date')){
                resultDate = dateTime;
            }else if(global.typeOf(dateTime,'string')){
                resultDate = new Date(dateTime.replace("T"," ").replace(/[^\d\s:]/g,"/"));
            }else if(global.typeOf(dateTime,'number')){
                resultDate = new Date(dateTime);
            }

            return resultDate;
        },

        /**
         * format number less than ten to double figure
         * @param  {String|Number} n [description]
         * @return {[type]}   [description]
         */
        format: function(n){
            n = parseInt(n, 10) || 0;

            return n>9?String(n):'0'+n;
        },

        /**
         * format Date Object to "YYYY-MM-DD H:i:s" type string
         * @param  {dateTime} dateTime Date Object/DateTime String/number of milliseconds since midnight Jan 1, 1970
         * @return {String}          YYYY-MM-DD H:i:s" formated string
         */
        dateToString: function(dateTime){
            dateTime = this.createDate(dateTime);
            return dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getDate()+' '+dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds();
        },

        /**
         * get two days offset
         * @param  {dateTime} beginDate begin date time
         * @param  {dateTime} endDate   end date time
         * @return {Number}           begin date and end date offet
         */
        getDateOffset: function(beginDate, endDate){
            beginDate = this.createDate(beginDate);
            endDate = this.createDate(endDate);

            var beginDay = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate()),
                endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                dateSeconds = 24 * 60 * 60 *1000;

            return Math.floor(endDay.getTime()/dateSeconds) - Math.floor(beginDay.getTime()/dateSeconds);
        },

        /**
         * get days count of month
         * @param  {Integer} year  [year to be calculate]
         * @param  {Integer} month [month to be calculate]
         * @return {Integer}       [days count of the month]
         */
        getMonthDays: function(year, month){
            year = parseInt(year,10);
            month = parseInt(month,10);

            var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            if(month == 2){
                if(year%400===0 || (year%100!=0 && year%4===0)){return 29;}
            }
            
            return monthDays[month - 1];
        }
    };

    global.dateTransform = utils.extend(global.dateTransform || {}, dateTransform);
})(this);