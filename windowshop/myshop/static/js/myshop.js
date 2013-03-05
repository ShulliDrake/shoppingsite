//namespace MS("my shop")
if (!MS || typeof MS === "undefined") {
    var MS = {};
}

$(function(e){

    MS.shop.bind(e);
    MS.search.bind(e);
    MS.slider.bind(e);
});

MS.shop = function() {
    return {
	keywords: null,
	price_min: slider_config.min,
	price_max: slider_config.max,
	bind: function(e) {
	    //bind hover
	    $(".browse").delegate("li", "mouseenter mouseleave", function(e){
		$(".sublist", this).toggle($(e.target.parentNode).hasClass("category") && e.type === "mouseenter");
		$(".items", this).toggle($(e.target.parentNode).hasClass("sub_category") && e.type === "mouseenter");
	    });

	    $("#nekoshop").click(MS.dispatcher);
	}

    };
}();


MS.dispatcher = function(e){

    //TODO
    if (e && e.target) {

	if (e.target.className === 'link') {
	    e.target = e.target.childNode;
	}
	var keywords = $(e.target).data("keywords");
	var page = $(e.target).data("page");
	if (keywords) {
	    MS.shop.keywords = keywords;
	    MS.search.api(page);
	}
    }

};


MS.search = function() {
    var thumbnail_html = function(p) {
	return "<li><div>" +
          '<a class="thumbnail" href="' + p.product.link + '"><img src="' + p.product.images[0].link + '" title="' + p.product.title + '" /></a>' +
          '<div class="caption">' +
            '<div class="title" title="' + p.product.title + '">' + p.product.title + '</div>' +
            '<div class="price">$' + p.product.inventories[0].price + '</div>' +
            '<div class="store">' + p.product.author.name + '</div>' +
          "</div><!--caption-->" +
	"</div></li>";
    };

    return {

	bind: function(e) {
	    MS.shop.keywords = $('.form-search input[name=q]').val();
	    $('.form-search').bind('submit',MS.search.submit);
	},

	api: function(page) {

	    $.get('/api', {'q':MS.shop.keywords, 'page':page, 'min':MS.shop.price_min, 'max':MS.shop.price_max}, function(data){
		$('.form-search .text').val(MS.shop.keywords);
		if (data && data.products) {
		    // update items and pagination

		    var html = '';
		    $.each(data.products, function(product){
			html = html + thumbnail_html(data.products[product]);
		    });
		    $('.thumbnails').replaceWith('<div class="thumbnails">' + html + "</div>");

		    //TODO
		    $('.page a').data("keywords", MS.shop.keywords)
		} else {
		    // no items returned
		    $('.thumbnails').replaceWith('<div class="thumbnails">No items were found for "'+MS.shop.keywords+'".</div>');
		}
	    });
	},

	submit: function(e) {
	    e.preventDefault();

	    var keywords = $('.form-search input[name=q]').val();
	    MS.shop.keywords = keywords;
	    MS.search.api();
	}
    }
}();

MS.slider = function(){

    return {
	bind: function(e){
	    var range_min = MS.shop.price_min;
	    var range_max = MS.shop.price_max;
	    $('#slider').slider({
		range: true,
		max: 300,
		min: 0,
		values: [range_min, range_max],
		slide: function(e, ui){
		    $('#price_min').html(ui.values[0]);
		    $('#price_max').html(ui.values[1]);
		},
		stop: function(e, ui){
		    var min = ui.values[0];
		    var max = ui.values[1];

		    MS.shop.price_min = min;
		    MS.shop.price_max = max;
		    MS.search.api(1);
		}
	    });
	}
    }
}();