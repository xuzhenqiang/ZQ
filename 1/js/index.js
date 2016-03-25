/**
 * Created by 许振强 on 2016/3/6.
 */
function browser(){
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    var isIE7 = /msie 7/i.test(navigator.userAgent);
    var isIE8 = /msie 8/i.test(navigator.userAgent);
    var isIE = /msie/i.test(navigator.userAgent);
    return {
        msie:isIE,
        version:function(){
            switch(true){
                case isIE6:return 6;
                case isIE7:return 7;
                case isIE8:return 8;
            }
        }()
    };
}
function moveTo(target){
    if( ! bReady){
        return;
    }
    bReady=false;
    var star=parseInt($('.mBox').css('top'));
    var dis=-target-star;
    var n=0;
    var tick=Math.abs(dis/1000*1000);
    if(tick > 800){
        tick=800;
    }
    var count=Math.floor(tick/30);
    timer=setInterval(function(){
        n++;
        var cur=star+dis*n/count;
        $('.mBox').css('top',cur)
        if(n==count){
            bReady=true;
            if(Math.abs(parseInt($('.mBox').css('top')))==$('.footer').position().top){
                $('.fList li').css('transform','translate(0,0)');
                $('.listBox').css('transform','scale(0)');
            }else if(Math.abs(parseInt($('.mBox').css('top')))==$('.bdBox').position().top){
                $('.fList li').css('transform','translate(0,-2000px)');
                $('.listBox').css('transform','scale(1)');
            }else{
                $('.listBox').css('transform','scale(0)');
                $('.fList li').css('transform','translate(0,-2000px)');
            }
            clearInterval(timer);
        };
    },30);
}
function tabFn(obj){
    var lBtn=obj.children('.l');
    var rBtn=obj.children('.r');
    var oList=obj.children('.list');
    var w=parseInt(oList.children(':first').css('width'));
    var n=0;
    lBtn.click(function(){
        if( ! bReady){
            return
        }
        bReady=false;
        n--;
        if(n<0){
            n=0;
        }
        move(oList[0],{left:-n*w});
    });
    rBtn.click(function(){
        if( ! bReady){
            return
        }
        bReady=false;
        n++;
        if(n>oList.children().length-1){
            n=oList.children().length-1;
        }
        move(oList[0],{left:-n*w});
    });
}
function addWheel(obj,fn){
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
        obj.addEventListener('DOMMouseScoll',_wheel,false);
    }else{
        obj.onmousewheel=_wheel;
    }
    //统一down
    function _wheel(ev){
        var oEvent=ev || event;
        if(oEvent.wheelDelta){
            var down=oEvent.wheelDelta>0 ? false : true;
        }else{
            var down=oEvent.detail>0? true : false ;
        }
        fn(down);
    }
}
var qq_chat = true;
function show_qq() {
    if (qq_chat) {
        popwin = window.location.href = 'tencent://message/?uin=251275186'
    }
};
$(document).ready(function(){
    var oHd=$('.hdBox');
    var oBd=$('.bdBox');
    var oInt=$('.intro');
    var oFt=$('.footer');
    var oMbox=$('.mBox');
    var timer=null;
    var userscoll=false;
    var nav=$('.bdBox .nav');
    bReady=true;
    function setH(){
        var nH=$(window).height();
        if(nH<600){
            nH=600;
        }
        oBd.css('height',nH);
        oHd.css('height',nH);
        oFt.css('height',nH);
    }
    setH();
    $(window).resize(function(){
        setH();
        var nH=Math.abs(parseInt(oMbox.css('top')));
        var wH=$(window).height();
        if(wH<600){
            wH=600;
        }
        oMbox.css('top',-(wH*Math.round(nH/wH)));
    });

    addWheel(document,function (down){
        if(down){
            var oMt=parseInt(oMbox.css('top'))-parseInt(oBd.css('height'));
            if(Math.abs(oMt)>parseInt(oFt.position().top)){
                return;
            }
            moveTo(-oMt);
        }else{
            var oMt=parseInt(oMbox.css('top'))+parseInt(oBd.css('height'));
            if(oMt>0){
                return;
            }
            moveTo(-oMt);
        }
    });
    var oLsTab=$('.tab');
    tabFn(oLsTab);

    $('.toBd').click(function(){
        moveTo(oBd.position().top);
    });

    $('.bdBox .toUp').click(function(){
        moveTo(0);
    });
    $('.bdBox .toDw').click(function(){
        moveTo(oFt.position().top);
    });
    $('.footer .toUp').click(function(){
        moveTo(oBd.position().top);
    });
    $('.footer .toTop').click(function(){
        moveTo(0);
    });
    $('.QQ').click(function(){
        show_qq();
    });
    /*setInterval(function(){
        alert('box:'+parseInt(oMbox.css('top'))+',oFt:'+oFt.position().top);
    },1000)*/

});















