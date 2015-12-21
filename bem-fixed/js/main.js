$(document).ready(function(){
    $('#js-main-slider').slick({
        //setting-name: setting-value
    });

    //$(".js-categories-show-subnav").click(function() {
    //	$(this).children(".categories__sublist").slideDown(400);
    //	$(this).children(".categories__sublist").slideUp(400);
    //});

    var menu = $('.categories__sublist');
    // bind a click function to the menu-trigger
    $('.categories__link').click(function(){
        $(this).toggleClass('--open');

        if($(this).hasClass('--open')){
        		$(this).next(menu)
        			.slideDown('400');
        }
        else{
        		 $(this).next(menu)
        	  	.slideUp('400');
        }
      });

    $('.categories__link').change(function(){

    });
});