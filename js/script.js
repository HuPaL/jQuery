var products = {};

 filter = {
    sizes:[],
    manufacturer:[],
};

    


var builder = (function() {
    var getProductTemplate = function(data) {
    	
    	return'<div class="shoort1 short_moose" data-id="' + data.id + '">' +
          '<img src="' + data.image + '"/>'+
          '<h4><b>' + data.title + '<b></h4>'+
          '<p>Mens Bascketbaal Shoes</p>'+
          '<div class="price">' + data.price + '</div>'+
          '<div class="buttonss">'+
          '<button class="button_buy">BUY NOW</button>' +
          '<button class="button_more">MORE</button>'+
          '</div>'+
        '</div>';

    }
   var getProductCartTemplate = function(data) {
    	
    	return'<div class="hover hover-about">'+
            '<span class="glyphicon glyphicon-remove close"></span>'+
                '<div class="row">'+
                 
                    '<img src="' + data.image + '">'+
                    '<h4 class="names">'+ data.title +'</h4>'+
                    '<p class="descs">'+ data.description +'</p>'+
                    '<div class="prices">' + data.price + '</div>'+

                  '</div>'+
           '</div>';

    };

 /*    var getFilter =function(filter){

  		return '<div class="filtr">'+
  			'<h3>MANUFACTURER</h3>'+
          	'<input type="radio" name="manufacturer" value="Nike">NIKE<Br>'+
            '<input type="radio" name="manufacturer" value="Adidas">ADIDAS<Br>'
            <input type="radio" name="manufacturer" value="Reebok">REEBOK<Br>
 	 	
 }*/
 var getFilter =function(filter){
  var template = '';


  for(key in filter){
    var group = filter[key];
    template+='<div class="filtr">'
              +'<h3>MANUFACTURER</h3>'

      for (var i = group.length - 1; i >= 0; i--) {
         template+='<input type="radio" name="'+key+'" value="'+group[i]+'" data-manufacturer="'+group[i]+'" class="shoesfilt1"  >'+group[i]+'<br>';
      }

      template+='<button class="filtrId" id="btnfiltr" >More Info</button> </div>';
  }

 return template;
}

   

    return {
        buildProduct: getProductTemplate,
       	cartItem: getProductCartTemplate,
    }
})()


function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}


$(document).ready(function() {




	$.get('product.json', function(data) {
            products = data;
            var templates = $.map(products, function(product) {
            	//filter
            	var manufacturer =[];

            	/*for (var key in product.manufacturer) {
              		if (product.manufacturer[key] == true) {
              			 manufacturer.push(key);
              		}
             	}

*/

            	filter.manufacturer = arrayUnique(filter.manufacturer.concat(product.manufacturer));

                return builder.buildProduct(product);

                

            })
            $('.shoort').html(templates)

            console.log(filter);


        }, 'json');
















	// click menu
	$('body').on('click', '.basket', function(event){
		event.preventDefault();
		$('.hover-about').addClass('active');
		
		
	});

	$('.close, .bg-cover').click(function(){
		$('.hover').removeClass('active');
		
	});


	//show and hide buttonss

	$(".buttonss").hide();
	$("body").on('mouseover', '.short_moose', function () {
		$(this).parents(".short_moose").find(".buttonss");
		$(this).find(".buttonss").show();

	});

	$("body").on('mouseout', '.short_moose', function () {
		$(this).parents(".short_moose").find(".buttonss");
		$(this).find(".buttonss").hide();
		
	});


//showProduct
	$('body').on('click', '.button_more', function(event){
		event.preventDefault();
		$('.hover-about1').addClass('active');
		$(this).pluginchyk('showProduct')
	});


//buyProduct
	$('body').on('click', '.button_buy', function(event){
		event.preventDefault();
		$('.hover-about').addClass('active');
		$(this).pluginchyk('buyProduct')
	});


	$('body').on('click','.close, .bg-cover',function(){
		$('.hover1').removeClass('active');
		
	});
});
















































