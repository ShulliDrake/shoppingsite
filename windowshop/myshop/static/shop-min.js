
if(!MS||typeof MS==="undefined"){var MS={};}
$(function(e){MS.shop.bind(e);});MS.shop=function(){return{bind:function(e){ $(".browse").delegate("li","mouseenter mouseleave",function(e){$(".sublist",this).toggle($(e.target.parentNode).hasClass("category")&&e.type==="mouseenter");$(".items",this).toggle($(e.target.parentNode).hasClass("sub_category")&&e.type==="mouseenter");});}};}();