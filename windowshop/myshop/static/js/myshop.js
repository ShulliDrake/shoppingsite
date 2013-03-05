//namespace MS("my shop")
if (!MS || typeof MS === "undefined") {
    var MS = {};
}

$(function(e){

    MS.shop.bind(e);
    MS.search.bind(e);
});

MS.shop = function() {
    return {
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
	    MS.search.api(keywords, page);
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
	    $('.form-search').bind('submit',MS.search.submit);
	},

	api: function(keywords, page) {

	    $.get('/api', {'q':keywords, 'page':page}, function(data){
		$('.form-search .text').val(keywords);
		if (data && data.products) {
		    // update items and pagination

		    var html = '';
		    $.each(data.products, function(product){
			html = html + thumbnail_html(data.products[product]);
		    });
		    $('.thumbnails').replaceWith('<div class="thumbnails">' + html + "</div>");

		    //TODO
		    $('.page a').data("keywords", keywords)
		} else {
		    // no items returned
		    $('.thumbnails').replaceWith('<div class="thumbnails">No items were found for "'+keywords+'".</div>');
		}
	    });
	},

	submit: function(e) {
	    e.preventDefault();

	    var keywords = $('.form-search input[name=q]').val();
	    MS.search.api(keywords);
	}
    }
}();
