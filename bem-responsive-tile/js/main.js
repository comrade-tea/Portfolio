// $(document).ready( function() {
  
//   $('.grid').isotope({
      // layoutMode: 'packery',
      // itemSelector: '.grid__item',
      // packery: {
      //   gutter: 20
      // }
//   });

// });


$( function() {
    var $container = $('.grid');
// init
    $container.packery({
        itemSelector: '.grid__item',
        gutter: 20,
        "columnWidth": 300,
        "rowHeight": 200
    });

  //  activate carousels
  $('.carousel').carousel({interval:false});


});

(function(){

    //responsive colorbox
    jQuery(document).ready(function($) {

        jQuery.colorbox.settings.maxWidth  = '95%';
        jQuery.colorbox.settings.maxHeight = '95%';

        // ColorBox resize function
        var resizeTimer;
        function resizeColorBox()
        {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (jQuery('#cboxOverlay').is(':visible')) {
                    jQuery.colorbox.load(true);
                }
            }, 300);
        }

        // Resize ColorBox when resizing window or changing mobile device orientation
        jQuery(window).resize(resizeColorBox);
        window.addEventListener("orientationchange", resizeColorBox, false);
        //end responsive colorbox


        //Custom filter start
        // add active on click
        $('#nav-filter li').on('click', function(){
            var filterValue;
            $(this).addClass('active-nav').siblings().removeClass('active-nav');

            filterValue = $('.active-nav').attr('filter');

            console.log(filterValue);

            // Добавить класс не активным
            $('#grid .grid__item[filter!='+filterValue+'] .slide').addClass('dis-tile');
            $('#grid .grid__item[filter='+filterValue+'] .slide').removeClass('dis-tile');

            // Убрать все неактивные
            if (filterValue == 'all') {
                $('#grid .grid__item .slide').removeClass('dis-tile');
            };

        });
        //Custom filter end

        //initialize colorbox
        $('a.item').colorbox({
            //innerWidth:640,
            //innerHeight:390
        });
        $(".youtube").colorbox({
            iframe:true,
            innerWidth:640,
            innerHeight:390
        });

        $("#logo").hover(function () {
            $('#header').toggleClass("header--active");
         });
    });
})();