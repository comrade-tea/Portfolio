$(document).ready(function(){
  $(".toogle_butt").click(function () {
    $('#menu_toogle').toggleClass("active_menu");
  });


  /*Плавный сколл*/

  $("a").click(function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 0}, 800);
    return false;
  });

  $("img.lazy").lazyload({
    effect : "fadeIn",
    effectspeed: 900
  });

  $("img.lazy-1").lazyload({
    effect : "fadeIn",
    effectspeed: 1400
  });

  $("img.lazy-2").lazyload({
    effect : "fadeIn",
    effectspeed: 1900
  });
  $("img.lazy-3").lazyload({
    effect : "fadeIn",
    effectspeed: 2400
  });

  /*work block*/
  $("img.lazy-w-1").lazyload({
    effect : "fadeIn",
    effectspeed: 920
  });
  $("img.lazy-w-2").lazyload({
    effect : "fadeIn",
    effectspeed: 1040
  });
  $("img.lazy-w-3").lazyload({
    effect : "fadeIn",
    effectspeed: 1160
  });
  $("img.lazy-w-4").lazyload({
    effect : "fadeIn",
    effectspeed: 1280
  });
  $("img.lazy-w-5").lazyload({
    effect : "fadeIn",
    effectspeed: 1300
  });
  $("img.lazy-w-6").lazyload({
    effect : "fadeIn",
    effectspeed: 1420
  });
  $("img.lazy-w-7").lazyload({
    effect : "fadeIn",
    effectspeed: 1540
  });
  $("img.lazy-w-8").lazyload({
    effect : "fadeIn",
    effectspeed: 1660
  });
  $("img.lazy-w-9").lazyload({
    effect : "fadeIn",
    effectspeed: 1780
  });
  $("img.lazy-w-10").lazyload({
    effect : "fadeIn",
    effectspeed: 1800
  });
  $("img.lazy-w-11").lazyload({
    effect : "fadeIn",
    effectspeed: 1920
  });
  $("img.lazy-w-12").lazyload({
    effect : "fadeIn",
    effectspeed: 2040
  });
  $("img.lazy-w-13").lazyload({
    effect : "fadeIn",
    effectspeed: 2160
  });
  $("img.lazy-w-14").lazyload({
    effect : "fadeIn",
    effectspeed: 2280
  });
  $("img.lazy-w-15").lazyload({
    effect : "fadeIn",
    effectspeed: 2300
  });
});