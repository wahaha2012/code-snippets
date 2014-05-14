'use strict';
(function(){
    var shareConfig = {
        //your custom app id
        "appid":YourAppid,
        //thumb image in share dialogue
        "img_url":imgUrl,
        //img width
        "img_width":"640",
        //img height
        "img_height":"640",
        //share link
        "link":shareLinkURL,
        //share description
        "desc":shareDescription,
        //share title
        "title":shareTitle,
        //share title in weixin
        "timelineTitle":timeLineTitle
    };
    var binded = false;

    function bindShare(){
        if(binded){
            return;
        }
        if(window.WeixinJSBridge){
            binded = true;
            //分享好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                WeixinJSBridge.invoke('sendAppMessage',config, function(res) {});
            });

            WeixinJSBridge.on('menu:share:timeline', function(argv){
                WeixinJSBridge.invoke('shareTimeline',config, function(res) {});
            });
        }
    }

    bindShare();
    document.addEventListener('WeixinJSBridgeReady', bindShare, false);
})();