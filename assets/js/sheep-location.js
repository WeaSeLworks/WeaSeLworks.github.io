/*SHEEP LOCATION JS*/

(function($) {
    var locationOffset;
    var twisted = false;
    var lastScrollTop = 0;
    const PREFIX = "sheepPin";
    
    let sheep1 = {
        index: 0,
        id : PREFIX + 0,
        top: 13,
        right: 300,
        width: sheepWidth,
        healthy: true,
        delay: 0
    };

    let sheep2 = {
        index: 1,
        id : PREFIX + 1,
        top: 300,
        right: 50,
        width: sheepWidth,
        healthy: true,
        delay: 300
    };

    let sheep3 = {
        index: 2,
        id : PREFIX + 2,
        top: 220,
        right: 250,
        width: sheepWidth,
        healthy: true,
        delay: 800
    };
    
    let allSheep = [ sheep1, sheep2, sheep3 ];
    
    
    // apply twist-in
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var downwards = scrollTop > lastScrollTop;
        var direction = downwards ? 1 : -1;
        
        if (scrollTop > locationOffset && !twisted) {
            twisted = true;
            $('path#line-graph').attr('class', 'graph-anim');
            allSheep.forEach(sheep => {
                setTimeout(() => {
                    $("svg#" + sheep.id).attr("class", "twist-in");  
                }, sheep.delay);
            })
        }

        if (scrollTop < locationOffset && twisted && direction < 0) {
            twisted = false;
            $('path#line-graph').attr('class', '');

            allSheep.forEach(sheep => {
                $("svg#" + sheep.id).attr("class", "twist-out");
            })
        }
        
        lastScrollTop = scrollTop;
    });

    $(document).ready(function() {
        var windowHeight = $(window).height();

        allSheep.forEach(sheep => {
            createSheepPinSvg(sheep).then(sheepPin => {
                $('div#sheep-locations').append(sheepPin);
            });
        });
        
        locationOffset = $('div#sheep-locations').offset().top - windowHeight;
    });

})(jQuery);


