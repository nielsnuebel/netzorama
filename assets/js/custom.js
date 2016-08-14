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

        var richtige = 0;

        $(".menu-trigger2").click(function () {
            $(this).toggleClass("active");
            $(".singlepage-nav ul").toggleClass("active");
        });

        $(".questions .question").click(function () {
            if(! $(this).parent().hasClass('vote'))
            {
                //$(".back",this).addClass("active");
                $(".front",this).slideUp(200);
                $(".back",this).delay(200).slideDown(200);


                if($(this).data('right'))
                {
                    richtige++;
                }
                $(this).parent().addClass('vote');
            }
        });

        $(".steps .next_step").click(function () {

            if($(this).data('nextstep') == '.step_0') {
                $('.questions .row').removeClass('vote');
                $('.front,.back').attr('style','');
                richtige = 0;

            }
            $($(this).data('nextstep')).show();
            $($(this).data('stephide')).hide();
        });

        $(".text a").click(function () {
            $(".text_wrapper").stop(true,true).toggleClass("open");
        });

        $('#masud').click(function () {
            alert(richtige);
        })

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

