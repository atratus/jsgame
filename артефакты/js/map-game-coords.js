var Coords = {
    "toRelX":function(x) {
        return (x-$('.mapbox').position().left)/$('.mapbox').width()*MAX_X_REL
    },
    "toRelY":function (y) {
        return (y-$('.mapbox').position().top)/$('.mapbox').height()*MAX_Y_REL
    },
    "fromRelX":function (relX) {
        return ($('.mapbox').position().left + $('.mapbox').width()*relX/MAX_X_REL)
    },
    "fromRelY":function (relY) {
        return ($('.mapbox').position().top + $('.mapbox').height()*relY/MAX_Y_REL)
    },
    "ratio":function() {
        var docWidth = window.innerWidth;
        var docHeight = window.innerHeight;
        var ratio = docWidth/mapSize.width < docHeight/mapSize.height ?
            docWidth/mapSize.width : docHeight/mapSize.height
            console.log("docWidth=" + docWidth + "/mapSize.width=" + mapSize.width)
        return ratio
    }

}
