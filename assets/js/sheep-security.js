/*SHEEP JS*/
var sheep = [];

(function($, sheep) {
    'use strict';
    var numOfSheep = 23;
    var lastScrollTop = 0;
    var notificationHeight = 40;
    var dogXOffset = -220;
    var sheepSectionOffset; 
    var notificationOffset;
    var highlightOffset;
    var notification;
    var notifiying = false;
    
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        
        var downwards = scrollTop > lastScrollTop;
        var direction = downwards ? 1 : -1;

        animateSheep(scrollTop);    
        animateDog(scrollTop);
        animateAppNotification(scrollTop, direction);

        lastScrollTop = scrollTop;
    });

    function init() {
        for (var i=0; i< numOfSheep; i++) {
            sheep.push(generateSheepInfo(i));
        }
    }
    
    function animateDog(scrollTop) {
        if (scrollTop > sheepSectionOffset) {
            $('svg#dog').css('right', function () {
                return dogXOffset + ((scrollTop - sheepSectionOffset) / 3) + 'px';
            });
        }
    }
    
    function animateSheep(scrollTop) {
        if (scrollTop > sheepSectionOffset) {
            for (var i=0; i<numOfSheep; i++) {
                $('svg#sheep'+i).css('right', function () {
                    return sheep[i].right + ((scrollTop - sheepSectionOffset)/3) + 'px';
                });
            }
        }
    }
    
    function animateAppNotification(scrollTop, direction) {
        if (scrollTop > notificationOffset && !notifiying) {
            notifiying = true
            notification.animate({
                height: '33px',
                width: '165px'
            }, 700, "swing");
        }

        //reset the animation if user scrolled upwards past where it began
        if (scrollTop < notificationOffset && notifiying && direction < 0) {
            notifiying = false;
            notification.css({
                height: '0',
                width: '0'
            });
        }
    }
    
    function generateSheepInfo(index) {
        var horizontalVariance = 100;
        var ahead = Math.floor(Math.random() * 4) > 2;
        var lag = ahead ? 1 : -1;
        var randomOffset = lag * Math.floor(Math.random() * horizontalVariance);
        var origin = 0;
        
        return {
            index: index,
            right: horizontalVariance + (randomOffset - origin),
            "top": index * 20
        }
    }

    init();

    $(document).ready(function() {
        var windowHeight = $(window).height();
        sheepSectionOffset = $('div#sheep-container').offset().top - windowHeight;
        notificationOffset = $('div#worrying-alert').offset().top - windowHeight + 500;
        highlightOffset = notificationOffset + notificationHeight;
        notification = $('svg#shadow').find('g#notification').find('image');

        for (var i=0; i< numOfSheep; i++) {
            $('div#field').append(createSheepSvg(sheep[i]));
        }

    });
    
})(jQuery, sheep);




