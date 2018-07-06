/* SHEEP SECURITY JS */

(function($) {
    
    var sheepWidth = 76;
    var rowSize = Math.floor(500 / sheepWidth);
    var rownum = (580 / sheepWidth) + 3;

    function newSheep(index) {
        
        return {
            index: index,
            right: sheepWidth * (index % rowSize),
            top: sheepWidth * Math.floor(index / rowSize),
            width: sheepWidth,
            healthy: index != 26 
        }
    }
    
    $(document).ready(function() {
        
        var svg = document.getElementById('sheep-grid'); //Get svg element
        
        for (var i=0; i< rownum * rowSize; i++) {
            svg.appendChild(createSheepPath(newSheep(i)));

        }
    });



})(jQuery);
