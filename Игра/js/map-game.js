$(function() {
    var left=0;
    var chips = $(".chip")
    var mapbox = $('.mapbox')
    var background = $('.background')
    var dices = $('.dices')
    var chipSize = {
        "height":chips.height(),//*91,
        "width":chips.width()//247
    }

    function resize() {
        var ratio = Coords.ratio()
        console.log(">r =" + ratio)
        
        var mapWidth = mapSize.width*ratio
        var mapHeight = mapSize.height*ratio
        mapbox.css({"width": mapWidth + "px ", "height": mapHeight + "px",
        	"left":(mapSize.left*ratio) + "px", "top":(mapSize.top*ratio) + "px"})
        
        
        background.css({
        "width": (backgroundSize.width*ratio) + "px ", "height": (backgroundSize.height*ratio) + "px",
        "left":(backgroundSize.left*ratio) + "px", "top":(backgroundSize.top*ratio) + "px"})
        
        chips.css({"width": chipSize.width*ratio, "height": chipSize.height*ratio})
        
        chips.each(function(i){
            var mapPosition = mapbox.position()
            console.log(">Coords.fromRelX(this.lastRelX) =" + Coords.fromRelX(this.lastRelX))
            $(this).css({
                "left":Coords.fromRelX(this.lastRelX),
                "top": Coords.fromRelY(this.lastRelY)})
        })
        

        dices.each(function() {
            var id=$(this).attr("id")
            console.log("id=" + id)
            $(this).css({"left": Coords.fromRelX(dicesSettings[id].xRel) + "px ",
                    "top": Coords.fromRelY(dicesSettings[id].yRel) + "px",
                    "width": dicesSettings[id].width*ratio + "px ",
                    "height": dicesSettings[id].height*ratio + "px"})
        })
    }
        
    // Initialize
    $(window).resize(resize)
    $.each(snapPoints, function(idx, snapPoint) {
        $('.main').append('<div class="chipHook" style="left:' + snapPoint.x + 'px;top:' + snapPoint.y + 'px;">');
    });

    // Chips extension
    chips.each(function() {
        $.extend(this, {
            "relX":function() {
                var pos = $(this).position()
                return Coords.toRelX(pos.left)
            },
            "relY":function() {
                var pos = $(this).position()
                return Coords.toRelY(pos.top)
            }
        })
    })
    
    // Chips behavior
    chips.draggable({
        "snap":'.chipHook',
        "stop":function() {
            this.lastRelX = this.relX()
            this.lastRelY = this.relY()
        }
    })
    
    // Dices behavior
    dices.each(function() {
    	var id=$(this).attr("id")
    	var diesElements = $(this).children()
        $(this).click(function(){
        	var dsettings = dicesSettings[id]
	        console.log('die=' + dsettings.activeDie)
	        if(typeof dsettings.activeDie == 'undefined') {
	        	var curtain = $("#"+id+" > .curtain")
	            curtain.hide()
	            
	            var dieIDX = Math.floor((Math.random() * diesElements.size()))
	            dsettings.activeDie = $(diesElements[dieIDX])
	            dsettings.activeDie.fadeIn()
	            setTimeout(function(){
	                
	                dsettings.activeDie.fadeOut(function() {
	                    dsettings.activeDie = undefined
	                    curtain.show()
	                })
	            }, dsettings.timeout)
	        }
    	})
	})

    // Chips position    
    var ratio = Coords.ratio()
    
    chips.each(function(i) {
    	x = $(this).attr("x")
    	if (x == undefined) x = 0;
    	y = $(this).attr("y")
    	if (y == undefined) y = 0;
    	    
        this.relWidth = chipSize.width*MAX_X_REL/mapSize.width
        this.relHeight = chipSize.height*MAX_Y_REL/mapSize.height
        
        this.lastRelX = x;//Math.random()*MAX_X_REL
        this.lastRelY = y;//Math.random()*MAX_Y_REL
         
    })
    resize()
});

