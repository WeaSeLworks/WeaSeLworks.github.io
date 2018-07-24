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

function createSheepPath(sheep) {
    var scale = 1 / (463.976 / sheep.width);

    var g1 = createElem("g");
    g1.setAttribute("transform", " translate("+sheep.right+","+(sheep.top - sheep.width) +") scale("+scale+")");
    var sheepStyle = "sheep ";
    if (!sheep.healthy) {
        sheepStyle += " unhealthy";
    }
    g1.setAttribute("class", sheepStyle);
    g1.setAttribute("id", "sheepGrid" + sheep.index);
    var g2 = createElem("g");
    var g3 = createElem("g");

    var path1 = createElem("path");
    path1.setAttribute("d","M460.216,149.194l-64-40c-1.271-0.795-2.741-1.216-4.24-1.216H179.288l-37.656-37.656c-1.094-1.097-2.484-1.853-4-2.176    l-3.84-0.8h-0.072l-36.16-7.2c-1.345-0.261-2.735-0.178-4.04,0.24l-48.056,16c-1.762,0.59-3.264,1.775-4.248,3.352l-40,64    c-1.974,3.159-1.506,7.262,1.128,9.896l15.976,16c2.141,2.143,5.31,2.892,8.184,1.936l41.424-13.808l68.888,137.792    c0.389,0.768,0.897,1.47,1.504,2.08l37.656,37.656v60.688c0,4.418,3.582,8,8,8h24c4.418,0,8-3.582,8-8V327.29l10.832-10.824    l52,7.432c1.149,0.165,2.32,0.077,3.432-0.256l76.4-22.92l20.304,13.504l37,29.6v52.152c0,4.418,3.582,8,8,8h24    c4.418,0,8-3.582,8-8v-64c0.014-1.238-0.26-2.462-0.8-3.576l-5.928-11.848l13.424-20.136c0.871-1.317,1.336-2.861,1.336-4.44v-136    C463.976,153.22,462.555,150.656,460.216,149.194z M123.976,81.722v22.944l-11.664,11.656l-9.704-38.864L123.976,81.722z     M447.976,289.578l-14.656,21.984c-1.588,2.384-1.78,5.435-0.504,8l7.2,14.312v54.104h-8v-48c0.001-2.43-1.103-4.729-3-6.248    l-40.56-32.408l-24-16c-1.98-1.33-4.453-1.7-6.736-1.008L279.4,307.81l-54.248-7.752c-2.494-0.357-5.011,0.482-6.792,2.264l-16,16    c-1.515,1.493-2.373,3.529-2.384,5.656v64h-8v-56c0-2.122-0.844-4.156-2.344-5.656l-39.08-39.08l-71.376-142.84    c-1.785-3.558-5.913-5.262-9.688-4l-43.352,14.424l-8-8L53.239,90.65l33.376-11.128l13.6,54.4c0.692,2.792,2.831,4.998,5.6,5.776    c0.704,0.19,1.431,0.284,2.16,0.28c2.122,0,4.156-0.844,5.656-2.344l24-24c1.5-1.5,2.344-3.534,2.344-5.656V91.29l30.344,30.344    c1.5,1.5,3.534,2.344,5.656,2.344H389.68l58.296,36.432V289.578z");
    path1.setAttribute("fill", "#91DC5A");
    g1.appendChild(g2)
    g2.appendChild(g3)
    g3.appendChild(path1);

    var g4 = createElem("g");
    var g5 = createElem("g");

    var path2 = createElem("path");
    path2.setAttribute("d","M411.976,211.978v-8h-8c-8.837,0-16-7.163-16-16v-8h-16v8c0.027,14.902,10.337,27.813,24.864,31.136    c3.323,14.527,16.234,24.837,31.136,24.864v-16C419.139,227.978,411.976,220.815,411.976,211.978z");
    path2.setAttribute("fill", "#91DC5A");

    g1.appendChild(g4);
    g4.appendChild(g5);
    g5.appendChild(path2);

    return g1;
}

function createElem(elem) {
    return document.createElementNS("http://www.w3.org/2000/svg", elem);
}


