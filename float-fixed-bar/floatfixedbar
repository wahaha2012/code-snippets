//require Neuron
DP.define(['dom/dimension'], function (DP, require) {
    var Dim = require('dom/dimension'),
        $ = DP.DOM,
        titleOffsetTop=0,
        win=$(window),
        winSize=Dim.size(win),
        floatStatus = [],
        bandTitleFloat=$.create('div'),
        bandPlaceHolders=[],
        position=[],
        scrollTop=0,
        isMobile=window.navigator.userAgent.toLowerCase().indexOf('mobile')>-1,
        _defaultOptions={
            monitorPosition:false,
            css:{
                'display':'none',
                'width':'100%',
                'position':'fixed',
                'z-index':5000,
                'left':0,
                'top':0
            }
        };

    if(getQueryString("agent")=='iphone.tuan'){
        var isIphone6=/iPhone\s*OS\s*6.*Mobile\/10/.test(window.navigator.userAgent),
            tuanAppVersion=parseInt(getQueryString("version"));

        if(isIphone6 && tuanAppVersion==2){
            titleOffsetTop=64;
        }
    }

    var floatBar = {
        init: function(options){
            var _this = this;
            options = options || {};
            for(var key in options){
                if(_defaultOptions[key]){
                    options[key] = DP.mix(_defaultOptions[key], options[key]);
                }
            }
            this.options = options;

            this.bandTitles=$.all(options.contentSelector || '.nav');
            this.bandCount=this.bandTitles.count();

            _this.createFloatPlaceHolder();
            bandTitleFloat.css(options.css).inject($('body'));

            if(isMobile){
                document.addEventListener('touchend', function(){
                    if(scrollTop<position[0]){
                        return false;
                    }
                    _this.updateFloatTitle();
                }, false);
            }

            win.on('scroll', function(){
                _this.updateFloatTitle();
            });

            $(document).on('touchmove', function(e){
                _this.updateFloatTitle();
            }).on('touchend', function(e){
                _this.updateFloatTitle();
            });
        },

        createFloatPlaceHolder: function(){
            var _this = this;
            _this.bandTitles.forEach(function(item, i){
                var el = $(item),
                    placeHolder=$.create("div",{'class':el.attr("class")}).html(el.html());
                placeHolder.css({
                    'display':'none'
                });
                bandPlaceHolders[i]=placeHolder;
                placeHolder.inject(el, 'after');

                floatStatus[i] = {
                    placeHolder: placeHolder,
                    usePlaceholder: false
                };
            });

            if(!_this.options.monitorPosition){
                _this.getFloatBarPosition();
            }
        },

        updatePlaceHolder: function(){
            var _this = this;
            _this.bandTitles.forEach(function(item, i){
                floatStatus[i].placeHolder.html(_this.bandTitles.get(i).html());
            });
        },

        getFloatBarPosition: function(){
            var _this = this;
            _this.bandTitles.forEach(function(item, i){
                var el = _this.bandTitles.get(i);
                if(floatStatus[i].usePlaceholder){
                    el = floatStatus[i].placeHolder;
                }

                position[i]=Dim.offset(el).top;
                if(titleOffsetTop>0){
                    position[i]=Dim.offset(el).top-titleOffsetTop-4;
                }
            });

            console.log(position);
        },

        updateFloatTitle: function(){
            var _this = this;
            //calc position
            if(_this.options.monitorPosition){
                _this.getFloatBarPosition();
                _this.updatePlaceHolder();
            }

            scrollTop=Dim.scroll(win).top;
            // console.log(scrollTop);
            if(scrollTop<=position[0]){
                bandTitleFloat.css({
                    'display':'none'
                });
                _this.bandTitles.get(0).inject(bandPlaceHolders[0], 'before').removeClass(_this.options.contentClass|| '');
                bandPlaceHolders[0].css({
                    'display':'none'
                });

                floatStatus[0].usePlaceholder = false;
                return;
            }
            
            for(var i=_this.bandCount-1; i>=0; i--){
                if(scrollTop>position[i]){
                    _this.bandTitles.get(i).inject(bandTitleFloat).addClass(_this.options.contentClass|| '');
                    bandPlaceHolders[i].css({
                        'display':'block'
                    });
                    bandTitleFloat.css({
                        'display':'block',
                        'top':titleOffsetTop
                    });
                    floatStatus[i].usePlaceholder = true;
                    break;
                }else{
                    _this.bandTitles.get(i).inject(bandPlaceHolders[i], 'before').removeClass(_this.options.contentClass|| '');
                    bandPlaceHolders[i].css({
                        'display':'none'
                    });
                    floatStatus[i].usePlaceholder = false;
                }
            }
        }
    };

    function getQueryString(queryString,searchString){
        var p=new RegExp(queryString+'=([^&=?]*)'),r;

        searchString=searchString||window.location.search;

        r=searchString.match(p);

        if(r!==null){
            r=r[1];
        }else{
            r='';
        }

        try{
            r=decodeURIComponent(r);
        }catch(e){
            r="";
        }
        
        return r;
    }

    return floatBar;
})