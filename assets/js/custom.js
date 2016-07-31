(function($){
    $(document).ready(function() {

        var owl = $("#owl-demo").owlCarousel({

            navigation : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            autoPlay: false,
            pagination: false,
            navigationText : false,
            afterMove: tweet
        });

        function tweet() {
            var currentitem = $("#owl-demo").data('owlCarousel').currentItem;

            var tweet = $(".tweet-"+currentitem).html();

            var url = '&url='+encodeURI(window.location.href);

            var text = 'text='+encodeURI(tweet);

            var link = "https://twitter.com/intent/tweet?"+text+url+'&hashtags=MASUDZEIGTSDIR';

            $('a.tweet').attr('href',link);
        }

        tweet()

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

