//namespace MS("my shop")
if (!MS || typeof MS === "undefined") {
    var MS = {};
}

$(function(e){

    MS.shop.bind(e);
});

MS.shop = function() {
    return {
	bind: function(e) {
	    //bind hover
	    $(".browse").delegate("li", "mouseenter mouseleave", function(e){
		$(".sublist", this).toggle(e.type === "mouseenter");
	    });
	}

    };
}();