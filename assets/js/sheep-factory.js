/*SHEEP JS*/

var sheepWidth = 50;

/**
 * Loads relative resources
 * 
 * @param file
 * @param callback
 */
function loadResource(file, callback) {
    var xmlhttp;

    if(window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
        }
    };

    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}

function createSheepPinSvg(sheep) {
    return new Promise(function(resolve, reject) {
        loadResource("assets/img/sheep-pin.svg", function(svg) {
            let sheepPin = jQuery(svg);
            sheepPin.attr("id",  sheep.id);
            sheepPin.css('left', sheep.right + 'px');
            sheepPin.css('top',  sheep.top + 'px');
            resolve(sheepPin);
        });
    });
}


