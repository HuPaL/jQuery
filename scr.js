var cart = [];
//Обертка для избежания конфлита имен
(function($) {


    var functions = {
        redrawCart:function(){
        var templates = $.map(cart, function(product) {
              return builder.cartItem(product); 
                 console.log("templates")
        });
        $("#basket_fill").html(templates)

        },
        
        showProduct: function(element) {
          var parent= element.parents(".one");
          var id=parent.data("id");
          var result = $.grep(products, function(e) {
            return e.id == id;
        });

          $("#productImg").attr("src",result[0].image);
          $("#wwww").text(result[0].title);
          $("#modal_window").show();
          $("#modal_window").on("mouseout",function(){
            $(this).hide()
          })
        
            // this = $(this)
            // Тут пишем функционал нашего плагина
            console.log(result);
            return element; //можем передавать по цепочке
            // return 5;    //не можем передавать по цепочке
        },
        BuyProduct: function(element) {
          var parent= element.parents(".one");
          var id=parent.data("id");
          var result = $.grep(products, function(e) {
            return e.id == id;
        });
          var product = result[0];
        cart.push(product);
       

        this.redrawCart();

          // $("#prodImg").attr("src",product.image);
          // $("#wwww").text(result[0].title);
          // $("#basket_fill").show();
          // $("#basket_fill").on("click",function(){
          //   $(this).hide()
          // })
        
            // this = $(this)
            // Тут пишем функционал нашего плагина
            // console.log(result);
            // return element; //можем передавать по цепочке
            // return 5;    //не можем передавать по цепочке
        },
    };
var products = {};
var filter=
{
 gender:[],
 sizes:[],
}
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


var builder = (function() {
 var getProductTemplate = function(data) {

  return "<div class='one' data-id='"+data.id+"'> "
  +data.manufacturer
  +"<img src='"+data.image+"'/>"
  +"<span>"+data. title+"</span>"
  +"<br>"
  +"<br>"
  +"<span>"+data.price+'$'+"</span>"
  +"<div class=\"buttons hidden\">"
  +"<a href=\"#shop\" class=\"button_show \">Shop  now</a><br><br><br>"
  +"<a href=\"#detail\" class=\"button_more\">View details</a>"
  +"</div>"
  +"</div>";

 }

 var getProductCartTemplate = function(data) {

  return '<div class="" data-id="">'+data.id
  +"<img src='"+ data.image +"'/>"
  +'<p >'+data.title+'</p>'
  +'<p class="price"><span>'+data.price+'$'+'</span></p>'
  +'<a href="#" class="butt2">remove</a>'
  +'</div>'
 }

 var getFilter =function(filter){

  return '<div class="formaDiv">'+
  '<form id="formaform" '+data.id+ ' >'+
  '<input type="radio" name="gender" value="male" data-sex="male" class="filt1" id="male" '+data.gender+' ><br>'+
  '<input type="radio" name="gender" value="female" data-sex="female" class="filt2" id="female" '+data.gender+'><br>'+
  '<input type="radio" name="gender" value="unisex" id="all"> Other <br>'+ 
  +"<a href=\"#detail\" class=\"button_more\">View details</a>"+
  '</form>'+
  '</div>'
 }

 return {
  buildProduct: getProductTemplate,
  cartItem: getProductCartTemplate,
  buildProductfilter: getFilter,
 }


})()


$('document').ready(function() {
 $.get('json_QUERY.json', function(data) {
  products = data;
  var templates = $.map(products, function(product) {
   filter.gender = arrayUnique(filter.gender.concat(product.gender));
   return builder.buildProduct(product);
  })


  var filterTemplate=builder.getFilter(templates)

  $("#new_products #images").html(templates)



 }, 'json');

   
  


   $(".button_show").hide()


   $("#images").on("mouseover",'.one',function(e){
    e.preventDefault();
    var btns=$(this).find(".buttons").removeClass('hidden');
  // $(this).parents("#images").find(".button_show").show();

 })
   $("#images").on("mouseout",'.one',function(e){
    e.preventDefault();
    var btns=$(this).find(".buttons").addClass('hidden');
  // $(this).parents("#images").find(".hidden").hide()
  // $(this).parents("#images").find(".button_show").addClass(".hidden");

 })

   $("#images .one img").on("click",function(){
    var cloneImg=$(this).clone();
    cloneImg.css("height", "50px"," width","40px");
    if($("#modal_window").html()=="Basket is empty"){
     $("#modal_window").empty();
     $("#modal_window").append(cloneImg);

    }
    else{
     $("#modal_window").parents("#menu").append(cloneImg);
    }
    $("#basket").on("click",function(){
     $(this).parents("#menu").find("#modal_window").css("display","block")
    })

   });



   var autocompleteArray = [
   "Kimono Cardigan",
   "Cotton Polo Shirt",
   "Fine-knit Cardigan",
   "Elit Aliquam",
   "Anysize double",
   "Cotton Maxi",
   "Latex Catsuit",
   "Rustic Garter Set"
   ];
   $("#autocomplete").autocomplete({
    source: autocompleteArray
   });

   $('#enter').on('click', function() {
    var input=$("#autocomplete").val()
    $("#text").text($.trim("This is a great choice! "+input))

    $('#short_description').on('click', function(e) {
     e.preventDefault();

     $("#dialog").dialog({autoOpen:true,buttons:{
      Continue:function(){
       $(this).dialog("close").text("We are glad to cooperate!");
      },
      Cancel:function(){
       $(this).dialog("close").text("This is pity...");}
      }
     });

    })



   })

   $("#basket").on("click",function(e){
    e.preventDefault();
    var basket=$('#menu').find("#basket_empty");
    basket.show();


    $("#basket").on("click",function(){
     basket.hide()

    })

   })



   $("#tabs").tabs();

   $("#modal_window").hide()
   $("body").on("click",".button_more",function(){
  // $("#modal_window").show()
  $(this).shop("showProduct")

 })
   $("#basket_fill").hide()
   $("body").on("click",".button_show",function(){
  // $("#modal_window").show()
  $(this).shop("BuyProduct")

 })





  })