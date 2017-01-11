var cart = [];
(function($) {


    var functions = {

    	 redrawCart:function(){
        	var templates = $.map(cart, function(product) {
              return builder.cartItem(product); 
                 console.log(templates)
        });
        $("#basket").html(templates);
        $("#basket").show();
    },

        showProduct: function(element) {
            var id = element.parents(".shoort1").data("id")
             var result = $.grep(products, function(e) {
		        return e.id == id;
		    });
             var product = result[0];
             $('#kartinka').attr('src', result[0].image);
             $("#name").text(result[0].title);
             $("#desc").text(result[0].description);
             $("#pricee").text(result[0].price);
 
        },

        buyProduct: function(element) {
            var id = element.parents(".shoort1").data("id")
             var result = $.grep(products, function(e) {
		        return e.id == id;
		    });
             var product = result[0];
             cart.push(product);
             this.redrawCart();


 
        },
    };






    // плагина
    $.fn.pluginchyk = function(functionName) {
        if (functions[functionName]) {
            return functions[functionName](this);
        } else {
            console.log('i dont know')
            return this;
        }
    };



})(jQuery);