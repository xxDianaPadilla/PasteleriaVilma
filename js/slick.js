(function(factory) {
    'use strict';
if (typeof define === 'function' && define.amd) {

    define([ 'jquery' ], factory);
} else if (typeof exports !== 'undefinded' ) {
    module.exports = factory (require('jquery'));

} else {
    factory(jQuery);
}


}(function($) { 
    'use strict';

    var Slick = window.Slick || {};

    Slick = (function() {

        var instance = 0; 
        function Slick (element, settings){

             var _ = this, dataSettings;

            _.defaults = {

                accesibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appenDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next  aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role"none" role="button" tabindex="0" />').text(i + 1);



                },

                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl:  false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                wairForAnimate: true,
                zIndex: 1000



            };

            _initals = {

               animating: false,
               dragging: false,
               autoPlayTimer: null,
               currentDirection: 0,
               currentLeft: null,
               currentSlide: 0,
               direction: 0,
               $dots: null,
               listWidth: null,
               listHeight: null,
               loadIndex: 0,
               $nextArrow: null,
               $prevArrow: null,
               slideCount: null,
               slideWidth: null,
               $slideTrack: null,
               $slides: null,
               sliding: false,
               slideOffset: 0,
               swipeLeft: null,
               $list: null,
               touchObject: {},
               transformsEnabled: false,
               unslicked: false


            };

            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden'
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slideCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefinded'){
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitycahnge';

            } else if (typeof document.webkitHidden !== 'undefined'){

                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }
               
              _.autoplay = $.proxy(_.autoPlay, _);
              _.autoPlayClear = $.proxy(_.autoPlayClear, _);
              _.autoplayIterator = $.proxy(_.autoplayIterator, _);
              _.changeSlide = $.proxy(_.changeSlide, _);
              _.clickHandler = $.proxy(_.clickHandler, _);
              _.selectHandler = $.proxy(_.selectHandler, _);
              _.setPosition = $.proxy(_.setPosition, _);
              _.swipeHandler = $.proxy(_.swipeHandler, _);
              _.dragHandler = $.proxy(_.dragHandler, _);
              _.keyHandler = $.proxy(_.keyHandler, _);

              _.instanceUid = instanceUid++;

              _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

              _.registerBreakpoints();
              _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activeADA = functions(){

        var _ = this;

        _.$slideTrack.find('.slide-active').attr({

            'aria-hidden': 'false'

        }).find('a, input, button, select').attr({
            'tabidenx': '0'
            });
    };

    Slick.prototype.addSlide = Slick,prototype.slickAdd = function(markup, index, addBefore){

           var _ = this;

           if (typeof(index) === 'boolean'){

            addBefore = index;
            index = null;
           }else if (index < 0 || (index >= _.slideCount)){
           
                return false;
           }

           _.unload();

           if (typeof(index) === 'number'){

              if (index === 0 && _.$slides.lenght === 0){
 
                $(markup).appendTo(_.$slideTrack);
         
             }else if (addBefore){
                $(markup).insertBefore(_.slides.eq(index));
             } else{

                $(markup).insertAfter(_.$slides.eq(index));
             }

            
           } else {

            if (addBefore === true){
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
         }

         _.$slides = _.$slideTrack.children(this.option.slide);

         _.$slideTrack.children(this.option.slide).detach();

         _.$slideTrack.append(_.$slides);

         _.$slides.each(function(index, element){
            $(element).attr('data-slick-index', index);


         });

         _.$slidesCache = _.$slides;

         _.reinit();

        
    };

    Slick.prototyte.animeHeight = function (){

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false){

            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.option.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback){

          var animProps = {};
            _ = this;

            _.animeHeight();

            if (_.options.rt1 === true && _.options.vertical === false) {

                 targetLeft = targetLeft;

            }

            if (_.transformsEnabled === false ) {
                if  (_.options.vertical === false) {
                    _.$slideTrack.animate({
                        left: targetLeft
                    }, _.options.speed, _.options.easing, callback)
                } else {
                    _.$slideTrack.animate({
                        top: targetLeft
                    }, _.options.speed, _.options.easing, callback);
                }
            } else {

                if (cssTransitions === false ) {
                    if (_.options.rtl === true){
                        _.currentLeft = -(_.currentLeft);
                    }

                    $({
                        animStart: currentLeft
                    }).animate({
                        animStart: targetLeft
                    },{
                        duration: _.options.speed,
                        easing: _.options.easing,
                        step: function(now){
                            now = Math.ceil(now);
                            if (_.options.vertical === false){
                                animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                                _.$slideTrack.css(animProps);
                            } else{
                                animProps[_.animType] = 'translate(0px,' +
                                now + 'px,)';
                                _.$slideTrack.css(animProps);

                            }
                        },

                        complete: function(){
                            if (callback){
                                callback.call();
                            }
                        }

                    });


                } else {
                    applyTransition();
                    targetLeft = Math.ceil(targetLeft);

                    if (_.options.vertical === false){
                        animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                    } else {

                        animProps[_.animType] = 'translate3d(0px,'+ targetLeft + 'px, 0px)';
                    }

                    _.$slideTrack.css(animProps);

                    if(callback){
                        setTimeout(function(){
                            _.disableTransition();

                            callback.call();
                        }, _.options.speed);
                    }
                }
            }

    };

    Slick.prototype.getNavTarget = function(){
        var _ = this,
        asNavFor = _.options.asNavFor;
        
        if (asNavFor && asNavFor !== null){
            asNavFor = $(asNavFor).not(_.$slider);

        }

        return asNavFor;


    };

    Slick.prototype.applyTransition = functions(slide){
        var_ = this,
        transition = {};

        if(_.options.fade === false){
            transition[_.transitionType] = _.transformType + '' + _.options.speed + 'ms' + _.options.cssEase;

        } else {
            transition[transitionType] = 'opacity' + _.options.speed + 'ms' + _.options.cssEase;
        }

        
    }


    
}()));