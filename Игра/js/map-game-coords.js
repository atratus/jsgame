var Coords = {
    "toRelX":function(x) {
        return x/$('.mapbox').width()*MAX_X_REL
    },
    "toRelY":function (y) {
        return y/$('.mapbox').height()*MAX_Y_REL
    },
    "fromRelX":function (relX) {
        return ($('.mapbox').width()*relX/MAX_X_REL)
    },
    "fromRelY":function (relY) {
        return ($('.mapbox').height()*relY/MAX_Y_REL)
    },
    "ratio":function() {
        var docWidth = window.innerWidth;
        var docHeight = window.innerHeight;
        var ratio = docWidth/backgroundSize.width < docHeight/backgroundSize.height ?
            docWidth/backgroundSize.width : docHeight/backgroundSize.height
            console.log("docWidth=" + docWidth + "/backgroundSize.width=" + backgroundSize.width)
        return ratio
    }

}
