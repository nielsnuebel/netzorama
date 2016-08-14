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
        var falsch = 0;
        var step = 0;

        const wrong = Array (
            'Ok, jetzt wirds eng für dich.',
            'Ok, jetzt wirds eng für dich.',
            'Sorry, aber du hast wieder die Niete gezogen. Vielleicht mal nen Kaffee zum wach werden?',
            'Hmmmmm... Dabei sein ist alles, oder?'
        )
        const right = Array (
            'Korrekt! Du hast ins schwarze getroffen.',
            'Korrekt! Du hast ins schwarze getroffen.',
            'Wieder Richtig! Du scheinst ein Naturtalent zu sein.',
            'Wieder Treffer! Du hast den Bogen wirklich raus. Jetzt nur noch das Formular ausfüllen und am Gewinnspiel teilnehmen.'
        )

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
                step++;

                var parent = $(this).closest('.item');

                if($(this).data('right'))
                {
                    richtige++;
                    $('.steps p.text',parent).html(right[richtige]);
                }
                else {
                    falsch++;
                    $('.steps p.text',parent).html(wrong[falsch]);
                }
                $(this).parent().addClass('vote');
            }
        });

        $(".steps .next_step").click(function () {

            if($(this).data('step') == step) {
                if($(this).data('nextstep') == '.step_0') {
                    $('.questions .row').removeClass('vote');
                    $('.front,.back').attr('style','');
                    richtige = 0;
                    step = 0;

                }
                $($(this).data('nextstep')).show();
                $($(this).data('stephide')).hide();
            }
            else {
                var parent = $(this).closest('.item');

                $('.steps p.text',parent).html('Bitte wähle eine Überschrift aus.');
            }


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

