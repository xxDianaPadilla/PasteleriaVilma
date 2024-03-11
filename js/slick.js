(function(factory) {
    'use strict';
if (typeof define === 'function' && define.amd) {

    define([ 'jquery' ], factory);
} else if (typeof exports !== 'undefinded' ) {
    module.exports = factory (require('jquery'));

} else {
    factory(jQuery);
}


}(Function($)) { 
    'use strict';

    var Slick = window.Slick || {};

    Slick = (function()) {

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

        }
    }

}
);