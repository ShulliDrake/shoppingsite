
if(!MS||typeof MS==="undefined"){var MS={};}
MS.views={};MS.models={};$(function(e){MS.shop.bind(e);var mainView=new MS.views.contentView({el:$("#container"),model:new MS.models.contentModel});});MS.models.contentModel=Backbone.Model.extend({defaults:{querySet:{'q':ms_keywords,'brand':null,'min':slider_config.min,'max':slider_config.max,'page':1},items:null,availableBrands:null,pagination:null},updateQuery:function(key,value){var currentSet=this.get('querySet');currentSet[key]=value;this.set('querySet',currentSet);},updateResults:function(){var querySet=this.get('querySet'); var self=this;$.get('/api',querySet,function(data){if(data&&data.products){self.set('availableBrands',data.brands);self.set('items',data.products);self.set('pagination',data.pagination);}else{self.trigger("NoResultsReturned");}});},setKeywords:function(keywords){ this.updateQuery('page','1');this.updateQuery('q',keywords);this.updateResults();},setBrand:function(brand){this.updateQuery('brand',brand);this.updateResults();},resetBrand:function(){this.updateQuery('brand',null);},setPriceRange:function(min,max){this.updateQuery('min',min);this.updateQuery('max',max);this.updateResults();},setPageNum:function(pageNum){this.updateQuery('page',pageNum);this.updateResults();}});MS.views.contentView=Backbone.View.extend({initialize:function(){var searchFormView=new MS.views.searchFormView({el:$(".search"),model:this.model});var filterView=new MS.views.brandFilterView({el:$(".brands"),model:this.model});var itemsView=new MS.views.itemsView({el:$(".results"),model:this.model});var sliderView=new MS.views.sliderView({el:$(".slider"),model:this.model});var browseView=new MS.views.browseView({el:$(".browse"),model:this.model});var paginationView=new MS.views.paginationView({el:$(".paginator"),model:this.model});}});MS.views.searchFormView=Backbone.View.extend({events:{'submit .form-search':'submit'},initialize:function(){this.model.bind('change:items',this.updateInputText,this);},updateInputText:function(){this.$('.form-search input[name=q]').val(this.model.get('querySet').q);},submit:function(e){e.preventDefault(); this.model.resetBrand();var keywords=this.$('.form-search input[name=q]').val();this.model.setKeywords(keywords);}});MS.views.itemsView=Backbone.View.extend({initialize:function(){this.model.bind('change:items',this.render,this);this.model.bind('NoResultsReturned',this.showErrorMessage,this);},render:function(){ var thumbnail_html=function(p){return"<li><div>"+'<a class="thumbnail" href="'+p.product.link+'"><img src="'+p.product.images[0].link+'" title="'+p.product.title+'" /></a>'+'<div class="caption">'+'<div class="title" title="'+p.product.title+'">'+p.product.title+'</div>'+'<div class="price">$'+p.product.inventories[0].price+'</div>'+'<div class="store">'+p.product.author.name+'</div>'+"</div><!--caption-->"+"</div></li>";}; var html='';$.each(this.model.get('items'),function(key,product){html=html+thumbnail_html(product);});$('.thumbnails').replaceWith('<div class="thumbnails">'+html+"</div>");},showErrorMessage:function(){alert('No items were found. Please try different keywords.');}});MS.views.brandFilterView=Backbone.View.extend({events:{'click a.bname':'addBrand','click a.remove':'removeBrand'},initialize:function(){this.model.bind('change:availableBrands',this.render,this);},render:function(){ var selected_brand_html=function(brand){return'<li><span class="bname">'+brand+'<a class="remove">x</a></span></li>';};var available_brand_html=function(bname){return'<li class="link"><a class="bname" data-brand="'+bname+'">'+bname+'</a></li>';}
var selected_brand=this.model.get('querySet').brand;if(selected_brand){this.$(".selected").append(selected_brand_html(selected_brand)).show();}else{this.$(".selected").html('').hide();}
var brand_list=this.model.get('availableBrands');var html='';if(brand_list.length>1){$.each(brand_list,function(key,brand){html=html+available_brand_html(brand);});}
this.$('.selection').html(html);},addBrand:function(e){var brand=$(e.target).data('brand');this.model.setBrand(brand)},removeBrand:function(e){ $(e.target).closest('ul').hide();$(e.target).closest('li').remove();this.model.setBrand("")}});MS.views.browseView=Backbone.View.extend({events:{'click a':'quickSearch'},initialize:function(){$(window).scroll(this.fixedAboveFooter);},fixedAboveFooter:function(){var docHeight=$(document).height();var browseHeight=$('.browse').height();var offset=$('.browse').offset();if((docHeight-browseHeight-offset.top)<60){ $('.browse').removeClass('fixed_bottom');}else{if($(window).height()-browseHeight-(offset.top-$(window).scrollTop())<10){ $('.browse').addClass('fixed_bottom');}}},quickSearch:function(e){var keywords=$(e.target).data('keywords');if(keywords){this.model.setKeywords(keywords);}}});MS.views.paginationView=Backbone.View.extend({events:{'click .page a':'paginate'},initialize:function(){this.model.bind('change:pagination',this.render,this);},render:function(){var currentPage=this.model.get('querySet').page;var paginationObj=this.model.get('pagination'); var paginationHtml='<ul>'
$.each(paginationObj.pagination,function(page,item){paginationHtml+='<li class="link page'+(currentPage==item?' current':'')+'"><a data-page="'+item+'">'+item+'</a></li>';});if(paginationObj.next){paginationHtml+='<li><a data-page="'+paginationObj.next+'" class="next"></a></li>';}
paginationHtml+='</ul>'
this.$el.html(paginationHtml); $('.page a').data("keywords",MS.shop.keywords)},paginate:function(e){var page=$(e.target).data('page');this.model.setPageNum(page);}});MS.shop=function(){return{keywords:null,brand:null,bind:function(e){ $(".browse").delegate("li","mouseenter mouseleave",function(e){$(".sublist",this).toggle($(e.target.parentNode).hasClass("category")&&e.type==="mouseenter");$(".items",this).toggle($(e.target.parentNode).hasClass("sub_category")&&e.type==="mouseenter");}); $(".filters").delegate(".brands","mouseenter mouseleave",function(e){$("ul.selection",this).toggle();});}};}();MS.search=function(){var thumbnail_html=function(p){return"<li><div>"+'<a class="thumbnail" href="'+p.product.link+'"><img src="'+p.product.images[0].link+'" title="'+p.product.title+'" /></a>'+'<div class="caption">'+'<div class="title" title="'+p.product.title+'">'+p.product.title+'</div>'+'<div class="price">$'+p.product.inventories[0].price+'</div>'+'<div class="store">'+p.product.author.name+'</div>'+"</div><!--caption-->"+"</div></li>";};return{api:function(page){}}}();MS.views.sliderView=Backbone.View.extend({events:{'slidestop':'setPrice','slide':'updateLabel'},initialize:function(){this.render();},render:function(){var range_min=this.model.get('querySet').min;var range_max=this.model.get('querySet').max;$('#slider').slider({range:true,max:300,min:0,step:5,values:[range_min,range_max]});},updateLabel:function(e,ui){$('#price_min').html(ui.values[0]);$('#price_max').html(ui.values[1]);},setPrice:function(e,ui){this.model.updateQuery('page','1'); var min=ui.values[0];var max=ui.values[1];this.model.setPriceRange(min,max);}});