(function($){
    $(document).ready(function() {
        $('#slider .owl-carousel').owlCarousel({
            items: 1,
            loop:true,
            center:true,
            nav: false,
            dots: true,
            autoPlay: true
        })

        $('#videos .owl-carousel').owlCarousel({
            items:1,
            loop:false,
            margin:4,
            autoWidth:true
        })



        $(".menu-trigger").click(function () {
            $(this).toggleClass("active");
            $("nav,body").toggleClass("active");
            setTimeout(
                function(){
                    var currentitem = $("#owl-demo").data('owlCarousel').currentItem;
                    $("#owl-demo").data('owlCarousel').reinit();
                    $("#owl-demo").data('owlCarousel').jumpTo(currentitem);
                },
                1000);
        });

        $(".menu-trigger2").click(function () {
            $(this).toggleClass("active");
            $(".singlepage-nav ul").toggleClass("active");
        });

        $(".text a").click(function () {
            $(".text_wrapper").stop(true,true).toggleClass("open");
        });

        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    });
})(this.jQuery);

